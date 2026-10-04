import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2, Check, UserRound } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { usePage, useProcess } from '../lib/usePage';
import { items, list, str, type Section } from '../lib/content';
import type { TitledItem } from '../lib/api';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { SectionHeading, PageLoader } from '../components/ui/SectionHeading';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { Icon } from '../components/ui/Icon';
import { splitAccent } from '../components/sections/PageHero';
import { Marquee } from '../components/sections/Marquee';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ServiceGrid } from '../components/sections/ServiceCard';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { StatsGrid } from '../components/sections/StatsGrid';
import { TestimonialsMarquee } from '../components/sections/Testimonials';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';

type ShowcaseItem = {
  kicker?: string;
  title: string;
  subtitle?: string;
  points?: string[];
  image_url?: string;
  image_label?: string;
  link?: string;
};

function SoundWave({ className = '' }: { className?: string }) {
  const bars = [18, 34, 56, 40, 72, 96, 64, 84, 48, 100, 70, 44, 82, 58, 36, 62, 28, 46, 20];
  return (
    <div className={`flex items-center gap-[5px] h-16 ${className}`} aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`wave-bar w-[4px] rounded-full ${i % 5 === 3 ? 'bg-royal-light' : 'bg-gold'}`}
          style={{ height: `${h}%`, animationDelay: `${(i % 7) * 0.13}s`, opacity: 0.55 + (h / 100) * 0.45 }}
        />
      ))}
    </div>
  );
}

