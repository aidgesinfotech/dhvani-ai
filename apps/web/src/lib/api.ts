/**
 * API calls use the current website host (relative `/api/...`).
 * - Local: Vite proxy → localhost:9999
 * - Prod: same Vercel domain serves frontend + `/api`
 */
export type ApiResponse<T> = { success: boolean; data?: T; error?: string };

export const TOKEN_KEY = 'dhvani_admin_token';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new Error(res.status === 413 ? 'Upload too large' : `Request failed (${res.status})`);
  }
  if (res.status === 401 && path.startsWith('/api/admin')) {
    localStorage.removeItem(TOKEN_KEY);
    if (!location.pathname.startsWith('/admin/login')) location.href = '/admin/login';
  }
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Request failed');
  }
  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  /** Authenticated binary download (lead attachments). */
  download: async (path: string, filename: string) => {
    const res = await fetch(path, { headers: authHeaders() });
    if (!res.ok) throw new Error('Download failed');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};

export type SiteSettings = Record<string, string>;

export type PageSection = {
  id: number;
  section_key: string;
  content: Record<string, unknown>;
  sort_order: number;
};

export type PageData = {
  id: number;
  slug: string;
  title: string;
  seo_title?: string;
  seo_description?: string;
  hero_eyebrow?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string | null;
  hero_cta_secondary?: string | null;
  published?: boolean | number;
  sections: PageSection[];
};

export type TitledItem = { title: string; body?: string; icon?: string };
export type ItemGroup = { title: string; items: string[] };
export type QA = { question: string; answer: string };

export type ServiceBody = {
  tagline?: string;
  overview?: string;
  highlights?: string[];
  blocks_title?: string;
  blocks?: TitledItem[];
  groups_title?: string;
  groups?: ItemGroup[];
  use_cases?: string[];
  quality?: string[];
  formats?: string[];
  closing?: string;
  faqs?: QA[];
};

export type Service = {
  id: number;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  description?: string;
  body?: ServiceBody;
  icon?: string;
  image_url?: string | null;
  image_label?: string | null;
  tags?: string[];
  featured?: boolean;
  sort_order?: number;
  published?: boolean;
  seo_title?: string;
  seo_description?: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  cover_url?: string | null;
  cover_label?: string | null;
  read_minutes?: number;
  tags?: string[];
  published?: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
};

export type Stat = { id: number; value: string; label: string; subtext?: string; sort_order?: number };
export type Testimonial = { id: number; quote: string; name: string; role?: string; rating?: number; sort_order?: number; published?: number | boolean };
export type Faq = { id: number; question: string; answer: string; category?: string; sort_order?: number; published?: number | boolean };
export type ProcessStep = {
  id: number;
  group_key: string;
  step_number: number;
  title: string;
  body?: string;
  sort_order?: number;
};

export function sectionMap(page?: PageData | null) {
  const map: Record<string, Record<string, unknown>> = {};
  page?.sections?.forEach((s) => {
    map[s.section_key] = s.content || {};
  });
  return map;
}

export function formatDate(value?: string) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
