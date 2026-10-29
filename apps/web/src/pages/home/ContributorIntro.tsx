import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, AudioLines, BarChart3, Bot, ChevronLeft, ChevronRight, Clapperboard, Diamond, FileText, Image as ImageIcon, Megaphone, MessagesSquare, Mic, ScanText, ShieldCheck, Waypoints } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EarnPhone } from './EarnPhone';

const LANG_TONE = [
  'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  'border-sky-400/40 bg-sky-400/15 text-sky-300',
  'border-violet-400/40 bg-violet-400/15 text-violet-300',
  'border-orange-400/40 bg-orange-400/15 text-orange-300',
  'border-cyan-400/40 bg-cyan-400/15 text-cyan-300',
  'border-pink-400/40 bg-pink-400/15 text-pink-300',
];

const TYPE_TONE: Record<string, string> = {
  Speech: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  Text: 'border-sky-400/40 bg-sky-400/15 text-sky-300',
  OCR: 'border-violet-400/40 bg-violet-400/15 text-violet-300',
  Annotation: 'border-orange-400/40 bg-orange-400/15 text-orange-300',
  Image: 'border-cyan-400/40 bg-cyan-400/15 text-cyan-300',
  Video: 'border-pink-400/40 bg-pink-400/15 text-pink-300',
  Evaluation: 'border-amber-300/40 bg-amber-300/15 text-amber-200',
  Transcription: 'border-indigo-400/40 bg-indigo-400/15 text-indigo-300',
  QA: 'border-rose-400/40 bg-rose-400/15 text-rose-300',
};

const CONTRIBUTORS: {
  name: string;
  country: string;
  flag: string;
  projects: number;
  photo: string;
  languages: string[];
  types: string[];
  tasks: string;
  glow: string;
}[] = [
  { name: 'Ananya R.', country: 'India', flag: '🇮🇳', projects: 5, photo: '/images/contributor-ananya.jpg', languages: ['Hindi', 'Gujarati', 'English', 'Tamil'], types: ['Speech', 'Text', 'OCR'], tasks: 'Speech and documents', glow: 'border-fuchsia-400/55 shadow-[0_0_18px_rgba(232,121,249,0.4)]' },
  { name: 'Maria D.', country: 'Philippines', flag: '🇵🇭', projects: 3, photo: '/images/contributor-maria.jpg', languages: ['Filipino', 'Cebuano', 'English'], types: ['Speech', 'Transcription', 'Text'], tasks: 'Speech and transcripts', glow: 'border-sky-400/55 shadow-[0_0_18px_rgba(56,189,248,0.4)]' },
  { name: 'Lucas M.', country: 'Brazil', flag: '🇧🇷', projects: 4, photo: '/images/contributor-lucas.jpg', languages: ['Portuguese', 'English'], types: ['Speech', 'Image', 'Annotation'], tasks: 'Images and video', glow: 'border-lime-300/55 shadow-[0_0_18px_rgba(190,242,100,0.35)]' },
  { name: 'Sofia R.', country: 'Mexico', flag: '🇲🇽', projects: 3, photo: '/images/contributor-sofia.jpg', languages: ['Spanish', 'English'], types: ['Speech', 'Text', 'QA'], tasks: 'Spanish voice data', glow: 'border-orange-400/55 shadow-[0_0_18px_rgba(251,146,60,0.4)]' },
  { name: 'Kenji T.', country: 'Japan', flag: '🇯🇵', projects: 4, photo: '/images/contributor-kenji.jpg', languages: ['Japanese', 'English'], types: ['Speech', 'Text', 'Evaluation'], tasks: 'Speech and evaluation', glow: 'border-rose-400/55 shadow-[0_0_18px_rgba(251,113,133,0.4)]' },
  { name: 'Aisha K.', country: 'UAE', flag: '🇦🇪', projects: 3, photo: '/images/contributor-aisha.jpg', languages: ['Arabic', 'English'], types: ['Speech', 'Text', 'Annotation'], tasks: 'Arabic speech notes', glow: 'border-amber-300/55 shadow-[0_0_18px_rgba(252,211,77,0.35)]' },
  { name: 'Thabo M.', country: 'South Africa', flag: '🇿🇦', projects: 4, photo: '/images/contributor-thabo.jpg', languages: ['English', 'Afrikaans', 'Zulu', 'Xhosa'], types: ['Speech', 'Image', 'Video'], tasks: 'Speech, image, video', glow: 'border-emerald-400/55 shadow-[0_0_18px_rgba(52,211,153,0.4)]' },
  { name: 'Élise L.', country: 'France', flag: '🇫🇷', projects: 3, photo: '/images/contributor-elise.jpg', languages: ['French', 'English'], types: ['Speech', 'Text', 'Annotation'], tasks: 'French voice notes', glow: 'border-blue-400/55 shadow-[0_0_18px_rgba(96,165,250,0.4)]' },
  { name: 'David S.', country: 'United States', flag: '🇺🇸', projects: 5, photo: '/images/contributor-david.jpg', languages: ['English', 'Spanish'], types: ['Speech', 'Image', 'Evaluation'], tasks: 'Speech and images', glow: 'border-pink-400/55 shadow-[0_0_18px_rgba(244,114,182,0.4)]' },
  { name: 'Emily C.', country: 'Canada', flag: '🇨🇦', projects: 4, photo: '/images/contributor-emily.jpg', languages: ['English', 'French'], types: ['Speech', 'Transcription', 'QA'], tasks: 'Images and QA', glow: 'border-violet-400/55 shadow-[0_0_18px_rgba(167,139,250,0.4)]' },
  { name: 'Rizky A.', country: 'Indonesia', flag: '🇮🇩', projects: 3, photo: '/images/contributor-rizky.jpg', languages: ['Indonesian', 'Javanese'], types: ['Speech', 'Text', 'Image'], tasks: 'Speech and images', glow: 'border-cyan-400/55 shadow-[0_0_18px_rgba(34,211,238,0.4)]' },
  { name: 'Chinelo E.', country: 'Nigeria', flag: '🇳🇬', projects: 4, photo: '/images/contributor-chinelo.jpg', languages: ['English', 'Hausa', 'Yoruba', 'Igbo'], types: ['Speech', 'Transcription', 'Evaluation'], tasks: 'Speech and evaluation', glow: 'border-purple-400/55 shadow-[0_0_18px_rgba(192,132,252,0.4)]' },
];

