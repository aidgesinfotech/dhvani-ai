import { Badge } from './ui';
import { CrudPage } from './CrudPage';

const GROUPS = ['home', 'about', 'services', 'collaborate'];

export function AdminProcess() {
  return (
    <CrudPage
      title="Process Steps"
      subtitle="Step timelines per page: home (Home), about (About lifecycle), services (Services + every service page), collaborate (partner onboarding)."
      endpoint="process"
      defaults={{ group_key: 'home', step_number: 1, title: '', body: '' }}
      filter={{ key: 'group_key', options: GROUPS }}
      fields={[
        { key: 'group_key', label: 'Group', type: 'select', options: GROUPS },
        { key: 'step_number', label: 'Step number', type: 'number' },
        { key: 'title', label: 'Title', required: true, full: true },
        { key: 'body', label: 'Description', type: 'textarea' },
        { key: 'sort_order', label: 'Sort order', type: 'number' },
      ]}
      renderRow={(r) => (
        <div className="flex gap-4">
          <span className="font-mono text-sm text-gold">{String(r.step_number).padStart(2, '0')}</span>
          <div className="min-w-0">
            <p className="font-medium text-white">{String(r.title)}</p>
            <p className="mt-1 text-xs text-white/45 line-clamp-2">{String(r.body || '')}</p>
            <div className="mt-2">
              <Badge tone="blue">{String(r.group_key)}</Badge>
            </div>
          </div>
        </div>
      )}
    />
  );
}
