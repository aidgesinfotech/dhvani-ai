import { CircleCheck, CircleAlert } from 'lucide-react';

export type Status = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string };

export function FormStatus({ status }: { status: Status }) {
  if (status.kind !== 'ok' && status.kind !== 'error') return null;
  const ok = status.kind === 'ok';
  return (
    <div
      role="status"
      className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
        ok ? 'border-gold/40 bg-gold/10 text-gold-light' : 'border-red-500/40 bg-red-500/10 text-red-300'
      }`}
    >
      {ok ? <CircleCheck size={18} className="shrink-0" /> : <CircleAlert size={18} className="shrink-0" />}
      <span>{status.message}</span>
    </div>
  );
}

/** Hidden honeypot — real users never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
