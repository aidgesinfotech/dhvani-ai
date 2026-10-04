import bcrypt from 'bcryptjs';
import { getPool, query } from './db.js';
import { SETTINGS, PAGES } from './content/pages.js';
import { SERVICES } from './content/services.js';
import { PROCESS, STATS, TESTIMONIALS, FAQS, LEGAL_PAGES } from './content/collections.js';
import { POSTS } from './content/posts.js';
import { SERVICE_IMAGES, POST_COVERS, PAGE_IMAGES, SHOWCASE_IMAGES, HERO_MEDIA } from './content/images.js';

const SEED_MARKER = 'dhvani_seed_v1';
const IMAGES_MARKER = 'dhvani_images_v1';
const DEFAULT_ADMIN = { email: 'admin@gmail.com', password: 'admin', name: 'Dhvani.ai Admin' };

async function setSetting(key, value) {
  const v = typeof value === 'string' ? value : JSON.stringify(value);
  await query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, v]
  );
}

async function upsertPage(page) {
  await query(
    `INSERT INTO pages (slug, title, seo_title, seo_description, hero_eyebrow, hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
     ON DUPLICATE KEY UPDATE title=VALUES(title), seo_title=VALUES(seo_title), seo_description=VALUES(seo_description),
     hero_eyebrow=VALUES(hero_eyebrow), hero_title=VALUES(hero_title), hero_subtitle=VALUES(hero_subtitle),
     hero_cta_primary=VALUES(hero_cta_primary), hero_cta_secondary=VALUES(hero_cta_secondary), published=1`,
    [
      page.slug,
      page.title,
      page.seo_title || null,
      page.seo_description || null,
      page.hero_eyebrow || null,
      page.hero_title || null,
      page.hero_subtitle || null,
      page.hero_cta_primary || null,
      page.hero_cta_secondary || null,
    ]
  );
  const rows = await query(`SELECT id FROM pages WHERE slug = ?`, [page.slug]);
  return rows[0].id;
}

async function upsertSection(pageId, key, content, sortOrder) {
  await query(
    `INSERT INTO page_sections (page_id, section_key, content, sort_order) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE content=VALUES(content), sort_order=VALUES(sort_order)`,
    [pageId, key, JSON.stringify(content), sortOrder]
  );
}

