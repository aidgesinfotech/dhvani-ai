import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AudioLines, BarChart3, Bot, Building2, ChevronLeft, ChevronRight, Clapperboard, FileText, Image as ImageIcon, Megaphone, MessagesSquare, Mic, ScanText, ShieldCheck, Tags, Users, Waypoints } from 'lucide-react';
import type { ReactNode } from 'react';
import { EarnPhone } from './EarnPhone';
import type { Contributor, CountryCard, HomeContent, TaskCard } from './homeModel';

const LANG_TONE = [
  'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  'border-sky-400/40 bg-sky-400/15 text-sky-300',
  'border-violet-400/40 bg-violet-400/15 text-violet-300',
  'border-orange-400/40 bg-orange-400/15 text-orange-300',
  'border-cyan-400/40 bg-cyan-400/15 text-cyan-300',
  'border-pink-400/40 bg-pink-400/15 text-pink-300',
];

/** Neon icon plates — match the shared service icon strip; card shell stays unchanged. */
const ICON: Record<string, { node: ReactNode; className: string }> = {
  mic: { node: <Mic size={22} strokeWidth={1.7} />, className: 'border-fuchsia-400/55 bg-fuchsia-400/15 text-fuchsia-300 shadow-[0_0_22px_rgba(232,121,249,0.7)]' },
  text: { node: <FileText size={22} strokeWidth={1.7} />, className: 'border-sky-400/55 bg-sky-400/15 text-sky-300 shadow-[0_0_22px_rgba(56,189,248,0.7)]' },
  image: { node: <ImageIcon size={22} strokeWidth={1.7} />, className: 'border-lime-300/55 bg-lime-300/15 text-lime-300 shadow-[0_0_22px_rgba(190,242,100,0.65)]' },
  video: { node: <Clapperboard size={22} strokeWidth={1.7} />, className: 'border-yellow-300/55 bg-yellow-300/15 text-yellow-300 shadow-[0_0_22px_rgba(253,224,71,0.7)]' },
  ocr: { node: <ScanText size={22} strokeWidth={1.7} />, className: 'border-pink-400/55 bg-pink-400/15 text-pink-300 shadow-[0_0_22px_rgba(244,114,182,0.7)]' },
  label: { node: <Tags size={22} strokeWidth={1.7} />, className: 'border-violet-400/55 bg-violet-400/15 text-violet-300 shadow-[0_0_22px_rgba(167,139,250,0.7)]' },
  qa: { node: <ShieldCheck size={22} strokeWidth={1.7} />, className: 'border-blue-400/55 bg-blue-400/15 text-blue-300 shadow-[0_0_22px_rgba(96,165,250,0.7)]' },
  multi: { node: <Waypoints size={22} strokeWidth={1.7} />, className: 'border-emerald-400/55 bg-emerald-400/15 text-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.7)]' },
  studio: { node: <AudioLines size={22} strokeWidth={1.7} />, className: 'border-amber-300/55 bg-amber-300/15 text-amber-300 shadow-[0_0_22px_rgba(252,211,77,0.7)]' },
  eval: { node: <BarChart3 size={22} strokeWidth={1.7} />, className: 'border-rose-400/55 bg-rose-400/15 text-rose-300 shadow-[0_0_22px_rgba(251,113,133,0.7)]' },
  agent: { node: <Bot size={22} strokeWidth={1.7} />, className: 'border-purple-400/55 bg-purple-400/15 text-purple-300 shadow-[0_0_22px_rgba(192,132,252,0.7)]' },
  chat: { node: <MessagesSquare size={22} strokeWidth={1.7} />, className: 'border-cyan-400/55 bg-cyan-400/15 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.7)]' },
  ads: { node: <Megaphone size={22} strokeWidth={1.7} />, className: 'border-orange-400/55 bg-orange-400/15 text-orange-300 shadow-[0_0_22px_rgba(251,146,60,0.7)]' },
};

