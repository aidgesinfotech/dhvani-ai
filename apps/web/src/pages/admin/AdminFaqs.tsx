import { Badge } from './ui';
import { CrudPage } from './CrudPage';

const CATEGORIES = ['General', 'Services', 'Collaborate', 'Contact'];

export function AdminFaqs() {
  return (
    <CrudPage
      title="FAQs"
      subtitle="General → Home & About · Services → Services page · Collaborate → Collaborate page · Contact → Contact page. Service-specific FAQs live inside each service."
      endpoint="faqs"
      defaults={{ question: '', answer: '', category: 'General', published: 1 }}
      filter={{ key: 'category', options: CATEGORIES }}
      fields={[
        { key: 'question', label: 'Question', required: true, full: true },
        { key: 'answer', label: 'Answer', type: 'textarea', required: true },
        { key: 'category', label: 'Category', type: 'select', options: CATEGORIES },
        { key: 'sort_order', label: 'Sort order', type: 'number' },
        { key: 'published', label: 'Published', type: 'toggle' },
      ]}
      renderRow={(r) => (
        <>
          <p className="font-medium text-white">{String(r.question)}</p>
          <p className="mt-1 text-xs text-white/45 line-clamp-2">{String(r.answer)}</p>
          <div className="mt-2 flex gap-1.5">
            <Badge tone="blue">{String(r.category || 'General')}</Badge>
            {!r.published && <Badge tone="red">hidden</Badge>}
          </div>
        </>
      )}
    />
  );
}
