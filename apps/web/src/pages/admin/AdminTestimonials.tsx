import { Badge } from './ui';
import { CrudPage } from './CrudPage';

export function AdminTestimonials() {
  return (
    <CrudPage
      title="Testimonials"
      subtitle="Client quotes shown in the Home page testimonial marquee. Replace the seeded placeholders with real, approved quotes."
      endpoint="testimonials"
      defaults={{ quote: '', name: '', role: '', rating: 5, published: 1 }}
      fields={[
        { key: 'quote', label: 'Quote', type: 'textarea', required: true },
        { key: 'name', label: 'Name', required: true },
        { key: 'role', label: 'Role / company' },
        { key: 'rating', label: 'Rating (1–5)', type: 'number' },
        { key: 'sort_order', label: 'Sort order', type: 'number' },
        { key: 'published', label: 'Published', type: 'toggle' },
      ]}
      renderRow={(r) => (
        <>
          <p className="text-sm text-white/80 line-clamp-2">“{String(r.quote)}”</p>
          <p className="mt-1.5 flex items-center gap-2 text-xs text-white/45">
            {String(r.name)} {r.role ? `· ${String(r.role)}` : ''}
            {!r.published && <Badge tone="red">hidden</Badge>}
          </p>
        </>
      )}
    />
  );
}
