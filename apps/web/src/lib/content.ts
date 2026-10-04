import type { ItemGroup, QA, TitledItem } from './api';

/** Safe readers for CMS JSON — sections are admin-editable so every field may be missing. */
export type Section = Record<string, unknown>;

export function str(section: Section | undefined, key: string, fallback = ''): string {
  const v = section?.[key];
  return typeof v === 'string' && v.trim() ? v : fallback;
}

/** Hero image from a `hero_media` section; undefined keeps the hero single-column. */
export function heroImage(section: Section | undefined) {
  const src = str(section, 'image_url');
  return src ? { src, label: str(section, 'image_label') } : undefined;
}

export function list(section: Section | undefined, key: string): string[] {
  const v = section?.[key];
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '') : [];
}

export function items<T = TitledItem>(section: Section | undefined, key = 'items'): T[] {
  const v = section?.[key];
  return Array.isArray(v) ? (v.filter((x) => x && typeof x === 'object') as T[]) : [];
}

export const groups = (s: Section | undefined, key = 'groups') => items<ItemGroup>(s, key);
export const qas = (s: Section | undefined, key = 'faqs') => items<QA>(s, key);

export function paragraphs(text?: string) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function telHref(phone?: string) {
  return `tel:${(phone || '').replace(/[^\d+]/g, '')}`;
}

export function waHref(phone?: string, text?: string) {
  const n = (phone || '').replace(/[^\d]/g, '');
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