function Hero({ page, extras }: { page: NonNullable<ReturnType<typeof usePage>['page']>; extras?: Section }) {
  const reduce = useReducedMotion();
  const title = page.hero_title || 'We Build the Data That Builds AI';
  const { head, tail } = splitAccent(title, 2);
  const cards = items<{ value: string; label: string }>(extras, 'floating_cards');
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 min-h-[min(100svh,58rem)] flex items-center">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute -top-48 -left-40 h-[40rem] w-[40rem] glow-blue" aria-hidden />
      <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] glow-gold opacity-70" aria-hidden />

      <div className="container-x relative grid gap-14 lg:grid-cols-[1.08fr_0.92fr] items-center">
        <div>
          <motion.div {...anim(0)} className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/[0.06] pl-1.5 pr-4 py-1.5">
            <span className="rounded-full bg-gold px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-black">
              Dhvani.ai
            </span>
            <span className="text-xs md:text-sm text-gold-light">{page.hero_eyebrow || 'AI is the Future'}</span>
          </motion.div>

          <motion.h1
            {...anim(0.1)}
            className="mt-7 font-display text-[2.7rem] leading-[1.02] sm:text-6xl md:text-7xl xl:text-[5.4rem] font-bold text-white text-balance"
          >
            {head}
            <span className="text-gradient-mix">{tail}</span>
          </motion.h1>

          {page.hero_subtitle && (
            <motion.p {...anim(0.2)} className="mt-7 max-w-xl text-base md:text-lg text-fg-2 leading-relaxed">
              {page.hero_subtitle}
            </motion.p>
          )}

          <motion.div {...anim(0.3)} className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
            {page.hero_cta_primary && (
              <Link to="/contact-us" className="btn btn-primary !whitespace-normal text-center">
                {page.hero_cta_primary}
                <ArrowUpRight size={17} className="shrink-0" />
              </Link>
            )}
            {page.hero_cta_secondary && (
              <Link to="/services" className="btn btn-ghost">
                {page.hero_cta_secondary}
              </Link>
            )}
          </motion.div>

          {list(extras, 'modalities').length > 0 && (
            <motion.div {...anim(0.4)} className="mt-10 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3 mr-1">Modalities</span>
              {list(extras, 'modalities').map((m, i) => (
                <span key={m} className={`chip ${i % 2 ? 'chip-blue' : 'chip-gold'}`}>
                  {m}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div {...anim(0.25)} className="relative mx-auto w-full max-w-[34rem]">
          <div className="absolute inset-0 -m-10 rounded-full border border-royal-light/15 animate-spin-slow" aria-hidden>
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_rgba(209,169,8,0.9)]" />
          </div>
          <ImagePlaceholder
            src={str(extras, 'image_url')}
            label={str(extras, 'image_label', 'Hero visual')}
            ratio="aspect-[4/5]"
            className="relative !rounded-[2rem]"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl header-glass p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Live data stream</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-gold pulse-ring" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
            </div>
            <SoundWave className="mt-2 !h-10" />
          </div>
          {cards.map((c, i) => (
            <div
              key={c.label}
              className={`absolute hidden sm:block header-glass rounded-2xl px-4 py-3 animate-float ${
                ['-left-8 top-10', '-right-6 top-1/3', '-left-6 bottom-36'][i % 3]
              }`}
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <div className="font-display text-2xl font-bold text-gradient-gold leading-none">{c.value}</div>
              <div className="mt-1 text-[11px] text-fg-2">{c.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {str(extras, 'note') && (
        <div className="absolute bottom-6 inset-x-0 hidden md:block">
          <p className="container-x text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">{str(extras, 'note')}</p>
        </div>
      )}
    </section>
  );
}

function Intro({ data }: { data?: Section }) {
  if (!data) return null;
  const offers = items(data, 'offers');
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} />
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">{str(data, 'body')}</p>
            {str(data, 'body_secondary') && <p className="mt-5 text-fg-2 leading-relaxed">{str(data, 'body_secondary')}</p>}
          </Reveal>
          <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
            <Link to="/about-us" className="btn btn-blue btn-sm">
              About Dhvani.ai <ArrowUpRight size={15} />
            </Link>
            <Link to="/contact-us" className="link-arrow px-2">
              Talk to an expert <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative">
          <div className="absolute -inset-8 glow-blue opacity-60" aria-hidden />
          <ImagePlaceholder src={str(data, 'image_url')} label={str(data, 'image_label')} ratio="aspect-[4/3]" className="relative" />
        </Reveal>
      </div>
      {offers.length > 0 && (
        <div className="container-x mt-16">
          <Reveal className="flex items-center gap-4 mb-6">
            <span className="font-display text-xl md:text-2xl font-semibold text-white">{str(data, 'offer_title', 'What We Offer')}</span>
            <span className="h-px flex-1 divider-glow" />
          </Reveal>
          <FeatureGrid items={offers} columns={4} numbered />
        </div>
      )}
    </section>
  );
}

function Showcase({ data }: { data?: Section }) {
  const slides = items<ShowcaseItem>(data, 'items');
  if (!slides.length) return null;
  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-dots opacity-30" aria-hidden />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 self-start">
          <Reveal>
            <span className="eyebrow">{str(data, 'eyebrow', 'Services')}</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.02] text-white">{str(data, 'title')}</h2>
            <p className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-tight text-gradient-gold">{str(data, 'title_accent')}</p>
            {str(data, 'body') && <p className="mt-6 text-fg-2 leading-relaxed max-w-md">{str(data, 'body')}</p>}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {slides.map((s, i) => (
                <span key={s.title} className="flex items-center gap-3 text-sm text-fg-3">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate">{s.kicker || s.title}</span>
                </span>
              ))}
            </div>
            <Link to="/services" className="btn btn-primary mt-8">
              All Services <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-6">
          {slides.map((s, i) => (
            <Reveal key={s.title}>
              <article className={`card card-hover ${i % 2 ? 'card-blue' : 'card-gold'} overflow-hidden`}>
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 md:p-8 flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-4xl font-bold stroke-num leading-none">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-royal-light leading-snug">{s.kicker}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl md:text-[1.7rem] font-semibold text-white leading-tight">{s.title}</h3>
                    {s.subtitle && <p className="mt-3 text-sm text-fg-2 leading-relaxed">{s.subtitle}</p>}
                    {!!s.points?.length && (
                      <ul className="mt-5 space-y-2.5">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-sm text-white/85">
                            <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.link && (
                      <Link to={s.link} className="link-arrow mt-auto pt-6">
                        Explore service <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                  <div className="p-3 md:p-4 md:pl-0">
                    <ImagePlaceholder src={s.image_url} label={s.image_label} ratio="aspect-[4/3] md:aspect-auto md:h-full" className="min-h-[14rem]" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Languages({ data }: { data?: Section }) {
  const langs = list(data, 'items');
  if (!langs.length) return null;
  const half = Math.ceil(langs.length / 2);
  return (
    <section className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} accent="100+" body={str(data, 'body')} align="center" />
      </div>
      <div className="mt-12 space-y-3">
        <Marquee items={langs.slice(0, half)} variant="chips" speed={50} />
        <Marquee items={langs.slice(half)} variant="chips" reverse speed={55} />
      </div>
    </section>
  );
}

function Agentic({ data }: { data?: Section }) {
  if (!data) return null;
  const its = items(data);
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-royal-light/25 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(55,24,200,0.35),transparent_55%),#05040c] p-6 md:p-12">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div>
              <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} accent="Intelligent Action" body={str(data, 'body')} />
              {str(data, 'cta') && (
                <Reveal delay={0.1}>
                  <Link to={str(data, 'link', '/services')} className="btn btn-primary mt-8">
                    {str(data, 'cta')} <ArrowUpRight size={16} />
                  </Link>
                </Reveal>
              )}
            </div>
            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {its.map((it, i) => (
                <RevealItem key={it.title} className={i === its.length - 1 && its.length % 2 ? 'sm:col-span-2' : ''}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-gold/40 transition-colors">
                    <span className="icon-tile !h-11 !w-11 group-hover:bg-gold group-hover:text-black transition-colors">
                      <Icon name={it.icon} size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{it.title}</h3>
                      <p className="mt-1 text-sm text-fg-2 leading-relaxed">{it.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanLayer({ data }: { data?: Section }) {
  if (!data) return null;
  const pillars = items(data, 'pillars');
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="absolute -inset-8 glow-gold opacity-50" aria-hidden />
          <ImagePlaceholder src={str(data, 'image_url')} label={str(data, 'image_label')} ratio="aspect-square" className="relative" />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} accent="Better AI" body={str(data, 'body')} />
          <RevealGroup className="mt-8 space-y-3">
            {pillars.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="flex gap-4 rounded-2xl border border-line p-4 hover:border-gold/30 hover:bg-white/[0.02] transition-colors">
                  <span className={`icon-tile ${i % 2 ? 'icon-tile-blue' : ''} !h-11 !w-11`}>
                    <Icon name={p.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-fg-2 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function Quality({ data }: { data?: Section }) {
  if (!data) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} accent="Secure by design." body={str(data, 'body')} />
        <FeatureGrid items={items(data)} columns={4} className="mt-12" tone="gold" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Reveal className="card p-6 md:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-royal-light">Standards & Practices</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {list(data, 'standards').map((s) => (
                <span key={s} className="chip chip-gold">
                  <Check size={13} /> {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06} className="card card-blue p-6 md:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{str(data, 'formats_title', 'Delivery Formats')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {list(data, 'formats').map((f) => (
                <span key={f} className="chip chip-blue font-mono">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CollaborateTeaser({ data }: { data?: Section }) {
  if (!data) return null;
  const card = (title: string, body: string, Ico: typeof UserRound, blue: boolean, hash: string) => (
    <RevealItem className="h-full">
      <Link
        to={`/collaborate-with-us#${hash}`}
        className={`card card-hover ${blue ? 'card-blue' : 'card-gold'} group flex h-full flex-col p-7 md:p-9`}
      >
        <span className={`icon-tile ${blue ? 'icon-tile-blue' : ''} !h-14 !w-14`}>
          <Ico size={26} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-fg-2 leading-relaxed flex-1">{body}</p>
        <span className="link-arrow mt-6">
          Register now <ArrowRight size={15} />
        </span>
      </Link>
    </RevealItem>
  );
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
        <div>
          <SectionHeading eyebrow={str(data, 'eyebrow')} title={str(data, 'title')} accent="great people." body={str(data, 'body')} />
          <Reveal delay={0.1}>
            <Link to="/collaborate-with-us" className="btn btn-ghost mt-8">
              {str(data, 'cta', 'Join Our Network')} <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {card(str(data, 'freelancer_title', 'I Am a Freelancer'), str(data, 'freelancer_body'), UserRound, false, 'freelancer')}
          {card(str(data, 'vendor_title', 'I Am a Vendor'), str(data, 'vendor_body'), Building2, true, 'vendor')}
        </RevealGroup>
      </div>
    </section>
  );
}

export function HomePage() {
  const { page, s, loading } = usePage('home');
  const { services, stats, testimonials, faqsFor } = useSite();
  const steps = useProcess('home');

  if (loading || !page) return <PageLoader />;

  const svcIntro = s.services_intro;
  const procIntro = s.process_intro;
  const statsIntro = s.stats_intro;
  const indIntro = s.industries;
  const testiIntro = s.testimonials_intro;

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <Hero page={page} extras={s.hero_extras} />

      <div className="border-y border-line bg-ink-2 py-6 md:py-8">
        <Marquee items={list(s.capability_marquee, 'items')} />
      </div>

      <Intro data={s.intro} />
      <Showcase data={s.showcase} />
      <Languages data={s.languages} />

      {services.length > 0 && (
        <section className="section">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={str(svcIntro, 'eyebrow')} title={str(svcIntro, 'title')} body={str(svcIntro, 'body')} />
              <Reveal>
                <Link to="/services" className="btn btn-ghost shrink-0">
                  View all services <ArrowUpRight size={16} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12">
              <ServiceGrid services={services} />
            </div>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow={str(procIntro, 'eyebrow')}
              title={str(procIntro, 'title')}
              accent="AI-Ready Intelligence"
              body={str(procIntro, 'body')}
              align="center"
            />
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      <Agentic data={s.agentic} />
      <HumanLayer data={s.human_layer} />

      {stats.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(statsIntro, 'eyebrow')} title={str(statsIntro, 'title')} body={str(statsIntro, 'body')} />
            <div className="mt-12">
              <StatsGrid stats={stats} />
            </div>
          </div>
        </section>
      )}

      {indIntro && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow={str(indIntro, 'eyebrow')}
              title={str(indIntro, 'title')}
              accent="real world"
              body={str(indIntro, 'body')}
              align="center"
            />
            <FeatureGrid items={items<TitledItem>(indIntro)} columns={4} className="mt-12" />
          </div>
        </section>
      )}

      <Quality data={s.quality} />

      {testimonials.length > 0 && (
        <section className="section overflow-hidden">
          <div className="container-x">
            <SectionHeading
              eyebrow={str(testiIntro, 'eyebrow')}
              title={str(testiIntro, 'title')}
              body={str(testiIntro, 'body')}
              align="center"
            />
          </div>
          <div className="mt-12">
            <TestimonialsMarquee items={testimonials} />
          </div>
        </section>
      )}

      <CollaborateTeaser data={s.collaborate_teaser} />
      <FaqSection faqs={faqsFor('General')} intro={s.faq_intro} />
      <CtaBand data={s.closing_cta} />
    </>
  );
}