const REGIONS: { country: string; flag: string; languages: string[]; tasks: string; glow: string }[] = [
  { country: 'India', flag: '🇮🇳', languages: ['Hindi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Kannada', 'Malayalam', 'Odia', 'Punjabi', 'Urdu'], tasks: 'Speech, OCR documents, images, video', glow: 'border-fuchsia-400/45 shadow-[0_0_22px_rgba(232,121,249,0.28)]' },
  { country: 'Philippines', flag: '🇵🇭', languages: ['Filipino', 'Cebuano', 'English'], tasks: 'Speech, transcription, conversations', glow: 'border-sky-400/45 shadow-[0_0_22px_rgba(56,189,248,0.28)]' },
  { country: 'Indonesia', flag: '🇮🇩', languages: ['Indonesian', 'Javanese'], tasks: 'Speech, text, image collection', glow: 'border-lime-300/45 shadow-[0_0_22px_rgba(190,242,100,0.24)]' },
  { country: 'Japan', flag: '🇯🇵', languages: ['Japanese'], tasks: 'Speech, transcription, AI evaluation', glow: 'border-rose-400/45 shadow-[0_0_22px_rgba(251,113,133,0.28)]' },
  { country: 'Brazil', flag: '🇧🇷', languages: ['Brazilian Portuguese'], tasks: 'Speech, images, video', glow: 'border-amber-300/45 shadow-[0_0_22px_rgba(252,211,77,0.26)]' },
  { country: 'Mexico', flag: '🇲🇽', languages: ['Mexican Spanish'], tasks: 'Speech, transcription, text annotation', glow: 'border-orange-400/45 shadow-[0_0_22px_rgba(251,146,60,0.28)]' },
  { country: 'Kenya', flag: '🇰🇪', languages: ['Swahili', 'English'], tasks: 'Speech, transcription, text', glow: 'border-emerald-400/45 shadow-[0_0_22px_rgba(52,211,153,0.28)]' },
  { country: 'Nigeria', flag: '🇳🇬', languages: ['English', 'Hausa', 'Yoruba', 'Igbo'], tasks: 'Speech, text, language QA', glow: 'border-violet-400/45 shadow-[0_0_22px_rgba(167,139,250,0.28)]' },
  { country: 'France', flag: '🇫🇷', languages: ['French'], tasks: 'Speech, transcription, translation QA', glow: 'border-blue-400/45 shadow-[0_0_22px_rgba(96,165,250,0.28)]' },
  { country: 'Germany', flag: '🇩🇪', languages: ['German'], tasks: 'Speech, text annotation, AI evaluation', glow: 'border-yellow-300/45 shadow-[0_0_22px_rgba(253,224,71,0.24)]' },
  { country: 'Egypt', flag: '🇪🇬', languages: ['Arabic', 'Egyptian Arabic'], tasks: 'Speech, transcription, conversational data', glow: 'border-cyan-400/45 shadow-[0_0_22px_rgba(34,211,238,0.28)]' },
  { country: 'United States', flag: '🇺🇸', languages: ['American English', 'Spanish'], tasks: 'Speech, image/video collection, AI evaluation', glow: 'border-pink-400/45 shadow-[0_0_22px_rgba(244,114,182,0.28)]' },
  { country: 'Canada', flag: '🇨🇦', languages: ['Canadian English', 'Canadian French'], tasks: 'Speech, transcription, language QA', glow: 'border-purple-400/45 shadow-[0_0_22px_rgba(192,132,252,0.28)]' },
  { country: 'Australia', flag: '🇦🇺', languages: ['Australian English'], tasks: 'Speech, image/video collection', glow: 'border-teal-300/45 shadow-[0_0_22px_rgba(94,234,212,0.26)]' },
];

