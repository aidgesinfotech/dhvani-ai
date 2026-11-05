import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Mail, MessageCircle, Plus } from 'lucide-react';
import type { QA } from '../../lib/api';
import { useSite } from '../../context/SiteContext';
import { str, waHref, type Section } from '../../lib/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../Reveal';

function formatWa(raw: string, fallback: string) {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (digits.startsWith('44') && digits.length >= 12) return `+44 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return raw.trim() || fallback;
}

export function FaqAccordion({ faqs, columns = 1 }: { faqs: QA[]; columns?: 1 | 2 }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={columns === 2 ? 'grid items-start gap-3 md:grid-cols-2' : 'space-y-3'}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${f.question}-${i}`}
            className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${
              isOpen
                ? 'border-gold/45 bg-gradient-to-br from-gold/[0.1] via-black/50 to-black/40 shadow-[0_0_0_1px_rgba(209,169,8,0.12),0_18px_40px_-24px_rgba(209,169,8,0.55)]'
                : 'border-white/10 bg-black/35 hover:border-white/20 hover:bg-white/[0.03]'
            }`}
          >
            <button
              type="button"
              className="flex w-full items-start gap-3.5 p-5 text-left md:gap-4 md:p-6"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span
                className={`mt-0.5 font-mono text-[11px] tabular-nums tracking-[0.14em] ${
                  isOpen ? 'text-gold' : 'text-white/35'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 font-display text-base font-medium leading-snug text-white md:text-[1.05rem]">
                {f.question}
              </span>
              <span
                className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? 'rotate-45 border-gold bg-gold text-black shadow-[0_0_18px_rgba(209,169,8,0.45)]'
                    : 'border-royal-light/35 text-royal-light group-hover:border-gold/50'
                }`}
              >
                <Plus size={16} strokeWidth={2.25} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-t border-white/8 px-5 pb-6 pt-1 md:px-6">
                    <p className="pl-9 text-[15px] leading-relaxed text-fg-2 whitespace-pre-line md:pl-10">{f.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({
  faqs,
  intro,
  columns,
}: {
  faqs: QA[];
  intro?: Section;
  columns?: 1 | 2;
}) {
  const { settings } = useSite();
  if (!faqs.length) return null;

  const indiaWa = settings.whatsapp || '917046070460';
  const ukWa = settings.whatsapp_uk || '447311304787';
  const email = settings.email || 'support@dhvani.ai.in';
  const layout = columns ?? (faqs.length > 6 ? 2 : 1);

  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-royal/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="container-x relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="self-start lg:sticky lg:top-32">
          <SectionHeading
            eyebrow={str(intro, 'eyebrow', 'Service FAQ')}
            title={str(intro, 'title', 'Frequently asked questions')}
            body={str(intro, 'body')}
          />
          <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-[1.5rem] border border-royal-light/25 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(55,24,200,0.28),transparent_55%),#07060e] p-6 md:p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-royal-light uppercase">Need a quick answer?</p>
            <p className="mt-3 font-display text-xl font-semibold text-white">Still have questions?</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-2">
              Talk to our team directly — WhatsApp India / UK, or email. We usually reply within a few hours.
            </p>
            <div className="mt-5 space-y-2.5">
              <a
                href={waHref(indiaWa)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-3.5 py-3 text-sm text-white/90 transition-colors hover:border-gold/40 hover:text-white"
              >
                <MessageCircle size={16} className="shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="block text-[10px] tracking-wide text-white/45 uppercase">India WhatsApp</span>
                  {formatWa(indiaWa, '+91 70460 70460')}
                </span>
              </a>
              <a
                href={waHref(ukWa)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-3.5 py-3 text-sm text-white/90 transition-colors hover:border-gold/40 hover:text-white"
              >
                <MessageCircle size={16} className="shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="block text-[10px] tracking-wide text-white/45 uppercase">UK WhatsApp</span>
                  {formatWa(ukWa, '+44 73113 04787')}
                </span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-3.5 py-3 text-sm text-white/90 transition-colors hover:border-gold/40 hover:text-white"
              >
                <Mail size={16} className="shrink-0 text-gold" />
                <span className="break-all">{email}</span>
              </a>
            </div>
            <Link to="/contact-us" className="btn btn-primary btn-sm mt-5 w-full sm:w-auto">
              Contact Us
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <FaqAccordion faqs={faqs} columns={layout} />
        </Reveal>
      </div>
    </section>
  );
}
