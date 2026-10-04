import type { ReactNode } from 'react';
import { Reveal } from '../Reveal';

/** Highlights the trailing `accent` words of a title in gold. */
export function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  if (accent && title.includes(accent)) {
    const i = title.lastIndexOf(accent);
    return (
      <>
        {title.slice(0, i)}
        <span className="text-gradient-gold">{accent}</span>
        {title.slice(i + accent.length)}
      </>
    );
  }
  return <>{title}</>;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = 'left',
  className = '',
  children,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title?: string;
  accent?: string;
  body?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && (
        <Tag className="mt-4 font-display text-[2rem] leading-[1.08] sm:text-4xl md:text-[3.1rem] font-semibold text-white text-balance">
          <AccentTitle title={title} accent={accent} />
        </Tag>
      )}
      {body && <p className={`mt-5 text-base md:text-lg text-fg-2 leading-relaxed ${center ? 'mx-auto' : ''}`}>{body}</p>}
      {children}
    </Reveal>
  );
}

export function Bullet({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'blue' }) {
  return (
    <li className="flex gap-3 text-fg-2 leading-relaxed">
      <span
        className={`mt-[0.55rem] h-2 w-2 shrink-0 rotate-45 rounded-[2px] ${
          tone === 'gold' ? 'bg-gold shadow-[0_0_10px_rgba(209,169,8,0.7)]' : 'bg-royal-light shadow-[0_0_10px_rgba(139,116,255,0.7)]'
        }`}
      />
      <span>{children}</span>
    </li>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" aria-busy="true" aria-label="Loading">
      <div className="flex items-end gap-1.5 h-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`wave-bar w-1.5 rounded-full ${i === 3 ? 'bg-royal-light' : 'bg-gold'}`}
            style={{ height: `${[40, 70, 100, 65, 35][i]}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
