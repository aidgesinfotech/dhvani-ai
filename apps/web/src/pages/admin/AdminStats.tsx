import { CrudPage } from './CrudPage';

export function AdminStats() {
  return (
    <CrudPage
      title="Stats"
      subtitle="Shown on the Home and About pages. Values like “275+” animate as counters."
      endpoint="stats"
      defaults={{ value: '', label: '', subtext: '' }}
      fields={[
        { key: 'value', label: 'Value', required: true, hint: 'e.g. 100+ or 7+ Years' },
        { key: 'label', label: 'Label', required: true },
        { key: 'subtext', label: 'Subtext', full: true },
        { key: 'sort_order', label: 'Sort order', type: 'number' },
      ]}
      renderRow={(r) => (
        <>
          <p className="font-display text-lg font-bold text-gold">{String(r.value)}</p>
          <p className="text-sm text-white">{String(r.label)}</p>
          {!!r.subtext && <p className="text-xs text-white/40">{String(r.subtext)}</p>}
        </>
      )}
    />
  );
}
