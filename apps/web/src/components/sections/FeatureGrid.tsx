import type { TitledItem } from '../../lib/api';
import { Icon } from '../ui/Icon';
import { RevealGroup, RevealItem } from '../Reveal';

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
};

/** Icon + title + body cards; `tone` alternates the gold/blue accent treatment. */
export function FeatureGrid({
  items,
  columns = 3,
  tone = 'mixed',
  numbered = false,
  className = '',
}: {
  items: TitledItem[];
  columns?: 2 | 3 | 4 | 5;
  tone?: 'gold' | 'blue' | 'mixed';
  numbered?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <RevealGroup className={`grid gap-4 md:gap-5 ${COLS[columns]} ${className}`}>
      {items.map((item, i) => {
        const blue = tone === 'blue' || (tone === 'mixed' && i % 2 === 1);
        return (
          <RevealItem key={`${item.title}-${i}`} className="h-full">
            <article className={`card card-hover ${blue ? 'card-blue' : ''} h-full p-6 md:p-7 overflow-hidden group`}>
              {numbered && (
                <span className="absolute right-5 top-4 font-display text-5xl font-bold stroke-num select-none" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              {item.icon !== undefined && (
                <span className={`icon-tile ${blue ? 'icon-tile-blue' : ''} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon name={item.icon} size={22} />
                </span>
              )}
              <h3 className={`${item.icon !== undefined ? 'mt-5' : ''} font-display text-lg md:text-xl font-semibold text-white`}>
                {item.title}
              </h3>
              {item.body && <p className="mt-2.5 text-sm md:text-[0.95rem] text-fg-2 leading-relaxed">{item.body}</p>}
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
