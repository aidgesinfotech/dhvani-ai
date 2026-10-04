/** Quick end-to-end check of the public + admin API against a running server. */
const BASE = process.env.API_BASE || 'http://localhost:9999';
const results = [];

async function call(method, path, body, token) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function check(label, fn) {
  try {
    const detail = await fn();
    results.push(['PASS', label, detail ?? '']);
  } catch (e) {
    results.push(['FAIL', label, e.message]);
  }
}

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

let token = '';
let leadId = 0;

await check('GET /api/health', async () => {
  const r = await call('GET', '/api/health');
  expect(r.status === 200, `status ${r.status}`);
});
await check('GET /public/site', async () => {
  const { json } = await call('GET', '/api/public/site');
  const d = json.data;
  expect(d.settings.site_name === 'Dhvani.ai', 'site_name');
  return `services=${d.services.length} stats=${d.stats.length} faqs=${d.faqs.length} testimonials=${d.testimonials.length}`;
});
for (const slug of ['home', 'about-us', 'services', 'collaborate-with-us', 'blog', 'contact-us', 'privacy-policy', 'terms-of-service']) {
  await check(`GET /public/pages/${slug}`, async () => {
    const { status, json } = await call('GET', `/api/public/pages/${slug}`);
    expect(status === 200, `status ${status}`);
    return `sections=${json.data.sections.length}`;
  });
}
await check('GET /public/services/:slug (all)', async () => {
  const { json } = await call('GET', '/api/public/site');
  for (const s of json.data.services) {
    const r = await call('GET', `/api/public/services/${s.slug}`);
    expect(r.status === 200 && r.json.data.body?.overview, `missing body for ${s.slug}`);
  }
  return `${json.data.services.length} detail pages`;
});
for (const g of ['home', 'about', 'services', 'collaborate']) {
  await check(`GET /public/process/${g}`, async () => {
    const { json } = await call('GET', `/api/public/process/${g}`);
    expect(json.data.length > 0, 'no steps');
    return `steps=${json.data.length}`;
  });
}
await check('GET /public/posts + detail', async () => {
  const { json } = await call('GET', '/api/public/posts');
  expect(json.data.length > 0, 'no posts');
  const d = await call('GET', `/api/public/posts/${json.data[0].slug}`);
  expect(d.json.data.content?.length > 100, 'no content');
  return `posts=${json.data.length}`;
});
await check('404 unknown page', async () => {
  const r = await call('GET', '/api/public/pages/nope');
  expect(r.status === 404, `status ${r.status}`);
});
await check('POST /public/contact validation', async () => {
  const r = await call('POST', '/api/public/contact', { name: 'x' });
  expect(r.status === 400, `status ${r.status}`);
});
await check('POST /public/contact', async () => {
  const r = await call('POST', '/api/public/contact', {
    name: 'Smoke Test',
    email: 'smoke@example.com',
    message: 'Automated smoke test',
    service: 'Speech Data Collection',
  });
  expect(r.status === 200, r.json.error || `status ${r.status}`);
});
await check('POST /public/collaborate (vendor + file)', async () => {
  const r = await call('POST', '/api/public/collaborate', {
    type: 'vendor',
    name: 'Smoke Vendor',
    email: 'vendor@example.com',
    phone: '+91 90000 00000',
    company_name: 'Smoke Co',
    languages: 'Hindi, Gujarati',
    team_size: '12',
    files: [{ field: 'company_profile', filename: 'profile.txt', mime: 'text/plain', data: Buffer.from('hello profile').toString('base64') }],
  });
  expect(r.status === 200, r.json.error || `status ${r.status}`);
});
await check('POST /public/collaborate rejects .exe', async () => {
  const r = await call('POST', '/api/public/collaborate', {
    type: 'freelancer',
    name: 'Bad',
    email: 'bad@example.com',
    phone: '1',
    files: [{ field: 'resume', filename: 'x.exe', data: 'AAAA' }],
  });
  expect(r.status === 400, `status ${r.status}`);
});
await check('POST /public/newsletter', async () => {
  const r = await call('POST', '/api/public/newsletter', { email: 'smoke-news@example.com' });
  expect(r.status === 200, `status ${r.status}`);
});
await check('Admin rejects no token', async () => {
  const r = await call('GET', '/api/admin/dashboard');
  expect(r.status === 401, `status ${r.status}`);
});
await check('POST /auth/login', async () => {
  const r = await call('POST', '/api/auth/login', { email: 'admin@gmail.com', password: 'admin' });
  expect(r.status === 200, r.json.error || `status ${r.status}`);
  token = r.json.data.token;
});
await check('GET /admin/dashboard', async () => {
  const { json } = await call('GET', '/api/admin/dashboard', null, token);
  return JSON.stringify(json.data.counts);
});
await check('Admin edit page → public reflects', async () => {
  const pages = (await call('GET', '/api/admin/pages', null, token)).json.data;
  const home = pages.find((p) => p.slug === 'home');
  const full = (await call('GET', `/api/admin/pages/${home.id}`, null, token)).json.data;
  const original = full.hero_eyebrow;
  await call('PUT', `/api/admin/pages/${home.id}`, { ...full, hero_eyebrow: 'SMOKE-EDIT' }, token);
  const pub = (await call('GET', '/api/public/pages/home')).json.data;
  await call('PUT', `/api/admin/pages/${home.id}`, { ...full, hero_eyebrow: original }, token);
  expect(pub.hero_eyebrow === 'SMOKE-EDIT', 'public did not reflect edit');
});
await check('GET /admin/leads + file download', async () => {
  const { json } = await call('GET', '/api/admin/leads?type=vendor', null, token);
  const lead = json.data.find((l) => l.email === 'vendor@example.com');
  expect(lead && lead.files.length === 1, 'vendor lead/file missing');
  leadId = lead.id;
  const res = await fetch(`${BASE}/api/admin/leads/${lead.id}/files/${lead.files[0].id}`, { headers: { Authorization: `Bearer ${token}` } });
  const text = await res.text();
  expect(text === 'hello profile', 'file content mismatch');
});
await check('Cleanup smoke leads', async () => {
  const { json } = await call('GET', '/api/admin/leads', null, token);
  const smoke = json.data.filter((l) => /example\.com$/.test(l.email));
  for (const l of smoke) await call('DELETE', `/api/admin/leads/${l.id}`, null, token);
  return `deleted ${smoke.length}`;
});

for (const [s, l, d] of results) console.log(`${s === 'PASS' ? '✔' : '✘'} ${l}${d ? `  — ${d}` : ''}`);
const failed = results.filter((r) => r[0] === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
