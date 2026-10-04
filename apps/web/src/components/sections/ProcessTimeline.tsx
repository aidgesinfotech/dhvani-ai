import type { ProcessStep } from '../../lib/api';
import { RevealGroup, RevealItem } from '../Reveal';

/** Numbered steps on a glowing rail — vertical on mobile, grid on desktop. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) return null;
  const cols = steps.length >= 6 ? 'lg:grid-cols-3' : steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5';
  return (
    <RevealGroup className={`relative grid gap-4 md:grid-cols-2 ${cols}`}>
      {steps.map((s, i) => (
        <RevealItem key={s.id} className="h-full">
          <article className="card card-hover relative h-full p-6 md:p-7 overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-px divider-glow opacity-60" aria-hidden />
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-sm font-medium text-gold shadow-[0_0_24px_-6px_rgba(209,169,8,0.7)] group-hover:bg-gold group-hover:text-black transition-colors">
                {String(s.step_number || i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-royal-light">Step</span>
            </div>
            <h3 className="mt-5 font-display text-lg md:text-xl font-semibold text-white">{s.title}</h3>
            {s.body && <p className="mt-2.5 text-sm text-fg-2 leading-relaxed">{s.body}</p>}
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