const TASKS: { title: string; subtitle: string; body: string; icon: ReactNode; iconClass: string }[] = [
  {
    title: 'Speech & Audio Data',
    subtitle: 'Speak',
    body: 'Collect multilingual speech recordings, voice samples, conversations, and audio prompts for ASR, speech recognition, and text-to-speech (TTS) projects.',
    icon: <Mic size={22} strokeWidth={1.75} />,
    iconClass: 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.45)]',
  },
  {
    title: 'Text Data',
    subtitle: 'Write',
    body: 'Create multilingual text, conversational prompts, question-answer pairs, translations, and dialect-specific content for LLM training and evaluation.',
    icon: <FileText size={22} strokeWidth={1.75} />,
    iconClass: 'border-sky-400/40 bg-sky-400/10 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.45)]',
  },
  {
    title: 'Image Collection',
    subtitle: 'Capture',
    body: 'Photograph real-world objects, products, environments, and everyday scenes for image classification, object detection, and visual AI training.',
    icon: <ImageIcon size={22} strokeWidth={1.75} />,
    iconClass: 'border-lime-300/40 bg-lime-300/10 text-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.4)]',
  },
  {
    title: 'Video & Egocentric Data',
    subtitle: 'Record',
    body: 'Capture video clips, first-person activities, and human-object interactions for video understanding, robotics, and embodied AI projects.',
    icon: <Clapperboard size={22} strokeWidth={1.75} />,
    iconClass: 'border-yellow-300/40 bg-yellow-300/10 text-yellow-300 shadow-[0_0_18px_rgba(253,224,71,0.4)]',
  },
  {
    title: 'Documents & OCR',
    subtitle: 'Scan',
    body: 'Collect printed and handwritten documents for OCR, handwriting recognition, document classification, and information extraction projects.',
    icon: <ScanText size={22} strokeWidth={1.75} />,
    iconClass: 'border-pink-400/40 bg-pink-400/10 text-pink-300 shadow-[0_0_18px_rgba(244,114,182,0.45)]',
  },
  {
    title: 'Annotation & Labeling',
    subtitle: 'Label',
    body: 'Annotate images, videos, audio, and text using bounding boxes, transcription, classification, segmentation, and other project-specific labels.',
    icon: <Diamond size={22} strokeWidth={1.75} />,
    iconClass: 'border-violet-400/40 bg-violet-400/10 text-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.45)]',
  },
  {
    title: 'Quality Assurance',
    subtitle: 'Review',
    body: 'Review annotations, verify transcripts, check image and video submissions, and flag errors against project guidelines and quality benchmarks.',
    icon: <ShieldCheck size={22} strokeWidth={1.75} />,
    iconClass: 'border-blue-400/40 bg-blue-400/10 text-blue-300 shadow-[0_0_18px_rgba(96,165,250,0.45)]',
  },
  {
    title: 'Multimodal Data',
    subtitle: 'Combine',
    body: 'Source and prepare combined text, speech, image, and video datasets for multimodal models and real-world AI applications.',
    icon: <Waypoints size={22} strokeWidth={1.75} />,
    iconClass: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.45)]',
  },
  {
    title: 'Studio Recording',
    subtitle: 'Studio voice',
    body: 'Record scripted speech, TTS training prompts, wake words, and voice datasets for speech synthesis, voice recognition, and conversational AI.',
    icon: <AudioLines size={22} strokeWidth={1.75} />,
    iconClass: 'border-amber-300/40 bg-amber-300/10 text-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.45)]',
  },
  {
    title: 'AI Data Evaluation',
    subtitle: 'Evaluate',
    body: 'Compare AI-generated responses, rate answer quality, assess relevance and accuracy, and provide human feedback for LLM evaluation and model benchmarking.',
    icon: <BarChart3 size={22} strokeWidth={1.75} />,
    iconClass: 'border-rose-400/40 bg-rose-400/10 text-rose-300 shadow-[0_0_18px_rgba(251,113,133,0.45)]',
  },
  {
    title: 'Agentic AI',
    subtitle: 'Take action',
    body: 'Develop and support agentic AI workflows, tool-using agents, and task automation to help businesses streamline complex processes and build intelligent AI solutions.',
    icon: <Bot size={22} strokeWidth={1.75} />,
    iconClass: 'border-purple-400/40 bg-purple-400/10 text-purple-300 shadow-[0_0_18px_rgba(192,132,252,0.45)]',
  },
  {
    title: 'AI Chatbots & Conversational AI',
    subtitle: 'Chat',
    body: 'Build and support AI-powered chatbots and virtual assistants for customer support, multilingual conversations, knowledge retrieval, and automated business interactions.',
    icon: <MessagesSquare size={22} strokeWidth={1.75} />,
    iconClass: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]',
  },
  {
    title: 'AI Video & Product Advertising',
    subtitle: 'Video ads',
    body: 'Create AI-powered product promotional videos, marketing creatives, product demonstrations, and social media advertising content for brands and businesses.',
    icon: <Megaphone size={22} strokeWidth={1.75} />,
    iconClass: 'border-orange-400/40 bg-orange-400/10 text-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.45)]',
  },
];

