export function parseJsonField(value, fallback = null) {
  if (value == null) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function mapService(row) {
  if (!row) return null;
  return {
    ...row,
    body: parseJsonField(row.body, {}),
    tags: parseJsonField(row.tags, []),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
  };
}

export function mapPost(row) {
  if (!row) return null;
  return {
    ...row,
    tags: parseJsonField(row.tags, []),
    published: Boolean(row.published),
  };
}

export function mapSection(row) {
  return {
    ...row,
    content: parseJsonField(row.content, {}),
  };
}

export function settingsToObject(rows) {
  const out = {};
  for (const row of rows) {
    let val = row.setting_value;
    if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      try {
        val = JSON.parse(val);
      } catch {
        /* keep string */
      }
    }
    out[row.setting_key] = val;
  }
  return out;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim());
}

/** Trims and caps a user-supplied string; returns null when empty. */
export function clean(value, max = 500) {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  return s.slice(0, max);
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
