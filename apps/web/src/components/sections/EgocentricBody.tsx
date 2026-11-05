import {
  Activity,
  Bot,
  Building2,
  Car,
  Clapperboard,
  Glasses,
  Globe,
  Handshake,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceBody } from '../../lib/api';
import { paragraphs } from '../../lib/content';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';

const USE_ICONS: LucideIcon[] = [Bot, Clapperboard, Glasses, Activity, Globe, Handshake, Car, Building2];

export function EgocentricBody({ body }: { body: ServiceBody }) {
  const copy = paragraphs(body.overview);
  const programs = body.programs || [];

  return (
    <>
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container-x relative mx-auto max-w-4xl text-center">
          <SectionHeading eyebrow="Egocentric Data Collection" title="Physical AI capture across three programmes" align="center" />
          <div className="mt-6 space-y-4">
            {copy.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-lg leading-relaxed text-white/90' : 'leading-relaxed text-fg-2'}>
                {p}
              </p>
            ))}
          </div>
          {!!body.highlights?.length && (
            <RevealGroup className="mt-10 grid gap-3 text-left sm:grid-cols-2">
              {body.highlights.map((item) => (
                <RevealItem key={item}>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/85">{item}</div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      {!!programs.length && (
        <section id="ego-programs" className="section relative scroll-mt-24 overflow-hidden border-y border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_10%_0%,rgba(55,24,200,0.24),transparent_55%),radial-gradient(70%_70%_at_100%_100%,rgba(209,169,8,0.12),transparent_50%)]" aria-hidden />
          <div className="container-x relative">
            <SectionHeading
              eyebrow="Programmes"
              title={body.programs_title || 'Individual · Industrial · Road'}
              body="Three Physical AI capture tracks — everyday individual activity, industrial workforce workflows, and road / traffic intelligence."
              align="center"
            />
            <div className="mt-12 space-y-8">
              {programs.map((program, i) => (
                <Reveal key={program.title} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/45">
                    <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="border-b border-white/10 p-6 md:p-8 lg:border-r lg:border-b-0">
                        <span className="icon-tile !h-12 !w-12">
                          <Icon name={program.icon || (i === 0 ? 'users' : i === 1 ? 'building-2' : 'car')} size={20} />
                        </span>
                        <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">Programme {String(i + 1).padStart(2, '0')}</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-balance text-white md:text-[1.75rem]">{program.title}</h3>
                        {program.subtitle && <p className="mt-3 text-sm leading-relaxed text-fg-2">{program.subtitle}</p>}
                        {!!program.chips?.length && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {program.chips.map((chip) => (
                              <span key={chip} className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold">
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                        {program.body && <p className="mt-5 text-sm leading-relaxed text-white/80">{program.body}</p>}
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">{program.services_title || 'Our Services'}</p>
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {(program.services || []).map((service) => (
                            <li
                              key={service}
                              className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3 text-sm text-white/85"
                            >
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!!body.use_cases?.length || !!body.quality?.length) && (
        <section className="section relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden />
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
                  {body.quality.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                      <Users size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
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
