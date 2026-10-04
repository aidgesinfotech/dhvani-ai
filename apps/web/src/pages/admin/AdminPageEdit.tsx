import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, Save } from 'lucide-react';
import { api, type PageData } from '../../lib/api';
import { AdminHeader, Btn, Field, JsonEditor, Notice, Toggle, field } from './ui';

const humanize = (k: string) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const HERO_FIELDS = [
  ['hero_eyebrow', 'Hero eyebrow'],
  ['hero_title', 'Hero title'],
  ['hero_subtitle', 'Hero subtitle'],
  ['hero_cta_primary', 'Primary button label'],
  ['hero_cta_secondary', 'Secondary button label'],
] as const;

export function AdminPageEdit() {
  const { id } = useParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .get<PageData>(`/api/admin/pages/${id}`)
      .then(setPage)
      .catch((e) => setMsg({ kind: 'error', text: e.message }));
  }, [id]);

  const set = (key: keyof PageData, value: unknown) => page && setPage({ ...page, [key]: value });

  const save = async () => {
    if (!page || !id) return;
    setSaving(true);
    try {
      setPage(await api.put<PageData>(`/api/admin/pages/${id}`, page));
      setMsg({ kind: 'ok', text: 'Saved — changes are live on the website.' });
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  if (!page) return msg ? <Notice msg={msg} /> : <p className="text-white/40">Loading…</p>;
  const path = page.slug === 'home' ? '/' : `/${page.slug}`;

  return (
    <div className="pb-24">
      <Link to="/admin/pages" className="inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-gold">
        <ArrowLeft size={14} /> All pages
      </Link>
      <div className="mt-3">
        <AdminHeader
          title={`Edit: ${page.title}`}
          subtitle={
            <a href={path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-gold hover:underline">
              {path} <ArrowUpRight size={12} />
            </a>
          }
        >
          <Btn onClick={save} disabled={saving}>
            <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
          </Btn>
        </AdminHeader>
      </div>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card space-y-4 p-5 md:p-6">
          <h2 className="font-display font-semibold text-white">Hero</h2>
          {HERO_FIELDS.map(([key, label]) => (
            <Field key={key} label={label}>
              {key === 'hero_subtitle' ? (
                <textarea className={`${field} min-h-28`} value={(page[key] as string) || ''} onChange={(e) => set(key, e.target.value)} />
              ) : (
                <input className={field} value={(page[key] as string) || ''} onChange={(e) => set(key, e.target.value)} />
              )}
            </Field>
          ))}
        </div>
        <div className="card space-y-4 p-5 md:p-6 self-start">
          <h2 className="font-display font-semibold text-white">SEO & visibility</h2>
          <Field label="Page name (admin)">
            <input className={field} value={page.title || ''} onChange={(e) => set('title', e.target.value)} />
          </Field>
          <Field label="SEO title" hint={`${(page.seo_title || '').length} chars — aim for 50–60`}>
            <input className={field} value={page.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
          </Field>
          <Field label="SEO description" hint={`${(page.seo_description || '').length} chars — aim for 140–160`}>
            <textarea className={`${field} min-h-24`} value={page.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
          </Field>
          <Toggle checked={page.published !== false && page.published !== 0} onChange={(v) => set('published', v)} label="Published" />
        </div>
      </div>

      <h2 className="mb-3 mt-10 font-display text-lg font-semibold text-white">Page sections</h2>
      <p className="mb-4 text-sm text-white/45">Click a section to edit its text, lists, cards and image URLs.</p>
      <div className="space-y-3">
        {page.sections.map((sec) => (
          <div key={sec.id} className={`card overflow-hidden ${open === sec.section_key ? '!border-gold/40' : ''}`}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              onClick={() => setOpen(open === sec.section_key ? null : sec.section_key)}
            >
              <span>
                <span className="block font-medium text-white">{humanize(sec.section_key)}</span>
                <span className="block font-mono text-[11px] text-white/35">{sec.section_key}</span>
              </span>
              <ChevronDown size={18} className={`text-gold transition-transform ${open === sec.section_key ? 'rotate-180' : ''}`} />
            </button>
            {open === sec.section_key && (
              <div className="border-t border-white/10 p-5">
                <JsonEditor
                  value={sec.content}
                  onChange={(content) =>
                    setPage({ ...page, sections: page.sections.map((s) => (s.id === sec.id ? { ...s, content } : s)) })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-8">
        <Btn onClick={save} disabled={saving} className="shadow-[0_10px_40px_-10px_rgba(209,169,8,0.8)]">
          <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
        </Btn>
      </div>
    </div>
  );
}
