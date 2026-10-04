import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../db.js';
import { config } from '../config.js';
import { signToken, authRequired } from '../middleware/auth.js';
import {
  mapService,
  mapPost,
  mapSection,
  settingsToObject,
  parseJsonField,
  isEmail,
  clean,
  slugify,
} from '../utils.js';

const publicRouter = Router();
const adminRouter = Router();

function ok(res, data) {
  res.json({ success: true, data });
}

function fail(res, status, message) {
  res.status(status).json({ success: false, error: message });
}

/** Wraps a handler so thrown errors become JSON 500s. */
const h = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (e) {
    console.error(e);
    fail(res, 500, e.message || 'Server error');
  }
};

async function loadPage(where, params) {
  const pages = await query(`SELECT * FROM pages WHERE ${where} LIMIT 1`, params);
  if (!pages.length) return null;
  const sections = await query(`SELECT * FROM page_sections WHERE page_id = ? ORDER BY sort_order ASC, id ASC`, [
    pages[0].id,
  ]);
  return { ...pages[0], published: Boolean(pages[0].published), sections: sections.map(mapSection) };
}

/* ------------------------------------------------------------------ AUTH */
publicRouter.post(
  '/auth/login',
  h(async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return fail(res, 400, 'Email and password required');
    const rows = await query(`SELECT * FROM admins WHERE email = ? LIMIT 1`, [String(email).trim()]);
    if (!rows.length) return fail(res, 401, 'Invalid credentials');
    const admin = rows[0];
    if (!(await bcrypt.compare(String(password), admin.password_hash))) return fail(res, 401, 'Invalid credentials');
    const token = signToken({ id: admin.id, email: admin.email, name: admin.name });
    ok(res, { token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  })
);

/* ---------------------------------------------------------------- PUBLIC */
publicRouter.get(
  '/public/site',
  h(async (_req, res) => {
    const [settingsRows, services, stats, testimonials, faqs] = await Promise.all([
      query(`SELECT setting_key, setting_value FROM site_settings`),
      query(
        `SELECT id, title, slug, category, excerpt, icon, image_url, image_label, tags, featured, sort_order
         FROM services WHERE published = 1 ORDER BY sort_order ASC, id ASC`
      ),
      query(`SELECT * FROM stats ORDER BY sort_order ASC, id ASC`),
      query(`SELECT * FROM testimonials WHERE published = 1 ORDER BY sort_order ASC, id ASC`),
      query(`SELECT * FROM faqs WHERE published = 1 ORDER BY sort_order ASC, id ASC`),
    ]);
    ok(res, {
      settings: settingsToObject(settingsRows),
      services: services.map(mapService),
      stats,
      testimonials,
      faqs,
    });
  })
);

publicRouter.get(
  '/public/pages/:slug',
  h(async (req, res) => {
    const page = await loadPage('slug = ? AND published = 1', [req.params.slug]);
    if (!page) return fail(res, 404, 'Page not found');
    ok(res, page);
  })
);

publicRouter.get(
  '/public/services/:slug',
  h(async (req, res) => {
    const rows = await query(`SELECT * FROM services WHERE slug = ? AND published = 1 LIMIT 1`, [req.params.slug]);
    if (!rows.length) return fail(res, 404, 'Service not found');
    ok(res, mapService(rows[0]));
  })
);

publicRouter.get(
  '/public/process/:group',
  h(async (req, res) => {
    ok(
      res,
      await query(`SELECT * FROM process_steps WHERE group_key = ? ORDER BY sort_order ASC, step_number ASC`, [
        req.params.group,
      ])
    );
  })
);

publicRouter.get(
  '/public/posts',
  h(async (_req, res) => {
    const rows = await query(
      `SELECT id, title, slug, category, excerpt, author, cover_url, cover_label, read_minutes, tags, published_at
       FROM posts WHERE published = 1 ORDER BY published_at DESC, id DESC`
    );
    ok(res, rows.map(mapPost));
  })
);

publicRouter.get(
  '/public/posts/:slug',
  h(async (req, res) => {
    const rows = await query(`SELECT * FROM posts WHERE slug = ? AND published = 1 LIMIT 1`, [req.params.slug]);
    if (!rows.length) return fail(res, 404, 'Article not found');
    ok(res, mapPost(rows[0]));
  })
);

/** Bots fill hidden fields humans never see; silently accept and discard. */
function isSpam(body) {
  return Boolean(body && body.website);
}

publicRouter.post(
  '/public/contact',
  h(async (req, res) => {
    const b = req.body || {};
    if (isSpam(b)) return ok(res, { message: 'Thank you! We will get back to you soon.' });
    const name = clean(b.name, 191);
    const email = clean(b.email, 191);
    const message = clean(b.message, 5000);
    if (!name || !email || !message) return fail(res, 400, 'Name, email and message are required');
    if (!isEmail(email)) return fail(res, 400, 'Please enter a valid email address');
    await query(
      `INSERT INTO leads (type, name, email, phone, company, country, subject, message) VALUES ('contact', ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, clean(b.phone, 64), clean(b.company, 191), clean(b.country, 128), clean(b.service, 255), message]
    );
    ok(res, { message: 'Thank you! Our team will get back to you within one business day.' });
  })
);

function decodeUpload(file) {
  if (!file || !file.data || !file.filename) return null;
  const filename = String(file.filename).slice(0, 255);
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (!config.uploads.allowedExtensions.includes(ext)) {
    throw Object.assign(new Error(`File type .${ext} is not allowed`), { status: 400 });
  }
  const base64 = String(file.data).replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.length > config.uploads.maxFileBytes) {
    throw Object.assign(new Error('Each file must be 2.5 MB or smaller'), { status: 400 });
  }
  return {
    field: clean(file.field, 64) || 'attachment',
    filename,
    mime: clean(file.mime, 128) || 'application/octet-stream',
    buffer,
  };
}

publicRouter.post('/public/collaborate', async (req, res) => {
  try {
    const b = req.body || {};
    if (isSpam(b)) return ok(res, { message: 'Thank you for registering!' });
    const type = b.type === 'vendor' ? 'vendor' : 'freelancer';
    const name = clean(b.name, 191);
    const email = clean(b.email, 191);
    const phone = clean(b.phone, 64);
    if (!name || !email || !phone) return fail(res, 400, 'Name, email and phone are required');
    if (!isEmail(email)) return fail(res, 400, 'Please enter a valid email address');

    const files = (Array.isArray(b.files) ? b.files : []).slice(0, 2).map(decodeUpload).filter(Boolean);

    const meta = {
      languages: clean(b.languages, 1000),
      expertise: clean(b.expertise, 1000),
      experience_years: clean(b.experience_years, 32),
      team_size: clean(b.team_size, 32),
      company_name: clean(b.company_name, 191),
      website_url: clean(b.website_url, 255),
    };

    const result = await query(
      `INSERT INTO leads (type, name, email, phone, company, country, city, subject, message, meta)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type,
        name,
        email,
        phone,
        meta.company_name,
        clean(b.country, 128),
        clean(b.city, 128),
        type === 'vendor' ? 'Vendor registration' : 'Freelancer registration',
        clean(b.message, 5000),
        JSON.stringify(meta),
      ]
    );

    for (const f of files) {
      await query(`INSERT INTO lead_files (lead_id, field, filename, mime, size, data) VALUES (?, ?, ?, ?, ?, ?)`, [
        result.insertId,
        f.field,
        f.filename,
        f.mime,
        f.buffer.length,
        f.buffer,
      ]);
    }

    ok(res, { message: 'Thank you for registering! Our partner team will be in touch right away.' });
  } catch (e) {
    console.error(e);
    fail(res, e.status || 500, e.message || 'Server error');
  }
});