function ContributorCard({ person, className = '' }: { person: (typeof CONTRIBUTORS)[number]; className?: string }) {
  return (
    <article className={`flex h-full flex-col rounded-2xl border bg-[#10141c]/95 p-2.5 text-left backdrop-blur-md ${person.glow} ${className}`}>
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
      <p className="mt-1.5 text-[9px] font-medium tracking-wide text-white/40 uppercase">Project Type</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {person.types.map((type) => (
          <span key={type} className={`rounded-full border px-1.5 py-px text-[9px] font-medium ${TYPE_TONE[type]}`}>
            {type}
          </span>
        ))}
      </div>
      <p className="mt-1.5 text-[9px] font-medium tracking-wide text-white/40 uppercase">Tasks Performed</p>
      <p className="mt-0.5 truncate text-[11px] text-gold">{person.tasks}</p>
    </article>
  );
}

function ReviewSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + CONTRIBUTORS.length) % CONTRIBUTORS.length);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % CONTRIBUTORS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const current = CONTRIBUTORS[index];
  const next = CONTRIBUTORS[(index + 1) % CONTRIBUTORS.length];

  return (
    <div
      className="mx-auto mt-6 w-full lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">Contributors</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous contributor"
            onClick={() => go(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_0_14px_rgba(255,255,255,0.08)] hover:border-gold hover:text-gold hover:shadow-[0_0_16px_rgba(209,169,8,0.45)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next contributor"
            onClick={() => go(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_0_14px_rgba(255,255,255,0.08)] hover:border-gold hover:text-gold hover:shadow-[0_0_16px_rgba(209,169,8,0.45)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.name}
            initial={{ opacity: 0, x: dir * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -32 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 gap-3 lg:grid-cols-2"
          >
            <ContributorCard person={current} />
            <ContributorCard person={next} className="hidden lg:flex" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhoneStage() {
  return (
    <div className="mx-auto flex w-full max-w-[320px] justify-center">
      <EarnPhone />
    </div>
  );
}

function RegionRow() {
  const loop = [...REGIONS, ...REGIONS];
  return (
    <div className="marquee marquee-cards w-full">
      <div className="marquee-track items-start py-1" style={{ animationDuration: '78s' }}>
        {loop.map((region, i) => {
          const scrolls = region.languages.length > 4;
          const pills = scrolls ? [...region.languages, ...region.languages] : region.languages;
          return (
            <article
              key={`${region.country}-${i}`}
              aria-hidden={i >= REGIONS.length}
              className={`group mx-2 flex shrink-0 flex-col self-start rounded-2xl border border-white/10 bg-[#10141c] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${scrolls ? 'w-[18.5rem]' : 'w-max'}`}
            >
              <h3 className="font-display text-sm font-semibold whitespace-nowrap text-white">
                <span aria-hidden className="mr-1.5">{region.flag}</span>
                {region.country}
              </h3>
              <div className="mt-2.5 overflow-hidden">
                <div
                  className="flex w-max gap-1.5 group-hover:[animation-play-state:paused]"
                  style={scrolls ? { animation: 'marquee 16s linear infinite' } : undefined}
                >
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
            </article>
          );
        })}
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
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${task.iconClass}`}>{task.icon}</span>
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
            <span className="eyebrow">Earn money · Order data</span>
            <h1 className="mt-3 font-display text-[2.15rem] leading-[0.98] font-bold text-balance text-white sm:text-[2.7rem] lg:mt-5 lg:text-[3.15rem] xl:text-[3.55rem]">
              <span className="block">Do the task. Get paid.</span>
              <span className="text-gradient-mix">Or take the dataset.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-fg-2 sm:text-base lg:mx-0 lg:mt-4 md:text-lg">
              Record speech, snap a photo, film a clip, or write an answer — Dhvani pays you when that task is approved. Training a model? The same work arrives as a labeled dataset: voice, image, video, and text, in the language you need.
            </p>
            <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              <span className="rounded-full border border-gold/45 bg-gold/10 px-3 py-1 text-xs font-medium text-gold shadow-[0_0_16px_rgba(209,169,8,0.28)]">Contributors · paid per task</span>
              <span className="rounded-full border border-cyan-400/45 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.28)]">Clients · datasets on demand</span>
            </div>
            <div className="mt-4 flex flex-row flex-wrap justify-center gap-2 lg:mt-6 lg:justify-start">
              <Link to="/collaborate-with-us#freelancer" className="btn btn-primary">
                Register and earn
                <ArrowUpRight size={17} />
              </Link>
              <Link to="/contact-us" className="btn btn-ghost">
                Get datasets
              </Link>
            </div>
            <ReviewSlider />
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
            <span className="eyebrow">Countries & languages</span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
              From your country, in your language
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-2">
            Languages we collect in each country — the same ones contributors speak on their tasks.
          </p>
        </div>
        <div id="countries" className="space-y-5">
          <RegionRow />
          <TaskRow />
        </div>
      </section>
    </div>
  );
}
