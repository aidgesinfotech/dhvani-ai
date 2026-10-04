import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Pencil, Plus, Trash2 } from 'lucide-react';
import { api, type Service, type ServiceBody } from '../../lib/api';
import { Icon, ICON_NAMES } from '../../components/ui/Icon';
import { AdminHeader, Badge, Btn, Field, JsonEditor, Modal, Notice, Toggle, field, useConfirm } from './ui';

const BODY_TEMPLATE: ServiceBody = {
  tagline: '',
  overview: '',
  highlights: [''],
  blocks_title: 'What we deliver',
  blocks: [{ title: '', icon: 'sparkles', body: '' }],
  groups_title: 'Coverage',
  groups: [{ title: '', items: [''] }],
  use_cases: [''],
  quality: [''],
  formats: [''],
  closing: '',
  faqs: [{ question: '', answer: '' }],
};

const EMPTY: Partial<Service> = {
  title: '',
  slug: '',
  category: 'AI Data Collection',
  excerpt: '',
  description: '',
  icon: 'sparkles',
  image_url: '',
  image_label: '',
  tags: [],
  featured: false,
  published: true,
  sort_order: 0,
  seo_title: '',
  seo_description: '',
  body: BODY_TEMPLATE,
};

export function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [edit, setEdit] = useState<Partial<Service> | null>(null);
  const [tab, setTab] = useState<'basics' | 'content' | 'seo'>('basics');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const confirm = useConfirm();

  const load = () => api.get<Service[]>('/api/admin/services').then(setItems).catch((e) => setMsg({ kind: 'error', text: e.message }));
  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => [...new Set(items.map((s) => s.category).filter(Boolean))] as string[], [items]);

  const open = (s: Partial<Service>) => {
    setTab('basics');
    setEdit({ ...s, body: s.body && Object.keys(s.body).length ? s.body : BODY_TEMPLATE });
  };

  const save = async () => {
    if (!edit?.title) return setMsg({ kind: 'error', text: 'Title is required' });
    setSaving(true);
    try {
      if (edit.id) await api.put(`/api/admin/services/${edit.id}`, edit);
      else await api.post('/api/admin/services', edit);
      setEdit(null);
      setMsg({ kind: 'ok', text: 'Service saved.' });
      load();
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s: Service) => {
    if (!confirm(`Delete “${s.title}”?`)) return;
    await api.delete(`/api/admin/services/${s.id}`);
    load();
  };

  const set = (k: keyof Service, v: unknown) => edit && setEdit({ ...edit, [k]: v });

  return (
    <div>
      <AdminHeader title="Services" subtitle="Each service has its own detail page at /services/slug. Sort order controls listing order.">
        <Btn onClick={() => open({ ...EMPTY, sort_order: items.length + 1 })}>
          <Plus size={15} /> Add service
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.id} className="card flex flex-wrap items-center gap-4 p-4">
            <span className="icon-tile !h-11 !w-11">
              <Icon name={s.icon} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{s.title}</p>
              <p className="truncate text-xs text-white/40">
                {s.category} · /services/{s.slug}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {s.featured && <Badge>featured</Badge>}
              {!s.published && <Badge tone="red">hidden</Badge>}
              <span className="font-mono text-xs text-white/30">#{s.sort_order}</span>
            </div>
            <div className="flex items-center gap-1">
              <a href={`/services/${s.slug}`} target="_blank" rel="noreferrer" className="p-2 text-white/40 hover:text-gold" aria-label="View">
                <ArrowUpRight size={16} />
              </a>
              <button type="button" className="p-2 text-white/60 hover:text-gold" onClick={() => open(s)} aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button type="button" className="p-2 text-red-400/70 hover:text-red-300" onClick={() => remove(s)} aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <Modal title={edit.id ? `Edit: ${edit.title}` : 'New service'} onClose={() => setEdit(null)} wide>
          <div className="mb-5 flex gap-1 rounded-xl border border-white/10 p-1">
            {(['basics', 'content', 'seo'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize ${tab === t ? 'bg-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                {t === 'content' ? 'Page content' : t === 'seo' ? 'SEO' : 'Basics'}
              </button>
            ))}
          </div>

          {tab === 'basics' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title *">
                <input className={field} value={edit.title || ''} onChange={(e) => set('title', e.target.value)} />
              </Field>
              <Field label="Slug" hint="Leave empty to generate from title">
                <input className={field} value={edit.slug || ''} onChange={(e) => set('slug', e.target.value)} />
              </Field>
              <Field label="Category">
                <input className={field} list="svc-cats" value={edit.category || ''} onChange={(e) => set('category', e.target.value)} />
                <datalist id="svc-cats">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field label="Icon">
                <div className="flex gap-2">
                  <span className="icon-tile !h-11 !w-11">
                    <Icon name={edit.icon} size={18} />
                  </span>
                  <select className={field} value={edit.icon || 'sparkles'} onChange={(e) => set('icon', e.target.value)}>
                    {ICON_NAMES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Short excerpt (cards)">
                  <textarea className={`${field} min-h-20`} value={edit.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Description (fallback overview)">
                  <textarea className={`${field} min-h-20`} value={edit.description || ''} onChange={(e) => set('description', e.target.value)} />
                </Field>
              </div>
              <Field label="Image URL" hint="Empty = branded placeholder">
                <input className={field} value={edit.image_url || ''} onChange={(e) => set('image_url', e.target.value)} placeholder="https://…" />
              </Field>
              <Field label="Image label / alt text">
                <input className={field} value={edit.image_label || ''} onChange={(e) => set('image_label', e.target.value)} />
              </Field>
              <Field label="Tags" hint="Comma separated">
                <input
                  className={field}
                  value={(edit.tags || []).join(', ')}
                  onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()))}
                />
              </Field>
              <Field label="Sort order">
                <input type="number" className={field} value={edit.sort_order ?? 0} onChange={(e) => set('sort_order', Number(e.target.value))} />
              </Field>
              <div className="flex flex-wrap gap-6 sm:col-span-2">
                <Toggle checked={!!edit.published} onChange={(v) => set('published', v)} label="Published" />
                <Toggle checked={!!edit.featured} onChange={(v) => set('featured', v)} label="Featured" />
              </div>
            </div>
          )}

          {tab === 'content' && <JsonEditor value={edit.body} onChange={(v) => set('body', v)} />}

          {tab === 'seo' && (
            <div className="grid gap-4">
              <Field label="SEO title">
                <input className={field} value={edit.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
              </Field>
              <Field label="SEO description">
                <textarea className={`${field} min-h-24`} value={edit.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
              </Field>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-2 border-t border-white/10 pt-5">
            <Btn variant="ghost" onClick={() => setEdit(null)}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save service'}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
