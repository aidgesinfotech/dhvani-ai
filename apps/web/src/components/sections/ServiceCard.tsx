import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../../lib/api';
import { Icon } from '../ui/Icon';
import { RevealGroup, RevealItem } from '../Reveal';

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const blue = index % 3 === 1;
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`card card-hover ${blue ? 'card-blue' : ''} group flex h-full flex-col p-6 md:p-7 overflow-hidden`}
      data-cursor="hover"
    >
      {service.image_url && (
        <div className="relative -mx-6 -mt-6 md:-mx-7 md:-mt-7 mb-6 aspect-[16/10] overflow-hidden border-b border-line">
          <img
            src={service.image_url}
            alt={service.image_label || service.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <span className={`icon-tile ${blue ? 'icon-tile-blue' : ''} !h-14 !w-14 transition-transform duration-300 group-hover:scale-110`}>
          <Icon name={service.icon} size={26} />
        </span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg-2 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black group-hover:rotate-45">
          <ArrowUpRight size={18} />
        </span>
      </div>
      {service.category && (
        <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-royal-light">{service.category}</span>
      )}
      <h3 className="mt-2 font-display text-xl md:text-[1.35rem] font-semibold text-white leading-snug group-hover:text-gold-light transition-colors">
        {service.title}
      </h3>
      {service.excerpt && <p className="mt-3 text-sm text-fg-2 leading-relaxed flex-1">{service.excerpt}</p>}
      {!!service.tags?.length && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {service.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip !text-[11px] !py-1 !px-2.5">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function ServiceGrid({ services, columns = 3 }: { services: Service[]; columns?: 2 | 3 }) {
  if (!services.length) return null;
  return (
    <RevealGroup className={`grid gap-4 md:gap-5 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {services.map((s, i) => (
        <RevealItem key={s.id} className="h-full">
          <ServiceCard service={s} index={i} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
