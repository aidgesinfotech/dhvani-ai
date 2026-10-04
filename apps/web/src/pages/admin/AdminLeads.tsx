import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Download, Mail, Paperclip, Phone, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { AdminHeader, Badge, Btn, Notice, field, useConfirm } from './ui';

type LeadFile = { id: number; lead_id: number; field: string; filename: string; mime: string; size: number };
type Lead = {
  id: number;
  type: 'contact' | 'freelancer' | 'vendor' | 'newsletter';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  city?: string;
  subject?: string;
  message?: string;
  meta?: Record<string, string> | null;
  status: string;
  created_at: string;
  files: LeadFile[];
};

const TYPES = [
  { key: '', label: 'All' },
  { key: 'contact', label: 'Contact' },
  { key: 'freelancer', label: 'Freelancers' },
  { key: 'vendor', label: 'Vendors' },
  { key: 'newsletter', label: 'Newsletter' },
];
const STATUSES = ['new', 'read', 'contacted', 'archived'];
const TONE: Record<string, 'gold' | 'blue' | 'green' | 'gray'> = { contact: 'gold', freelancer: 'blue', vendor: 'green', newsletter: 'gray' };
const humanize = (k: string) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function toCsv(rows: Lead[]) {
  const cols = ['created_at', 'type', 'status', 'name', 'email', 'phone', 'company', 'country', 'city', 'subject', 'message'];
  const metaKeys = [...new Set(rows.flatMap((r) => Object.keys(r.meta || {})))];
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const head = [...cols, ...metaKeys].join(',');
  const body = rows.map((r) => [...cols.map((c) => esc(r[c as keyof Lead])), ...metaKeys.map((k) => esc(r.meta?.[k]))].join(','));
  return [head, ...body].join('\n');
}

export function AdminLeads() {
  const [params, setParams] = useSearchParams();
  const type = params.get('type') || '';
  const [leads, setLeads] = useState<Lead[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const confirm = useConfirm();

  const load = useCallback(
    () =>
      api
        .get<Lead[]>(`/api/admin/leads${type ? `?type=${type}` : ''}`)
        .then(setLeads)
        .catch((e) => setMsg({ kind: 'error', text: e.message })),
    [type]
  );
  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (l: Lead, status: string) => {
    await api.patch(`/api/admin/leads/${l.id}`, { status });
    setLeads((all) => all.map((x) => (x.id === l.id ? { ...x, status } : x)));
  };

  const toggle = (l: Lead) => {
    setOpen(open === l.id ? null : l.id);
    if (l.status === 'new') setStatus(l, 'read');
  };

  const download = async (l: Lead, f: LeadFile) => {
    try {
      await api.download(`/api/admin/leads/${l.id}/files/${f.id}`, f.filename);
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Download failed' });
    }
  };

  const exportCsv = () => {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dhvani-leads-${type || 'all'}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const term = q.trim().toLowerCase();
  const filtered = term
    ? leads.filter((l) => [l.name, l.email, l.company, l.message, l.phone].some((v) => v?.toLowerCase().includes(term)))
    : leads;

  return (
    <div>
      <AdminHeader title="Leads & Registrations" subtitle="Contact enquiries, freelancer & vendor registrations and newsletter sign-ups.">
        <Btn variant="ghost" onClick={exportCsv} disabled={!filtered.length}>
          <Download size={15} /> Export CSV
        </Btn>
      </AdminHeader>
      <Notice msg={msg} onClose={() => setMsg(null)} />

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setParams(t.key ? { type: t.key } : {})}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${type === t.key ? 'bg-gold text-black' : 'border border-white/10 text-white/60 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input className={`${field} md:max-w-xs`} placeholder="Search name, email, company…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-sm text-white/40">No submissions found.</p>}
        {filtered.map((l) => (
          <div key={l.id} className={`card overflow-hidden ${l.status === 'new' ? '!border-gold/35' : ''}`}>
            <button type="button" onClick={() => toggle(l)} className="flex w-full flex-wrap items-center gap-3 p-4 text-left">
              <ChevronDown size={16} className={`shrink-0 text-gold transition-transform ${open === l.id ? '' : '-rotate-90'}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {l.name || l.email}
                  {l.company ? <span className="text-white/40"> · {l.company}</span> : null}
                </p>
                <p className="truncate text-xs text-white/40">
                  {l.email} {l.subject ? `· ${l.subject}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {l.files.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs text-white/50">
                    <Paperclip size={12} /> {l.files.length}
                  </span>
                )}
                <Badge tone={TONE[l.type]}>{l.type}</Badge>
                {l.status === 'new' && <Badge>new</Badge>}
                <span className="text-xs text-white/35">{new Date(l.created_at).toLocaleString()}</span>
              </div>
            </button>
            {open === l.id && (
              <div className="border-t border-white/10 p-5">
                <div className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-white/80">
                    <Mail size={14} className="text-gold" />
                    <a href={`mailto:${l.email}`} className="hover:text-gold">
                      {l.email}
                    </a>
                  </p>
                  {l.phone && (
                    <p className="flex items-center gap-2 text-white/80">
                      <Phone size={14} className="text-gold" />
                      <a href={`tel:${l.phone}`} className="hover:text-gold">
                        {l.phone}
                      </a>
                    </p>
                  )}
                  {[
                    ['Company', l.company],
                    ['Country', l.country],
                    ['City', l.city],
                    ['Service / subject', l.subject],
                    ...Object.entries(l.meta || {}).filter(([k]) => k !== 'company_name'),
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <p key={k} className="text-white/80">
                        <span className="block text-[11px] uppercase tracking-wider text-white/35">{humanize(String(k))}</span>
                        {String(v)}
                      </p>
                    ))}
                </div>
                {l.message && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80 whitespace-pre-line">{l.message}</div>
                )}
                {l.files.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {l.files.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => download(l, f)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-gold-light hover:bg-gold/10"
                      >
                        <Download size={13} /> {humanize(f.field)}: {f.filename} ({Math.round(f.size / 1024)} KB)
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <label className="flex items-center gap-2 text-xs text-white/50">
                    Status
                    <select className={`${field} !w-auto !py-1.5`} value={l.status} onChange={(e) => setStatus(l, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Btn
                    variant="danger"
                    onClick={async () => {
                      if (!confirm('Delete this submission and its files?')) return;
                      await api.delete(`/api/admin/leads/${l.id}`);
                      load();
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </Btn>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