publicRouter.post(
  '/public/newsletter',
  h(async (req, res) => {
    const b = req.body || {};
    if (isSpam(b)) return ok(res, { message: 'Subscribed successfully.' });
    const email = clean(b.email, 191);
    if (!isEmail(email)) return fail(res, 400, 'Please enter a valid email address');
    const existing = await query(`SELECT id FROM leads WHERE type = 'newsletter' AND email = ? LIMIT 1`, [email]);
    if (!existing.length) {
      await query(`INSERT INTO leads (type, name, email, subject) VALUES ('newsletter', ?, ?, 'Newsletter subscription')`, [
        clean(b.name, 191),
        email,
      ]);
    }
    ok(res, { message: 'You’re subscribed. Thank you!' });
  })
);

/* ----------------------------------------------------- ADMIN (protected) */
adminRouter.use(authRequired);

adminRouter.get('/me', (req, res) => ok(res, req.admin));

adminRouter.put(
  '/account/password',
  h(async (req, res) => {
    const { current_password, new_password, email } = req.body || {};
    if (!current_password || !new_password) return fail(res, 400, 'Current and new password are required');
    if (String(new_password).length < 8) return fail(res, 400, 'New password must be at least 8 characters');
    const rows = await query(`SELECT * FROM admins WHERE id = ?`, [req.admin.id]);
    if (!rows.length) return fail(res, 404, 'Admin not found');
    if (!(await bcrypt.compare(String(current_password), rows[0].password_hash))) {
      return fail(res, 400, 'Current password is incorrect');
    }
    const nextEmail = email && isEmail(email) ? String(email).trim() : rows[0].email;
    const hash = await bcrypt.hash(String(new_password), 10);
    await query(`UPDATE admins SET password_hash = ?, email = ? WHERE id = ?`, [hash, nextEmail, req.admin.id]);
    ok(res, { message: 'Account updated. Please use the new credentials next time you sign in.' });
  })
);