function ContributorCard({ person, className = '' }: { person: Contributor; className?: string }) {
  return (
    <article className={`flex h-full flex-col rounded-2xl border bg-[#10141c]/95 p-2.5 text-left backdrop-blur-md ${person.glow || 'border-white/15'} ${className}`}>
      <div className="flex items-center gap-2">
        <img src={person.photo} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-white/10" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <h3 className="truncate font-display text-[13px] font-semibold text-white">{person.name}</h3>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-px text-[9px] text-white/70">
              {person.projects} Projects
            </span>
          </div>
          <p className="truncate text-[10px] text-white/55">
            <span aria-hidden>{person.flag}</span> {person.country}
          </p>
        </div>
      </div>
      <p className="mt-2 text-[9px] font-medium tracking-wide text-white/40 uppercase">Languages</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {person.languages.map((language, i) => (
          <span key={language} className={`rounded-full border px-1.5 py-px text-[9px] font-medium ${LANG_TONE[i % LANG_TONE.length]}`}>
            {language}
          </span>
        ))}
      </div>
    </article>
  );
}

const PAGE_SIZE = 4;

function ReviewSlider({ people, label }: { people: Contributor[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const pages = Math.max(1, Math.ceil(people.length / PAGE_SIZE));

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + pages) % pages);
  };

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % pages);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused, pages]);

  if (!people.length) return null;
  const page = index % pages;
  const visible = people.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div
      className="mx-auto mt-6 w-full lg:mx-0"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setPaused(true);
      }}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">{label}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous contributors"
            onClick={() => go(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_0_14px_rgba(255,255,255,0.08)] hover:border-gold hover:text-gold hover:shadow-[0_0_16px_rgba(209,169,8,0.45)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next contributors"
            onClick={() => go(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_0_14px_rgba(255,255,255,0.08)] hover:border-gold hover:text-gold hover:shadow-[0_0_16px_rgba(209,169,8,0.45)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          key={page}
          className="contributor-page grid grid-cols-2 gap-2.5 sm:gap-3"
          style={{ ['--slide-from' as string]: `${dir * 28}px` }}
        >
          {visible.map((person) => (
            <ContributorCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneStage({ tall = false }: { tall?: boolean }) {
  return (
    <div className={tall ? 'flex h-[80dvh] max-h-[calc(100dvh-6.5rem)] w-full items-center justify-center' : 'mx-auto flex w-full max-w-[320px] justify-center'}>
      <EarnPhone tall={tall} />
    </div>
  );
}

function RegionRow({ regions }: { regions: CountryCard[] }) {
  if (!regions.length) return null;
  const loop = [...regions, ...regions];
  return (
    <div className="marquee marquee-cards w-full">
      <div className="marquee-track items-start py-1" style={{ animationDuration: '78s' }}>
        {loop.map((region, i) => {
          const scrolls = region.languages.length > 4;
          const pills = scrolls ? [...region.languages, ...region.languages] : region.languages;
          return (
            <article
              key={`${region.country}-${i}`}
              aria-hidden={i >= regions.length}
              className={`group mx-2 flex shrink-0 flex-col self-start rounded-2xl border bg-[#10141c] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${region.glow || 'border-white/10'} ${scrolls ? 'w-[18.5rem]' : 'w-max'}`}
            >
              <h3 className="font-display text-sm font-semibold whitespace-nowrap text-white">
                <span aria-hidden className="mr-1.5">{region.flag}</span>
                {region.country}
              </h3>
              <div className="mt-2.5 overflow-hidden">
                <div className={`flex w-max gap-1.5 ${scrolls ? 'lang-marquee' : ''}`}>
                  {pills.map((language, n) => (
                    <span
                      key={`${language}-${n}`}
                      aria-hidden={scrolls && n >= region.languages.length}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${LANG_TONE[n % LANG_TONE.length]}`}
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              {region.tasks && <p className="mt-2 truncate text-[11px] text-gold">{region.tasks}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function TaskRow({ tasks }: { tasks: TaskCard[] }) {
  if (!tasks.length) return null;
  const loop = [...tasks, ...tasks];
  return (
    <div className="marquee marquee-cards marquee-reverse w-full">
      <div className="marquee-track items-stretch py-1" style={{ animationDuration: '70s' }}>
        {loop.map((task, i) => (
          <article
            key={`${task.title}-${i}`}
            aria-hidden={i >= tasks.length}
            className="mx-2 flex w-[19.5rem] shrink-0 flex-col rounded-3xl border border-white/10 bg-[#0c0c10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:w-[22rem] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${(ICON[task.icon] || ICON.mic).className}`}>
                {(ICON[task.icon] || ICON.mic).node}
              </span>
              <span className="font-mono text-[11px] text-gold">{String((i % tasks.length) + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">{task.title}</h3>
            <p className="mt-1 text-sm font-medium text-gold">{task.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-2">{task.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const CHIP_CLASS = {
  gold: 'border-gold/45 bg-gold/10 text-gold shadow-[0_0_16px_rgba(209,169,8,0.28)]',
  cyan: 'border-cyan-400/45 bg-cyan-400/10 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.28)]',
};

export function ContributorIntro({ content }: { content: HomeContent }) {
  const { hero } = content;
  return (
    <div className="relative overflow-x-clip">
      <section id="contribute" className="relative z-10 flex flex-col items-center overflow-hidden pt-20 pb-24 lg:min-h-[100svh] lg:justify-center lg:pt-28 lg:pb-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src={hero.image || '/images/hero-contributor.jpg'}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-black/[0.86]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/25" />
          <div className="bg-grid absolute inset-0 opacity-20" />
        </div>
        <div className="container-x relative z-10 grid min-w-0 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4">
          <div className="min-w-0 text-left">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-4 font-display text-[2.45rem] leading-[0.95] font-bold tracking-tight text-balance text-white sm:text-5xl lg:mt-5 lg:text-[3.35rem] xl:text-[4.05rem]">
              <span className="block">{hero.line1}</span>
              <span className="text-gradient-mix">{hero.line2}</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">{hero.body}</p>
            {hero.chips.length > 0 && (
              <div className="mt-4 flex max-w-xl flex-wrap gap-2">
                {hero.chips.map((chip) => (
                  <span key={chip.label} className={`rounded-full border px-3 py-1 text-xs font-medium ${CHIP_CLASS[chip.tone] || CHIP_CLASS.gold}`}>
                    {chip.label}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={hero.primaryTo || '/contact-us'}
                className="inline-flex min-h-[4.25rem] items-center gap-3 rounded-full bg-gold py-2 pr-5 pl-2 text-black shadow-[0_12px_36px_-14px_rgba(209,169,8,0.95)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/10">
                  <Building2 size={20} />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] leading-tight font-bold">{hero.primaryLabel}</span>
                  <span className="mt-0.5 block text-xs font-medium text-black/70">{hero.primaryHint} →</span>
                </span>
              </Link>
              <Link
                to={hero.secondaryTo || '/collaborate-with-us'}
                className="inline-flex min-h-[4.25rem] items-center gap-3 rounded-full border border-gold/80 bg-black/50 py-2 pr-5 pl-2 text-white shadow-[0_0_24px_-10px_rgba(209,169,8,0.8)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Users size={20} />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] leading-tight font-bold">{hero.secondaryLabel}</span>
                  <span className="mt-0.5 block text-xs font-medium text-white/60">{hero.secondaryHint} →</span>
                </span>
              </Link>
            </div>
            <ReviewSlider people={content.contributors} label={content.contributorsLabel} />
          </div>
          <div className="hidden h-full items-center justify-center lg:flex">
            <PhoneStage tall />
          </div>
        </div>
        <div className="relative z-10 mt-7 w-full px-1 sm:px-4 lg:hidden" aria-label="Task preview">
          <PhoneStage />
        </div>
      </section>

      <section id="domains" className="relative z-10 scroll-mt-24 overflow-hidden py-8 sm:py-12">
        <div className="container-x mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">{content.countriesEyebrow}</span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">{content.countriesTitle}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-2">{content.countriesBody}</p>
        </div>
        <div id="countries" className="space-y-5">
          <RegionRow regions={content.countries} />
          <TaskRow tasks={content.tasks} />
        </div>
      </section>
    </div>
  );
}