async function seedContent() {
  for (const t of ['page_sections', 'pages', 'services', 'process_steps', 'stats', 'testimonials', 'faqs', 'posts', 'site_settings']) {
    await query(`DELETE FROM ${t}`);
  }

  for (const [key, value] of Object.entries(SETTINGS)) {
    await setSetting(key, value);
  }

  for (const page of PAGES) {
    const pageId = await upsertPage(page);
    let order = 1;
    for (const [key, content] of Object.entries(page.sections || {})) {
      await upsertSection(pageId, key, content, order++);
    }
  }

  for (const legal of LEGAL_PAGES) {
    const pageId = await upsertPage(legal);
    await upsertSection(pageId, 'content', { last_updated: 'October 3, 2026', blocks: legal.blocks }, 1);
  }

  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await query(
      `INSERT INTO services (title, slug, category, excerpt, description, body, icon, image_url, image_label, tags, featured, sort_order, published, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, 1, ?, ?)`,
      [
        s.title,
        s.slug,
        s.category,
        s.excerpt,
        s.description,
        JSON.stringify(s.body),
        s.icon,
        s.image_label,
        JSON.stringify(s.tags),
        s.featured ? 1 : 0,
        i + 1,
        s.seo_title,
        s.seo_description,
      ]
    );
  }

  for (const [group, steps] of Object.entries(PROCESS)) {
    for (let i = 0; i < steps.length; i++) {
      await query(
        `INSERT INTO process_steps (group_key, step_number, title, body, sort_order) VALUES (?, ?, ?, ?, ?)`,
        [group, i + 1, steps[i][0], steps[i][1], i + 1]
      );
    }
  }

  for (let i = 0; i < STATS.length; i++) {
    await query(`INSERT INTO stats (value, label, subtext, sort_order) VALUES (?, ?, ?, ?)`, [...STATS[i], i + 1]);
  }

  for (let i = 0; i < TESTIMONIALS.length; i++) {
    await query(
      `INSERT INTO testimonials (quote, name, role, rating, sort_order, published) VALUES (?, ?, ?, 5.0, ?, 1)`,
      [...TESTIMONIALS[i], i + 1]
    );
  }

  for (let i = 0; i < FAQS.length; i++) {
    const [category, question, answer] = FAQS[i];
    await query(`INSERT INTO faqs (category, question, answer, sort_order, published) VALUES (?, ?, ?, ?, 1)`, [
      category,
      question,
      answer,
      i + 1,
    ]);
  }

  for (const p of POSTS) {
    await query(
      `INSERT INTO posts (title, slug, category, excerpt, content, author, cover_label, read_minutes, tags, published, published_at, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      [
        p.title,
        p.slug,
        p.category,
        p.excerpt,
        p.content,
        p.author,
        p.cover_label,
        p.read_minutes,
        JSON.stringify(p.tags),
        p.published_at,
        p.seo_title,
        p.seo_description,
      ]
    );
  }
}

async function ensureAdmin() {
  const admins = await query(`SELECT id FROM admins LIMIT 1`);
  if (admins.length) return;
  const hash = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
  await query(`INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)`, [
    DEFAULT_ADMIN.email,
    hash,
    DEFAULT_ADMIN.name,
  ]);
  console.log(`✓ Admin created (${DEFAULT_ADMIN.email})`);
}

async function hasMarker(name) {
  const rows = await query(`SELECT id FROM schema_migrations WHERE name = ?`, [name]);
  return rows.length > 0;
}

const isSeeded = () => hasMarker(SEED_MARKER);

const parseJson = (v) => {
  if (v && typeof v === 'object') return v;
  try {
    return JSON.parse(v || '{}');
  } catch {
    return {};
  }
};

async function pageId(slug) {
  const rows = await query(`SELECT id FROM pages WHERE slug = ?`, [slug]);
  return rows[0]?.id;
}

async function patchSection(slug, key, patch) {
  const id = await pageId(slug);
  if (!id) return;
  const rows = await query(`SELECT content FROM page_sections WHERE page_id = ? AND section_key = ?`, [id, key]);
  if (!rows.length) return;
  const content = parseJson(rows[0].content);
  if (!patch(content)) return;
  await query(`UPDATE page_sections SET content = ? WHERE page_id = ? AND section_key = ?`, [
    JSON.stringify(content),
    id,
    key,
  ]);
}

/** Fills default imagery into empty image fields only, so CMS edits are never overwritten. */
async function applyDefaultImages() {
  for (const [slug, url] of Object.entries(SERVICE_IMAGES)) {
    await query(`UPDATE services SET image_url = ? WHERE slug = ? AND (image_url IS NULL OR image_url = '')`, [url, slug]);
  }
  for (const [slug, url] of Object.entries(POST_COVERS)) {
    await query(`UPDATE posts SET cover_url = ? WHERE slug = ? AND (cover_url IS NULL OR cover_url = '')`, [url, slug]);
  }
  for (const [slug, sections] of Object.entries(PAGE_IMAGES)) {
    for (const [key, url] of Object.entries(sections)) {
      await patchSection(slug, key, (c) => {
        if (c.image_url) return false;
        c.image_url = url;
        return true;
      });
    }
  }
  await patchSection('home', 'showcase', (c) => {
    let changed = false;
    for (const item of c.items || []) {
      const url = SHOWCASE_IMAGES[item.image_label];
      if (!item.image_url && url) {
        item.image_url = url;
        changed = true;
      }
    }
    return changed;
  });
  for (const [slug, media] of Object.entries(HERO_MEDIA)) {
    const id = await pageId(slug);
    if (!id) continue;
    await query(
      `INSERT IGNORE INTO page_sections (page_id, section_key, content, sort_order) VALUES (?, 'hero_media', ?, 0)`,
      [id, JSON.stringify(media)]
    );
  }
}

/**
 * Seeds Dhvani.ai content exactly once per database. A MySQL named lock prevents
 * concurrent serverless cold starts from seeding twice.
 */
export async function seedIfNeeded() {
  await ensureAdmin();
  if ((await isSeeded()) && (await hasMarker(IMAGES_MARKER))) return;

  const conn = await getPool().getConnection();
  try {
    const [[lock]] = await conn.query(`SELECT GET_LOCK('dhvani_seed', 60) AS got`);
    if (!lock.got) throw new Error('Could not acquire seed lock');
    if (!(await isSeeded())) {
      await seedContent();
      await query(`INSERT INTO schema_migrations (name) VALUES (?)`, [SEED_MARKER]);
      console.log('✓ Dhvani.ai content seeded');
    }
    if (!(await hasMarker(IMAGES_MARKER))) {
      await applyDefaultImages();
      await query(`INSERT INTO schema_migrations (name) VALUES (?)`, [IMAGES_MARKER]);
      console.log('✓ Default images applied');
    }
  } finally {
    await conn.query(`SELECT RELEASE_LOCK('dhvani_seed')`).catch(() => {});
    conn.release();
  }
}
