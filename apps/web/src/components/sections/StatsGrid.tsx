import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { Stat } from '../../lib/api';
import { RevealGroup, RevealItem } from '../Reveal';

/** Animates the numeric part of values like "275+" or "7+ Years"; non-numeric values render as-is. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : 0;
  const [n, setN] = useState(reduce || !match ? target : 0);

  useEffect(() => {
    if (!inView || reduce || !match) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, reduce]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {match[1]}
      {n}
      {match[3]}
    </span>
  );
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line">
      {stats.map((s, i) => {
        const numeric = /\d/.test(s.value);
        return (
          <RevealItem key={s.id} className="h-full">
            <div className="relative h-full bg-ink-2 p-6 md:p-9 overflow-hidden group">
              <div
                className={`absolute -top-16 -right-16 h-40 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  i % 2 ? 'glow-blue' : 'glow-gold'
                }`}
                aria-hidden
              />
              <div
                className={`relative font-display font-bold leading-none ${
                  numeric ? 'text-4xl md:text-6xl text-gradient-gold' : 'text-xl md:text-2xl text-white'
                }`}
              >
                <CountUp value={s.value} />
              </div>
              <div className="relative mt-3 text-sm md:text-base font-semibold text-white">{s.label}</div>
              {s.subtext && <p className="relative mt-1.5 text-xs md:text-sm text-fg-3 leading-relaxed">{s.subtext}</p>}
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
