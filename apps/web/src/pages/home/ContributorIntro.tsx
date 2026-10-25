import { Link } from 'react-router-dom';
import { ArrowUpRight, AudioLines, Camera, Check, Clapperboard, FileText, Mic, Scale, ScanText, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';
import { EarnPhone } from './EarnPhone';

const COUNTRIES: [string, string][] = [
  ['India', 'Vadodara'],
  ['UAE', 'Dubai'],
  ['Kenya', 'Nairobi'],
  ['Ghana', 'Accra'],
  ['Brazil', 'São Paulo'],
  ['Colombia', 'Bogotá'],
  ['Germany', 'Berlin'],
  ['France', 'Paris'],
  ['United States', 'Austin'],
  ['Indonesia', 'Jakarta'],
  ['Nigeria', 'Lagos'],
  ['South Africa', 'Johannesburg'],
];

const TASKS: { title: string; subtitle: string; body: string; icon: ReactNode }[] = [
  {
    title: 'Voice & speech',
    subtitle: 'Read it in your language',
    body: 'Speak a short prompt. That recording is used to train speech models, and you are paid when it is approved.',
    icon: <AudioLines size={20} />,
  },
  {
    title: 'Images',
    subtitle: 'Photograph real scenes',
    body: 'Capture streets, products, and everyday objects. Those photos teach vision models what the world looks like.',
    icon: <Camera size={20} />,
  },
  {
    title: 'Video',
    subtitle: 'Record a real task',
    body: 'Film a short clip on your phone. The motion and the action become training data for video models.',
    icon: <Clapperboard size={20} />,
  },
  {
    title: 'Text',
    subtitle: 'Write the way you talk',
    body: 'Chats, questions, and translations in your dialect. The writing is used to train language models.',
    icon: <FileText size={20} />,
  },
  {
    title: 'Preference',
    subtitle: 'Pick the better answer',
    body: 'Choose which AI reply is more useful, and say why. That judgement is used to train and evaluate models.',
    icon: <Scale size={20} />,
  },
  {
    title: 'Documents',
    subtitle: 'Scan receipts and forms',
    body: 'Photograph a bill or a form. The page is used to train OCR, and the payout depends on the task.',
    icon: <ScanText size={20} />,
  },
];

const RAIL_L: { label: string; icon: ReactNode }[] = [
  { label: 'Voice', icon: <AudioLines size={13} /> },
  { label: 'Hindi', icon: <Mic size={13} /> },
  { label: 'Photo', icon: <Camera size={13} /> },
  { label: 'XXX', icon: <Wallet size={13} /> },
  { label: 'Yes', icon: <ShieldCheck size={13} /> },
  { label: 'Video', icon: <Clapperboard size={13} /> },
  { label: 'Paid', icon: <Sparkles size={13} /> },
];
const RAIL_R: { label: string; icon: ReactNode }[] = [
  { label: 'Text', icon: <FileText size={13} /> },
  { label: 'Arabic', icon: <Mic size={13} /> },
  { label: 'OCR', icon: <ScanText size={13} /> },
  { label: 'Earn', icon: <Wallet size={13} /> },
  { label: 'Clip', icon: <Clapperboard size={13} /> },
  { label: 'AI', icon: <Sparkles size={13} /> },
  { label: 'Clear', icon: <Check size={13} strokeWidth={2.6} /> },
];

function VRail({ items, reverse }: { items: { label: string; icon: ReactNode }[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={`vmarquee relative w-10 shrink-0 lg:w-14 ${reverse ? 'vmarquee-reverse' : ''}`} aria-hidden>
      <span className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-white/15" />
      <div className="vmarquee-track gap-3" style={{ animationDuration: reverse ? '28s' : '22s' }}>
        {loop.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="relative flex h-[7.15rem] w-full flex-col items-center justify-between rounded-[1.35rem] border border-white/12 bg-black/55 px-1 py-2.5 text-white/80 backdrop-blur-md"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/80">
              {item.icon}
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-[0.22em] uppercase [writing-mode:vertical-rl] rotate-180">
              {item.label}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

function PhoneStage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] items-start justify-center gap-2 sm:gap-3">
      <VRail items={RAIL_L} />
      <EarnPhone />
      <VRail items={RAIL_R} reverse />
    </div>
  );
}

function CityRow() {
  const loop = [...COUNTRIES, ...COUNTRIES];
  return (
    <div className="marquee w-full">
      <div className="marquee-track items-center py-1" style={{ animationDuration: '58s' }}>
        {loop.map(([country, city], i) => (
          <span
            key={`${country}-${i}`}
            aria-hidden={i >= COUNTRIES.length}
            className="mx-1.5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pr-4 pl-2.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/35 bg-gold/10 font-mono text-[10px] text-gold">
              {String((i % COUNTRIES.length) + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-medium text-white">{city}</span>
            <span className="text-xs text-white/40">{country}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TaskRow() {
  const loop = [...TASKS, ...TASKS];
  return (
    <div className="marquee marquee-cards marquee-reverse w-full">
      <div className="marquee-track items-stretch py-1" style={{ animationDuration: '70s' }}>
        {loop.map((task, i) => (
          <article
            key={`${task.title}-${i}`}
            aria-hidden={i >= TASKS.length}
            className="mx-2 flex w-[19.5rem] shrink-0 flex-col rounded-3xl border border-white/10 bg-[#0c0c10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:w-[22rem] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className={`icon-tile !h-12 !w-12 ${i % 2 ? 'icon-tile-blue' : ''}`}>{task.icon}</span>
              <span className="font-mono text-[11px] text-gold">{String((i % TASKS.length) + 1).padStart(2, '0')}</span>
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

export function ContributorIntro() {
  return (
    <div className="relative overflow-x-clip">
      <section id="contribute" className="relative z-10 flex flex-col items-center overflow-hidden pt-20 pb-24 lg:min-h-[100svh] lg:justify-center lg:pt-28 lg:pb-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src="/images/hero-contributor.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-black/[0.86]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/25" />
          <div className="bg-grid absolute inset-0 opacity-20" />
        </div>
        <div className="container-x relative z-10 grid min-w-0 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4">
          <div className="min-w-0 text-center lg:text-left">
            <span className="eyebrow">For contributors</span>
            <h1 className="mt-3 font-display text-[2.15rem] leading-[0.98] font-bold text-balance text-white sm:text-[2.7rem] lg:mt-5 lg:text-[3.35rem] xl:text-[3.85rem]">
              <span className="block">Your data trains AI.</span>
              <span className="text-gradient-mix">You get paid for it.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-fg-2 sm:text-base lg:mx-0 lg:mt-4 md:text-lg">
              Come to Dhvani, register, and take short tasks on your phone. Speech, photos, video, and answers are used to train AI — and you earn for every task we approve. The amount depends on the task.
            </p>
            <div className="mt-4 flex flex-row flex-wrap justify-center gap-2 lg:mt-7 lg:justify-start">
              <Link to="/collaborate-with-us#freelancer" className="btn btn-primary">
                Register and earn
                <ArrowUpRight size={17} />
              </Link>
              <a
                href="#domains"
                className="btn btn-ghost"
                onClick={(event) => {
                  const el = document.getElementById('domains');
                  if (!el) return;
                  event.preventDefault();
                  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
                  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                See the tasks
              </a>
            </div>
            <ol className="mx-auto mt-4 grid max-w-lg grid-cols-3 gap-2 lg:mx-0 lg:mt-7">
              {[
                ['01', 'Register'],
                ['02', 'Submit'],
                ['03', 'Get paid'],
              ].map(([n, label]) => (
                <li key={n} className="min-w-0 rounded-2xl border border-white/10 bg-black/50 px-3 py-2.5 text-center backdrop-blur-sm lg:text-left">
                  <span className="font-mono text-[10px] text-gold">{n}</span>
                  <p className="mt-0.5 text-sm font-medium text-white">{label}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden lg:block">
            <PhoneStage />
          </div>
        </div>
        <div className="relative z-10 mt-7 w-full px-1 sm:px-4 lg:hidden" aria-label="Task preview">
          <PhoneStage />
        </div>
      </section>

      <section id="domains" className="relative z-10 scroll-mt-24 overflow-hidden py-8 sm:py-12">
        <div className="container-x mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Cities, tasks & languages</span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
              From your city, in your language
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-2">
            Join from where you live. Pick a task, answer in the language you speak, and get paid when that data is used to train AI.
          </p>
        </div>
        <div id="countries" className="space-y-4">
          <CityRow />
          <TaskRow />
        </div>
      </section>
    </div>
  );
}
