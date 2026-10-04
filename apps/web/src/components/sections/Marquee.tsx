import { Sparkle } from 'lucide-react';

export function Marquee({
  items,
  reverse = false,
  variant = 'band',
  speed = 45,
}: {
  items: string[];
  reverse?: boolean;
  variant?: 'band' | 'chips';
  speed?: number;
}) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'marquee-reverse' : ''}`}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {loop.map((item, i) =>
          variant === 'chips' ? (
            <span key={i} className="chip mx-1.5 whitespace-nowrap !text-sm !py-2 !px-4">
              {item}
            </span>
          ) : (
            <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap" aria-hidden={i >= items.length}>
              <span className="font-display text-2xl md:text-4xl font-semibold text-white/90">{item}</span>
              <Sparkle size={20} className={i % 2 ? 'text-royal-light' : 'text-gold'} fill="currentColor" />
            </span>
          )
        )}
      </div>
    </div>
  );
}