adminRouter.get(
  '/dashboard',
  h(async (_req, res) => {
    const [services, posts, faqs, testimonials, leadTypes, newLeads, recentLeads] = await Promise.all([
      query(`SELECT COUNT(*) AS c FROM services`),
      query(`SELECT COUNT(*) AS c FROM posts`),
      query(`SELECT COUNT(*) AS c FROM faqs`),
      query(`SELECT COUNT(*) AS c FROM testimonials`),
      query(`SELECT type, COUNT(*) AS c FROM leads GROUP BY type`),
      query(`SELECT COUNT(*) AS c FROM leads WHERE status = 'new'`),
      query(`SELECT id, type, name, email, subject, status, created_at FROM leads ORDER BY created_at DESC LIMIT 8`),
    ]);
    const byType = Object.fromEntries(leadTypes.map((r) => [r.type, r.c]));
    ok(res, {
      counts: {
        services: services[0].c,
        posts: posts[0].c,
        faqs: faqs[0].c,
        testimonials: testimonials[0].c,
        leads_new: newLeads[0].c,
        contact: byType.contact || 0,
        freelancer: byType.freelancer || 0,
        vendor: byType.vendor || 0,
        newsletter: byType.newsletter || 0,
      },
      recentLeads,
    });
  })
);

/* Settings */
adminRouter.get(
  '/settings',
  h(async (_req, res) => {
    ok(res, settingsToObject(await query(`SELECT setting_key, setting_value FROM site_settings`)));
  })
);

