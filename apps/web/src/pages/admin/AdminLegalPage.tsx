import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Plus, Save, Trash2 } from 'lucide-react';
import { api, type PageData } from '../../lib/api';
import { AdminHeader, Btn, Field, Notice, field } from './ui';

type LegalBlock = { heading?: string; body: string };
type Content = { last_updated: string; blocks: LegalBlock[] };

function readContent(page: PageData): Content {
  const c = (page.sections.find((s) => s.section_key === 'content')?.content || {}) as Partial<Content>;
  return { last_updated: c.last_updated || '', blocks: Array.isArray(c.blocks) ? c.blocks : [] };
}

export function AdminLegalPage({ slug, label }: { slug: 'privacy-policy' | 'terms-of-service'; label: string }) {
  const [page, setPage] = useState<PageData | null>(null);
  const [content, setContent] = useState<Content>({ last_updated: '', blocks: [] });
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const pages = await api.get<{ id: number; slug: string }[]>('/api/admin/pages');
    const row = pages.find((p) => p.slug === slug);
    if (!row) throw new Error(`${label} page not found. Run "npm run db:reset -- --yes" to reseed.`);
    const full = await api.get<PageData>(`/api/admin/pages/${row.id}`);
    setPage(full);
    setContent(readContent(full));
  }, [slug, label]);

  useEffect(() => {
    load().catch((e) => setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Failed to load' }));
  }, [load]);

  const updateBlock = (i: number, patch: Partial<LegalBlock>) =>
    setContent((c) => ({ ...c, blocks: c.blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) }));

  const move = (i: number, d: number) =>
    setContent((c) => {
      const blocks = [...c.blocks];
      const j = i + d;
      if (j < 0 || j >= blocks.length) return c;
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { ...c, blocks };
    });

  const save = async () => {
    if (!page) return;
    setSaving(true);
    try {
      const hasSection = page.sections.some((s) => s.section_key === 'content');
      const sections = hasSection
        ? page.sections.map((s) => (s.section_key === 'content' ? { ...s, content } : s))
        : [...page.sections, { id: 0, section_key: 'content', content, sort_order: 1 }];
      const updated = await api.put<PageData>(`/api/admin/pages/${page.id}`, { ...page, sections });
      setPage(updated);
      setContent(readContent(updated));
      setMsg({ kind: 'ok', text: 'Saved — live on the website.' });
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  if (!page) return msg ? <Notice msg={msg} /> : <p className="text-white/40">Loading…</p>;
  const set = (k: keyof PageData, v: string) => setPage({ ...page, [k]: v });

  return (
    <div>
      <AdminHeader
        title={label}
        subtitle={
          <a href={`/${slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gold hover:underline">
            /{slug} <ArrowUpRight size={12} />
          </a>
        }
      >
        <Btn onClick={save} disabled={saving}>
          <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="card mb-6 grid gap-4 p-5 md:p-6 sm:grid-cols-2">
        <Field label="Hero title">
          <input className={field} value={page.hero_title || ''} onChange={(e) => set('hero_title', e.target.value)} />
        </Field>
        <Field label="Last updated label">
          <input className={field} value={content.last_updated} onChange={(e) => setContent({ ...content, last_updated: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Hero subtitle">
            <textarea className={`${field} min-h-20`} value={page.hero_subtitle || ''} onChange={(e) => set('hero_subtitle', e.target.value)} />
          </Field>
        </div>
        <Field label="SEO title">
          <input className={field} value={page.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
        </Field>
        <Field label="SEO description">
          <input className={field} value={page.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
        </Field>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-white">Content blocks</h2>
        <Btn variant="ghost" onClick={() => setContent({ ...content, blocks: [...content.blocks, { heading: 'New section', body: '' }] })}>
          <Plus size={14} /> Add block
        </Btn>
      </div>
      <div className="space-y-3">
        {content.blocks.map((b, i) => (
          <div key={i} className="card space-y-3 p-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <input className={field} placeholder="Heading" value={b.heading || ''} onChange={(e) => updateBlock(i, { heading: e.target.value })} />
              <button type="button" className="p-1.5 text-white/40 hover:text-white" onClick={() => move(i, -1)} aria-label="Move up">
                <ArrowUp size={15} />
              </button>
              <button type="button" className="p-1.5 text-white/40 hover:text-white" onClick={() => move(i, 1)} aria-label="Move down">
                <ArrowDown size={15} />
              </button>
              <button
                type="button"
                className="p-1.5 text-red-400/70 hover:text-red-300"
                onClick={() => setContent({ ...content, blocks: content.blocks.filter((_, j) => j !== i) })}
                aria-label="Remove"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              className={`${field} min-h-28`}
              placeholder="Body (blank line between paragraphs)"
              value={b.body}
              onChange={(e) => updateBlock(i, { body: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
