import { Quote, Star } from 'lucide-react';
import type { Testimonial } from '../../lib/api';

function TestimonialCard({ t }: { t: Testimonial }) {
  const rating = Math.max(0, Math.min(5, Number(t.rating) || 5));
  return (
    <figure className="card w-[19rem] sm:w-[24rem] shrink-0 mx-2.5 p-6 md:p-7 whitespace-normal">
      <div className="flex items-center justify-between">
        <Quote size={28} className="text-royal-light" fill="currentColor" />
        <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={14} className="text-gold" fill="currentColor" />
          ))}
        </div>
      </div>
      <blockquote className="mt-5 text-[0.95rem] text-fg-2 leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-royal font-display font-bold text-black">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">{t.name}</span>
          {t.role && <span className="block text-xs text-fg-3">{t.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsMarquee({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track py-2" style={{ animationDuration: `${Math.max(40, items.length * 12)}s` }}>
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