adminRouter.put(
  '/settings',
  h(async (req, res) => {
    for (const [key, value] of Object.entries(req.body || {})) {
      const v = typeof value === 'string' ? value : JSON.stringify(value ?? '');
      await query(
        `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key.slice(0, 191), v]
      );
    }
    ok(res, settingsToObject(await query(`SELECT setting_key, setting_value FROM site_settings`)));
  })
);

/* Pages */
adminRouter.get(
  '/pages',
  h(async (_req, res) => {
    ok(res, await query(`SELECT id, slug, title, seo_title, published, updated_at FROM pages ORDER BY id ASC`));
  })
);

adminRouter.get(
  '/pages/:id',
  h(async (req, res) => {
    const page = await loadPage('id = ?', [req.params.id]);
    if (!page) return fail(res, 404, 'Not found');
    ok(res, page);
  })
);

adminRouter.put(
  '/pages/:id',
  h(async (req, res) => {
    const p = req.body || {};
    await query(
      `UPDATE pages SET title=?, seo_title=?, seo_description=?, hero_eyebrow=?, hero_title=?, hero_subtitle=?,
       hero_cta_primary=?, hero_cta_secondary=?, published=? WHERE id=?`,
      [
        p.title,
        p.seo_title || null,
        p.seo_description || null,
        p.hero_eyebrow || null,
        p.hero_title || null,
        p.hero_subtitle || null,
        p.hero_cta_primary || null,
        p.hero_cta_secondary || null,
        p.published === false || p.published === 0 ? 0 : 1,
        req.params.id,
      ]
    );
    if (Array.isArray(p.sections)) {
      for (const s of p.sections) {
        if (s.id) {
          await query(`UPDATE page_sections SET content=?, sort_order=? WHERE id=? AND page_id=?`, [
            JSON.stringify(s.content ?? {}),
            s.sort_order ?? 0,
            s.id,
            req.params.id,
          ]);
        } else if (s.section_key) {
          await query(
            `INSERT INTO page_sections (page_id, section_key, content, sort_order) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE content=VALUES(content), sort_order=VALUES(sort_order)`,
            [req.params.id, s.section_key, JSON.stringify(s.content ?? {}), s.sort_order ?? 0]
          );
        }
      }
    }
    ok(res, await loadPage('id = ?', [req.params.id]));
  })
);

/* Services */
function servicePayload(s) {
  return [
    s.title,
    slugify(s.slug || s.title),
    s.category || 'AI Data Services',
    s.excerpt || null,
    s.description || null,
    JSON.stringify(s.body || {}),
    s.icon || 'sparkles',
    s.image_url || null,
    s.image_label || null,
    JSON.stringify(Array.isArray(s.tags) ? s.tags.filter(Boolean) : []),
    s.featured ? 1 : 0,
    Number(s.sort_order) || 0,
    s.published === false ? 0 : 1,
    s.seo_title || null,
    s.seo_description || null,
  ];
}

adminRouter.get(
  '/services',
  h(async (_req, res) => {
    ok(res, (await query(`SELECT * FROM services ORDER BY sort_order ASC, id ASC`)).map(mapService));
  })
);

adminRouter.post(
  '/services',
  h(async (req, res) => {
    const s = req.body || {};
    if (!s.title) return fail(res, 400, 'Title is required');
    const result = await query(
      `INSERT INTO services (title, slug, category, excerpt, description, body, icon, image_url, image_label, tags, featured, sort_order, published, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      servicePayload(s)
    );
    ok(res, mapService((await query(`SELECT * FROM services WHERE id = ?`, [result.insertId]))[0]));
  })
);

adminRouter.put(
  '/services/:id',
  h(async (req, res) => {
    const s = req.body || {};
    if (!s.title) return fail(res, 400, 'Title is required');
    await query(
      `UPDATE services SET title=?, slug=?, category=?, excerpt=?, description=?, body=?, icon=?, image_url=?, image_label=?,
       tags=?, featured=?, sort_order=?, published=?, seo_title=?, seo_description=? WHERE id=?`,
      [...servicePayload(s), req.params.id]
    );
    ok(res, mapService((await query(`SELECT * FROM services WHERE id = ?`, [req.params.id]))[0]));
  })
);

adminRouter.delete(
  '/services/:id',
  h(async (req, res) => {
    await query(`DELETE FROM services WHERE id = ?`, [req.params.id]);
    ok(res, { deleted: true });
  })
);

/* Blog posts */
function postPayload(p) {
  return [
    p.title,
    slugify(p.slug || p.title),
    p.category || 'Insights',
    p.excerpt || null,
    p.content || '',
    p.author || 'Dhvani.ai Team',
    p.cover_url || null,
    p.cover_label || null,
    Number(p.read_minutes) || 5,
    JSON.stringify(Array.isArray(p.tags) ? p.tags.filter(Boolean) : []),
    p.published === false ? 0 : 1,
    p.published_at ? String(p.published_at).slice(0, 10) : new Date().toISOString().slice(0, 10),
    p.seo_title || null,
    p.seo_description || null,
  ];
}

adminRouter.get(
  '/posts',
  h(async (_req, res) => {
    ok(res, (await query(`SELECT * FROM posts ORDER BY published_at DESC, id DESC`)).map(mapPost));
  })
);

adminRouter.post(
  '/posts',
  h(async (req, res) => {
    const p = req.body || {};
    if (!p.title) return fail(res, 400, 'Title is required');
    const result = await query(
      `INSERT INTO posts (title, slug, category, excerpt, content, author, cover_url, cover_label, read_minutes, tags, published, published_at, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      postPayload(p)
    );
    ok(res, mapPost((await query(`SELECT * FROM posts WHERE id = ?`, [result.insertId]))[0]));
  })
);

adminRouter.put(
  '/posts/:id',
  h(async (req, res) => {
    const p = req.body || {};
    if (!p.title) return fail(res, 400, 'Title is required');
    await query(
      `UPDATE posts SET title=?, slug=?, category=?, excerpt=?, content=?, author=?, cover_url=?, cover_label=?, read_minutes=?,
       tags=?, published=?, published_at=?, seo_title=?, seo_description=? WHERE id=?`,
      [...postPayload(p), req.params.id]
    );
    ok(res, mapPost((await query(`SELECT * FROM posts WHERE id = ?`, [req.params.id]))[0]));
  })
);

adminRouter.delete(
  '/posts/:id',
  h(async (req, res) => {
    await query(`DELETE FROM posts WHERE id = ?`, [req.params.id]);
    ok(res, { deleted: true });
  })
);

/** Generic CRUD for simple list tables. */
function crud(path, table, fields, defaults = {}, orderBy = 'sort_order ASC, id ASC') {
  const values = (b) =>
    fields.map((f) => {
      const v = b[f] ?? defaults[f];
      if (typeof v === 'boolean') return v ? 1 : 0;
      return v === undefined ? null : v;
    });

  adminRouter.get(
    `/${path}`,
    h(async (req, res) => {
      const group = req.query.group;
      const rows = group
        ? await query(`SELECT * FROM ${table} WHERE group_key = ? ORDER BY ${orderBy}`, [group])
        : await query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
      ok(res, rows);
    })
  );

  adminRouter.post(
    `/${path}`,
    h(async (req, res) => {
      const b = req.body || {};
      const result = await query(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
        values(b)
      );
      ok(res, (await query(`SELECT * FROM ${table} WHERE id = ?`, [result.insertId]))[0]);
    })
  );

  adminRouter.put(
    `/${path}/:id`,
    h(async (req, res) => {
      const b = req.body || {};
      await query(`UPDATE ${table} SET ${fields.map((f) => `${f}=?`).join(', ')} WHERE id=?`, [
        ...values(b),
        req.params.id,
      ]);
      ok(res, (await query(`SELECT * FROM ${table} WHERE id = ?`, [req.params.id]))[0]);
    })
  );

  adminRouter.delete(
    `/${path}/:id`,
    h(async (req, res) => {
      await query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
      ok(res, { deleted: true });
    })
  );
}

crud('process', 'process_steps', ['group_key', 'step_number', 'title', 'body', 'sort_order'], { step_number: 1, sort_order: 0 }, 'group_key ASC, sort_order ASC, step_number ASC');
crud('stats', 'stats', ['value', 'label', 'subtext', 'sort_order'], { sort_order: 0 });
crud('testimonials', 'testimonials', ['quote', 'name', 'role', 'rating', 'sort_order', 'published'], { rating: 5, sort_order: 0, published: 1 });
crud('faqs', 'faqs', ['question', 'answer', 'category', 'sort_order', 'published'], { category: 'General', sort_order: 0, published: 1 });

/* Leads */
adminRouter.get(
  '/leads',
  h(async (req, res) => {
    const type = req.query.type;
    const rows = type
      ? await query(`SELECT * FROM leads WHERE type = ? ORDER BY created_at DESC LIMIT 500`, [type])
      : await query(`SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`);
    const ids = rows.map((r) => r.id);
    const files = ids.length
      ? await query(
          `SELECT id, lead_id, field, filename, mime, size FROM lead_files WHERE lead_id IN (${ids.map(() => '?').join(',')})`,
          ids
        )
      : [];
    ok(
      res,
      rows.map((r) => ({
        ...r,
        meta: parseJsonField(r.meta, null),
        files: files.filter((f) => f.lead_id === r.id),
      }))
    );
  })
);

adminRouter.get(
  '/leads/:id/files/:fileId',
  h(async (req, res) => {
    const rows = await query(`SELECT * FROM lead_files WHERE id = ? AND lead_id = ? LIMIT 1`, [
      req.params.fileId,
      req.params.id,
    ]);
    if (!rows.length) return fail(res, 404, 'File not found');
    const f = rows[0];
    res.setHeader('Content-Type', f.mime || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(f.filename)}"`);
    res.send(f.data);
  })
);

adminRouter.patch(
  '/leads/:id',
  h(async (req, res) => {
    const status = ['new', 'read', 'contacted', 'archived'].includes(req.body?.status) ? req.body.status : 'read';
    await query(`UPDATE leads SET status = ? WHERE id = ?`, [status, req.params.id]);
    ok(res, (await query(`SELECT * FROM leads WHERE id = ?`, [req.params.id]))[0]);
  })
);

adminRouter.delete(
  '/leads/:id',
  h(async (req, res) => {
    await query(`DELETE FROM leads WHERE id = ?`, [req.params.id]);
    ok(res, { deleted: true });
  })
);

export { publicRouter, adminRouter };
