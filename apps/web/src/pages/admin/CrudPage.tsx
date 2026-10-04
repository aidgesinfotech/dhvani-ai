import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { AdminHeader, Btn, Field, Modal, Notice, Toggle, field, useConfirm } from './ui';

type Row = { id: number } & Record<string, unknown>;

export type CrudField = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'toggle' | 'select';
  options?: string[];
  hint?: string;
  required?: boolean;
  full?: boolean;
};

/** Generic list + modal editor for the simple /api/admin/<endpoint> CRUD tables. */
export function CrudPage({
  title,
  subtitle,
  endpoint,
  fields,
  defaults,
  renderRow,
  filter,
}: {
  title: string;
  subtitle?: string;
  endpoint: string;
  fields: CrudField[];
  defaults: Record<string, unknown>;
  renderRow: (row: Row) => ReactNode;
  filter?: { key: string; options: string[] };
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [active, setActive] = useState('All');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const confirm = useConfirm();

  const load = useCallback(
    () => api.get<Row[]>(`/api/admin/${endpoint}`).then(setRows).catch((e) => setMsg({ kind: 'error', text: e.message })),
    [endpoint]
  );
  useEffect(() => {
    load();
  }, [load]);

  const visible = filter && active !== 'All' ? rows.filter((r) => r[filter.key] === active) : rows;

  const save = async () => {
    if (!edit) return;
    const missing = fields.find((f) => f.required && !String(edit[f.key] ?? '').trim());
    if (missing) return setMsg({ kind: 'error', text: `${missing.label} is required` });
    try {
      if (edit.id) await api.put(`/api/admin/${endpoint}/${edit.id}`, edit);
      else await api.post(`/api/admin/${endpoint}`, edit);
      setEdit(null);
      setMsg({ kind: 'ok', text: 'Saved — live on the website.' });
      load();
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    }
  };

  const set = (k: string, v: unknown) => edit && setEdit({ ...edit, [k]: v });

  return (
    <div>
      <AdminHeader title={title} subtitle={subtitle}>
        <Btn
          onClick={() =>
            setEdit({
              ...defaults,
              ...(filter && active !== 'All' ? { [filter.key]: active } : {}),
              sort_order: visible.length + 1,
            })
          }
        >
          <Plus size={15} /> Add
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      {filter && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {['All', ...filter.options].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setActive(o)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${active === o ? 'bg-gold text-black' : 'border border-white/10 text-white/60 hover:text-white'}`}
            >
              {o} <span className="opacity-60">{o === 'All' ? rows.length : rows.filter((r) => r[filter.key] === o).length}</span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {visible.length === 0 && <p className="text-sm text-white/40">Nothing here yet.</p>}
        {visible.map((r) => (
          <div key={r.id} className="card flex items-start gap-4 p-4">
            <div className="min-w-0 flex-1">{renderRow(r)}</div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" className="p-2 text-white/60 hover:text-gold" onClick={() => setEdit(r)} aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button
                type="button"
                className="p-2 text-red-400/70 hover:text-red-300"
                onClick={async () => {
                  if (!confirm()) return;
                  await api.delete(`/api/admin/${endpoint}/${r.id}`);
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
        <Modal title={edit.id ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`} onClose={() => setEdit(null)}>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => {
              const v = edit[f.key];
              const full = f.full || f.type === 'textarea' || f.type === 'toggle';
              let input: ReactNode;
              if (f.type === 'toggle')
                input = <Toggle checked={v === true || v === 1} onChange={(b) => set(f.key, b ? 1 : 0)} label={f.label} />;
              else if (f.type === 'textarea')
                input = <textarea className={`${field} min-h-28`} value={String(v ?? '')} onChange={(e) => set(f.key, e.target.value)} />;
              else if (f.type === 'number')
                input = <input type="number" className={field} value={Number(v ?? 0)} onChange={(e) => set(f.key, Number(e.target.value))} />;
              else if (f.type === 'select')
                input = (
                  <select className={field} value={String(v ?? '')} onChange={(e) => set(f.key, e.target.value)}>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                );
              else input = <input className={field} value={String(v ?? '')} onChange={(e) => set(f.key, e.target.value)} />;
              return (
                <div key={f.key} className={full ? 'sm:col-span-2' : ''}>
                  {f.type === 'toggle' ? (
                    input
                  ) : (
                    <Field label={`${f.label}${f.required ? ' *' : ''}`} hint={f.hint}>
                      {input}
                    </Field>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-white/10 pt-5">
            <Btn variant="ghost" onClick={() => setEdit(null)}>
              Cancel
            </Btn>
            <Btn onClick={save}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
