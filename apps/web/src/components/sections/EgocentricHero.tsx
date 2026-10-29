import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { splitAccent } from './PageHero';

export const EGOCENTRIC_FAQS = [
  {
    question: 'What is egocentric video data?',
    answer:
      'It is first-person footage, usually from a head-mounted camera or smart glasses. The clip shows what a person sees while they act — hands, objects and the task — which is the view robots and video models need.',
  },
  {
    question: 'Who is this dataset for?',
    answer:
      'Robotics and embodied AI teams, video-understanding labs, AR and smart-glasses products, action-recognition models, and world-model research that needs real human activity rather than third-person stock video.',
  },
  {
    question: 'Can you design custom task scripts?',
    answer:
      'Yes. We write step-by-step protocols around the actions, objects and rooms your model must learn, then run the same protocol across contributors so the set stays consistent.',
  },
  {
    question: 'What cameras and rigs do you use?',
    answer:
      'Head-mounted cameras, smart glasses and chest mounts. Resolution, frame rate, field of view and ultrawide framing are set to your spec before capture starts.',
  },
  {
    question: 'Can you record ultrawide footage?',
    answer:
      'Yes. Ultrawide, first-person passes are part of the training set. They keep hands, the workspace and the surrounding scene in one frame.',
  },
  {
    question: 'Do you capture with audio and without audio?',
    answer:
      'Both. Silent task videos are used when the model should learn motion and objects. Recordings with audio keep speech, tool sounds and environment noise when you need them.',
  },
  {
    question: 'Which environments can you film in?',
    answer:
      'Kitchens, homes, workshops, warehouses, stores, streets and other everyday places. We match the locations to the tasks in your brief.',
  },
  {
    question: 'What activities do you cover?',
    answer:
      'Cooking, household tasks, assembly, repair, packing, retail journeys, navigation and other hand–object interactions. Custom activities are scoped in the pilot.',
  },
  {
    question: 'How do you handle faces and consent?',
    answer:
      'Every participant gives informed consent before recording. Faces and other personal details are blurred when your spec requires it, and footage is transferred over encrypted channels.',
  },
  {
    question: 'Can you label actions, hands and objects?',
    answer:
      'Yes. Optional labels include step segmentation, action tags, object boxes, hand interaction tags and scene metadata, delivered with the raw video.',
  },
  {
    question: 'What metadata ships with each clip?',
    answer:
      'Task name, step timing, environment, capture settings and anonymised participant attributes you ask for. Manifests go out as JSON or CSV alongside the media.',
  },
  {
    question: 'How do you check quality?',
    answer:
      'Reviewers check resolution, frame rate, stability, task completion and protocol adherence. Clips that miss the action, crop the hands or break the script are rejected.',
  },
  {
    question: 'How large can a collection be?',
    answer:
      'From a pilot batch you can review in days, up to multi-country production. Volume, languages and environments are planned after the pilot sign-off.',
  },
  {
    question: 'Can the same person record many tasks?',
    answer:
      'Yes. Repeat contributors keep the rig and style consistent, which helps when you want variation of tasks rather than variation of cameras.',
  },
  {
    question: 'Which countries and languages can you cover?',
    answer:
      'Capture runs through Dhvani’s contributor network across many countries. On-camera speech, if you need it, can be collected in the languages those contributors speak.',
  },
  {
    question: 'What file formats do you deliver?',
    answer:
      'MP4 or MOV for video, JSON metadata, CSV manifests, and delivery into your own tool when the project uses one.',
  },
  {
    question: 'Can we start with a pilot?',
    answer:
      'Yes. Most programmes start with a short pilot so you can check framing, protocol and labels before we scale the same setup.',
  },
  {
    question: 'How is pricing set?',
    answer:
      'It depends on hours of footage, rig type, locations, audio, annotation depth and turnaround. We quote after a short scoping call.',
  },
];

const HERO_CLIPS = ['/videos/ego-hero.mp4', '/videos/ego-hero-2.mp4', '/videos/ego-hero-3.mp4'];

export function EgocentricHero({
  title,
  subtitle,
  tags,
}: {
  title: string;
  subtitle?: string;
  tags: string[];
}) {
  const { head, tail } = splitAccent(title, 2);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <div className="pointer-events-none absolute inset-0 grid grid-cols-3" aria-hidden>
        {HERO_CLIPS.map((src) => (
          <div key={src} className="relative h-full overflow-hidden">
            <video className="absolute inset-0 h-full w-full scale-150 object-cover opacity-30" autoPlay muted loop playsInline>
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/68" aria-hidden />

      <div className="container-x relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/55">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-gold">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Egocentric</span>
          </nav>
          <span className="eyebrow">For training · First-person video</span>
          <h1 className="mt-4 font-display text-[2.5rem] leading-[0.98] font-semibold text-balance text-white sm:text-5xl lg:text-[4.15rem]">
            {head}
            {tail && <span className="text-gradient-gold">{tail}</span>}
          </h1>
          {subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{subtitle}</p>}
          {!!tags.length && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-gold/40 bg-black/40 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact-us" className="btn btn-primary">
              Discuss your project
              <ArrowUpRight size={17} />
            </Link>
            <a href="#ego-samples" className="btn btn-ghost">
              Watch samples
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] lg:ml-auto lg:max-w-[460px]">
          <img
            src="/images/ego-pov.jpg"
            alt="First-person view of hands preparing food, the kind of footage egocentric datasets capture"
            className="aspect-[3/4] w-full rounded-[1.6rem] object-cover object-top shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
