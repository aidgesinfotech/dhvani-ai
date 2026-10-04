import { useEffect, useState } from 'react';
import { ArrowUpRight, Pencil, Plus, Trash2 } from 'lucide-react';
import { api, formatDate, type Post } from '../../lib/api';
import { Markdown } from '../../components/Markdown';
import { AdminHeader, Badge, Btn, Field, Modal, Notice, Toggle, field, useConfirm } from './ui';

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY: Partial<Post> = {
  title: '',
  slug: '',
  category: 'Insights',
  excerpt: '',
  content: '',
  author: 'Dhvani.ai Team',
  cover_url: '',
  cover_label: '',
  read_minutes: 5,
  tags: [],
  published: true,
  published_at: today(),
  seo_title: '',
  seo_description: '',
};

export function AdminPosts() {
  const [items, setItems] = useState<Post[]>([]);
  const [edit, setEdit] = useState<Partial<Post> | null>(null);
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const confirm = useConfirm();

  const load = () => api.get<Post[]>('/api/admin/posts').then(setItems).catch((e) => setMsg({ kind: 'error', text: e.message }));
  useEffect(() => {
    load();
  }, []);

  const set = (k: keyof Post, v: unknown) => edit && setEdit({ ...edit, [k]: v });

  const save = async () => {
    if (!edit?.title) return setMsg({ kind: 'error', text: 'Title is required' });
    setSaving(true);
    try {
      if (edit.id) await api.put(`/api/admin/posts/${edit.id}`, edit);
      else await api.post('/api/admin/posts', edit);
      setEdit(null);
      setMsg({ kind: 'ok', text: 'Post saved.' });
      load();
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Blog Posts" subtitle="Articles appear at /blog. Content supports ## headings, ### subheadings, - lists, > quotes, **bold** and *italic*.">
        <Btn
          onClick={() => {
            setPreview(false);
            setEdit({ ...EMPTY, published_at: today() });
          }}
        >
          <Plus size={15} /> New post
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="space-y-2">
        {items.length === 0 && <p className="text-sm text-white/40">No posts yet.</p>}
        {items.map((p) => (
          <div key={p.id} className="card flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{p.title}</p>
              <p className="truncate text-xs text-white/40">
                {p.category} · {formatDate(p.published_at)} · {p.read_minutes} min
              </p>
            </div>
            {!p.published && <Badge tone="red">draft</Badge>}
            <div className="flex items-center gap-1">
              <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="p-2 text-white/40 hover:text-gold" aria-label="View">
                <ArrowUpRight size={16} />
              </a>
              <button
                type="button"
                className="p-2 text-white/60 hover:text-gold"
                onClick={() => {
                  setPreview(false);
                  setEdit({ ...p, published_at: (p.published_at || today()).slice(0, 10) });
                }}
                aria-label="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                className="p-2 text-red-400/70 hover:text-red-300"
                onClick={async () => {
                  if (!confirm(`Delete “${p.title}”?`)) return;
                  await api.delete(`/api/admin/posts/${p.id}`);
                  load();
                }}
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <Modal title={edit.id ? 'Edit post' : 'New post'} onClose={() => setEdit(null)} wide>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Title *">
                <input className={field} value={edit.title || ''} onChange={(e) => set('title', e.target.value)} />
              </Field>
            </div>
            <Field label="Slug" hint="Leave empty to generate from title">
              <input className={field} value={edit.slug || ''} onChange={(e) => set('slug', e.target.value)} />
            </Field>
            <Field label="Category">
              <input className={field} value={edit.category || ''} onChange={(e) => set('category', e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Excerpt">
                <textarea className={`${field} min-h-20`} value={edit.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="block text-[11px] font-medium uppercase tracking-wider text-white/45">Content</span>
                <button type="button" onClick={() => setPreview(!preview)} className="text-xs text-gold hover:text-gold-light">
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
              {preview ? (
                <div className="max-h-[28rem] overflow-y-auto rounded-xl border border-white/10 p-5">
                  <Markdown source={edit.content} />
                </div>
              ) : (
                <textarea className={`${field} min-h-[22rem] font-mono text-[13px] leading-relaxed`} value={edit.content || ''} onChange={(e) => set('content', e.target.value)} />
              )}
            </div>
            <Field label="Author">
              <input className={field} value={edit.author || ''} onChange={(e) => set('author', e.target.value)} />
            </Field>
            <Field label="Publish date">
              <input type="date" className={field} value={edit.published_at || ''} onChange={(e) => set('published_at', e.target.value)} />
            </Field>
            <Field label="Cover image URL" hint="Empty = branded placeholder">
              <input className={field} value={edit.cover_url || ''} onChange={(e) => set('cover_url', e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Cover label / alt text">
              <input className={field} value={edit.cover_label || ''} onChange={(e) => set('cover_label', e.target.value)} />
            </Field>
            <Field label="Read time (minutes)">
              <input type="number" className={field} value={edit.read_minutes ?? 5} onChange={(e) => set('read_minutes', Number(e.target.value))} />
            </Field>
            <Field label="Tags" hint="Comma separated">
              <input className={field} value={(edit.tags || []).join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()))} />
            </Field>
            <Field label="SEO title">
              <input className={field} value={edit.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
            </Field>
            <Field label="SEO description">
              <input className={field} value={edit.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Toggle checked={!!edit.published} onChange={(v) => set('published', v)} label="Published" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-white/10 pt-5">
            <Btn variant="ghost" onClick={() => setEdit(null)}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save post'}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
