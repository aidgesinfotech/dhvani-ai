import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Bot,
  Building2,
  Clapperboard,
  Eye,
  Footprints,
  Glasses,
  Globe,
  Hand,
  Handshake,
  Layers,
  ListChecks,
  Lock,
  Scan,
  ShieldCheck,
  ShoppingBag,
  Tags,
  Users,
  UtensilsCrossed,
  Warehouse,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceBody } from '../../lib/api';
import { paragraphs } from '../../lib/content';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../Reveal';

const HIGHLIGHT_ICONS: LucideIcon[] = [Eye, Hand, Layers, Globe, ShieldCheck];

const USE_ICONS: LucideIcon[] = [Bot, Clapperboard, Glasses, Activity, Globe, Handshake];

function pickIcon(label: string): LucideIcon {
  const t = label.toLowerCase();
  if (t.includes('cook') || t.includes('household')) return UtensilsCrossed;
  if (t.includes('assembl') || t.includes('repair') || t.includes('diy')) return Wrench;
  if (t.includes('warehouse') || t.includes('industrial')) return Warehouse;
  if (t.includes('retail') || t.includes('shop')) return ShoppingBag;
  if (t.includes('outdoor') || t.includes('nav') || t.includes('commut')) return Footprints;
  if (t.includes('hand')) return Hand;
  if (t.includes('activity') || t.includes('step')) return ListChecks;
  if (t.includes('action') || t.includes('object')) return Tags;
  if (t.includes('scene') || t.includes('environment')) return Building2;
  if (t.includes('participant') || t.includes('demo')) return Users;
  if (t.includes('resolution') || t.includes('fps') || t.includes('stab')) return Scan;
  if (t.includes('protocol') || t.includes('task')) return ListChecks;
  if (t.includes('face') || t.includes('pii') || t.includes('blur')) return Eye;
  if (t.includes('consent')) return BadgeCheck;
  if (t.includes('encrypt') || t.includes('transfer') || t.includes('secure')) return Lock;
  return ShieldCheck;
}

export function EgocentricBody({ body }: { body: ServiceBody }) {
  const blocks = body.blocks || [];
  const [active, setActive] = useState(0);
  const current = blocks[active] ?? blocks[0];
  const copy = paragraphs(body.overview);

  return (
    <>
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading eyebrow="Overview" title="What the camera actually sees" />
            <div className="mt-6 space-y-5">
              {copy.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg leading-relaxed text-white/90' : 'leading-relaxed text-fg-2'}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          {!!body.highlights?.length && (
            <ul className="space-y-3">
              {body.highlights.map((item, i) => {
                const Glyph = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                return (
                  <li key={item}>
                    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/[0.06]">
                      <span className="icon-tile !h-11 !w-11 transition duration-300 group-hover:scale-105">
                        <Glyph size={18} />
                      </span>
                      <span className="text-sm font-medium text-white/90">{item}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {!!blocks.length && (
        <section className="section relative overflow-hidden border-y border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_10%_0%,rgba(55,24,200,0.28),transparent_55%),radial-gradient(70%_70%_at_100%_100%,rgba(209,169,8,0.14),transparent_50%)]" aria-hidden />
          <div className="container-x relative">
            <SectionHeading eyebrow="Capabilities" title={body.blocks_title || 'How we capture'} />
            <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {blocks.map((block, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={block.title}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                        on
                          ? 'border-gold/50 bg-gold/10 shadow-[0_0_0_1px_rgba(209,169,8,0.15)]'
                          : 'border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className={`icon-tile !h-11 !w-11 ${on ? '' : 'opacity-80'}`}>
                        <Icon name={block.icon} size={18} />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] tracking-[0.18em] text-gold/80">0{i + 1}</span>
                        <span className="mt-0.5 block font-display text-base font-semibold text-white">{block.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {current && (
                <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/50 p-7 md:p-10">
                  <svg viewBox="0 0 320 180" className="pointer-events-none absolute -right-6 -top-8 h-40 w-56 opacity-40" aria-hidden>
                    <path d="M24 28h40M24 28v40M296 28h-40M296 28v40M24 152h40M24 152v-40M296 152h-40M296 152v-40" stroke="#d1a908" strokeWidth="2" fill="none" />
                    <circle cx="160" cy="90" r="28" fill="none" stroke="rgba(139,116,255,0.7)" strokeWidth="1.5" />
                    <circle cx="160" cy="90" r="6" fill="#ecc937" />
                  </svg>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                    >
                      <span className="icon-tile">
                        <Icon name={current.icon} size={22} />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-white md:text-3xl">{current.title}</h3>
                      {current.body && <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{current.body}</p>}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {!!body.groups?.length && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Scope" title={body.groups_title || 'Coverage'} />
            <div className={`mt-12 grid gap-5 ${body.groups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
              {body.groups.map((group) => (
                <Reveal key={group.title} className="card h-full p-6 md:p-8">
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {group.items.map((item) => {
                      const Glyph = pickIcon(item);
                      return (
                        <li
                          key={item}
                          className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3 transition duration-300 hover:border-gold/40 hover:bg-gold/[0.05]"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold transition duration-300 group-hover:scale-105">
                            <Glyph size={16} />
                          </span>
                          <span className="text-sm text-white/85">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!!body.use_cases?.length || !!body.quality?.length) && (
        <section className="section relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden />
          <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#3718c8]/20 blur-3xl" aria-hidden />
          <div className="container-x relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {!!body.use_cases?.length && (
              <div>
                <span className="eyebrow">Use cases</span>
                <h2 className="mt-4 font-display text-3xl font-semibold text-white">Where it powers AI</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {body.use_cases.map((item, i) => {
                    const Glyph = USE_ICONS[i % USE_ICONS.length];
                    return (
                      <div
                        key={item}
                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-[#8b74ff]/50 hover:bg-[#3718c8]/15"
                      >
                        <span className="icon-tile icon-tile-blue !h-10 !w-10 transition duration-300 group-hover:scale-110">
                          <Glyph size={16} />
                        </span>
                        <span className="text-sm font-medium text-white">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {!!body.quality?.length && (
              <div className="card card-gold h-fit p-6 md:p-8">
                <span className="eyebrow">Quality & security</span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">Built to be trusted</h2>
                <ul className="mt-6 space-y-3">
                  {body.quality.map((item) => {
                    const Glyph = pickIcon(item);
                    return (
                      <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-black/30 text-gold">
                          <Glyph size={15} />
                        </span>
                        <span className="pt-1.5">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          {!!body.formats?.length && (
            <div className="container-x relative mt-6">
              <div className="flex flex-col gap-4 rounded-[1.25rem] border border-white/10 bg-black/40 p-5 md:flex-row md:items-center md:px-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Delivery formats</span>
                <div className="flex flex-wrap gap-2">
                  {body.formats.map((format) => (
                    <span key={format} className="chip chip-blue font-mono">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {body.closing && (
        <section className="section !py-8">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/25 px-8 py-12 text-center md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_120%,rgba(209,169,8,0.18),transparent_60%)]" aria-hidden />
              <p className="relative mx-auto max-w-3xl font-display text-xl font-medium leading-snug text-balance text-white md:text-3xl">
                “{body.closing}”
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
