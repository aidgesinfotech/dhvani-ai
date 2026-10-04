import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Code, Plus, Trash2, X } from 'lucide-react';
import { ICON_NAMES } from '../../components/ui/Icon';

export const field =
  'w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold/70 focus:bg-gold/[0.03]';
export const labelCls = 'block text-[11px] font-medium uppercase tracking-wider text-white/45';

export function AdminHeader({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-white/45">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger' | 'blue';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}) {
  const styles = {
    primary: 'bg-gold text-black hover:bg-gold-light',
    blue: 'bg-royal text-white hover:brightness-110',
    ghost: 'border border-white/12 text-white/80 hover:border-gold/50 hover:text-white',
    danger: 'border border-red-500/30 text-red-300 hover:bg-red-500/10',
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function Notice({ msg, onClose }: { msg: { kind: 'ok' | 'error'; text: string } | null; onClose?: () => void }) {
  useEffect(() => {
    if (!msg || msg.kind === 'error' || !onClose) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [msg, onClose]);
  if (!msg) return null;
  return (
    <div
      className={`mb-5 flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
        msg.kind === 'ok' ? 'border-gold/40 bg-gold/10 text-gold-light' : 'border-red-500/40 bg-red-500/10 text-red-300'
      }`}
    >
      <span>{msg.text}</span>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-3 py-8 backdrop-blur-sm" data-lenis-prevent>
      <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} rounded-2xl border border-white/10 bg-[#0a0a0d] shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-white/35">{hint}</span>}
    </label>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-white/80">
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? 'bg-gold' : 'bg-white/15'}`}
        onClick={() => onChange(!checked)}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`} />
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function Badge({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'blue' | 'gray' | 'green' | 'red' }) {
  const t = {
    gold: 'border-gold/35 bg-gold/10 text-gold-light',
    blue: 'border-royal-light/35 bg-royal/20 text-[#c2b6ff]',
    gray: 'border-white/12 bg-white/5 text-white/60',
    green: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    red: 'border-red-400/30 bg-red-400/10 text-red-300',
  }[tone];
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${t}`}>{children}</span>;
}

/* ---------------------------------------------------------------- JSON editor */

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const humanize = (k: string) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const LONG_KEYS = /(body|answer|description|overview|subtitle|closing|quote|message|note|content)/i;

/** Builds an empty value with the same shape as `sample`, used when adding list items. */
function blankLike(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v)]));
  }
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  return '';
}

function itemTitle(v: Json, i: number) {
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const t = v.title ?? v.question ?? v.label ?? v.kicker ?? v.value;
    if (typeof t === 'string' && t) return t;
  }
  return `Item ${i + 1}`;
}

function Scalar({ name, value, onChange }: { name: string; value: Json; onChange: (v: Json) => void }) {
  if (typeof value === 'boolean') return <Toggle checked={value} onChange={onChange} label={humanize(name)} />;
  if (typeof value === 'number')
    return <input type="number" className={field} value={value} onChange={(e) => onChange(Number(e.target.value))} />;
  const str = value == null ? '' : String(value);
  if (name === 'icon')
    return (
      <>
        <input className={field} list="dh-icons" value={str} onChange={(e) => onChange(e.target.value)} />
        <datalist id="dh-icons">
          {ICON_NAMES.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </>
    );
  const long = LONG_KEYS.test(name) || str.length > 90;
  return long ? (
    <textarea className={`${field} min-h-24 resize-y`} value={str} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input
      className={field}
      value={str}
      placeholder={/image_url|cover_url|logo_url/.test(name) ? 'https://… (leave empty to show placeholder)' : ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function StringList({ value, onChange }: { value: string[]; onChange: (v: Json) => void }) {
  const move = (i: number, d: number) => {
    const next = [...value];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-1.5">
      {value.map((v, i) => (
        <div key={i} className="flex gap-1.5">
          <input
            className={field}
            value={v}
            onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))}
          />
          <button type="button" className="px-1.5 text-white/40 hover:text-white" onClick={() => move(i, -1)} aria-label="Move up">
            <ArrowUp size={14} />
          </button>
          <button type="button" className="px-1.5 text-white/40 hover:text-white" onClick={() => move(i, 1)} aria-label="Move down">
            <ArrowDown size={14} />
          </button>
          <button type="button" className="px-1.5 text-red-400/70 hover:text-red-300" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-light" onClick={() => onChange([...value, ''])}>
        <Plus size={13} /> Add
      </button>
    </div>
  );
}

function ObjectList({ value, onChange }: { value: Json[]; onChange: (v: Json) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const move = (i: number, d: number) => {
    const next = [...value];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const add = () => {
    const sample = value[0] ?? { title: '', body: '' };
    onChange([...value, blankLike(sample)]);
    setOpen(value.length);
  };
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 px-3 py-2">
            <button type="button" className="flex flex-1 items-center gap-2 text-left text-sm text-white/85 min-w-0" onClick={() => setOpen(open === i ? null : i)}>
              <ChevronDown size={14} className={`shrink-0 text-gold transition-transform ${open === i ? '' : '-rotate-90'}`} />
              <span className="truncate">{itemTitle(item, i)}</span>
            </button>
            <button type="button" className="p-1 text-white/40 hover:text-white" onClick={() => move(i, -1)} aria-label="Move up">
              <ArrowUp size={14} />
            </button>
            <button type="button" className="p-1 text-white/40 hover:text-white" onClick={() => move(i, 1)} aria-label="Move down">
              <ArrowDown size={14} />
            </button>
            <button type="button" className="p-1 text-red-400/70 hover:text-red-300" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">
              <Trash2 size={14} />
            </button>
          </div>
          {open === i && (
            <div className="border-t border-white/10 p-3">
              <JsonFields value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} />
            </div>
          )}
        </div>
      ))}
      <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-light" onClick={add}>
        <Plus size={13} /> Add item
      </button>
    </div>
  );
}

function JsonFields({ value, onChange, name = '' }: { value: Json; onChange: (v: Json) => void; name?: string }) {
  if (Array.isArray(value)) {
    const allStrings = value.every((v) => typeof v === 'string');
    return allStrings ? <StringList value={value as string[]} onChange={onChange} /> : <ObjectList value={value} onChange={onChange} />;
  }
  if (value && typeof value === 'object') {
    return (
      <div className="grid gap-3.5">
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            {typeof v !== 'boolean' && <span className={labelCls}>{humanize(k)}</span>}
            <div className={typeof v !== 'boolean' ? 'mt-1.5' : ''}>
              <JsonFields name={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <Scalar name={name} value={value} onChange={onChange} />;
}

/** Structured editor for arbitrary CMS JSON, with a raw-JSON escape hatch. */
export function JsonEditor({ value, onChange }: { value: unknown; onChange: (v: Record<string, unknown>) => void }) {
  const [raw, setRaw] = useState(false);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');

  const openRaw = () => {
    setText(JSON.stringify(value ?? {}, null, 2));
    setErr('');
    setRaw(true);
  };

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => (raw ? setRaw(false) : openRaw())}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-white/55 hover:text-white"
        >
          <Code size={12} /> {raw ? 'Visual editor' : 'Raw JSON'}
        </button>
      </div>
      {raw ? (
        <>
          <textarea
            className={`${field} min-h-72 font-mono text-xs`}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              try {
                onChange(JSON.parse(e.target.value));
                setErr('');
              } catch {
                setErr('Invalid JSON — changes are not applied until it parses.');
              }
            }}
          />
          {err && <p className="mt-1.5 text-xs text-red-300">{err}</p>}
        </>
      ) : (
        <JsonFields value={(value ?? {}) as Json} onChange={(v) => onChange(v as Record<string, unknown>)} />
      )}
    </div>
  );
}

export function useConfirm() {
  return (text = 'Delete this item? This cannot be undone.') => window.confirm(text);
}
