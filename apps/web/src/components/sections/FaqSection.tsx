import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Plus } from 'lucide-react';
import type { QA } from '../../lib/api';
import { useSite } from '../../context/SiteContext';
import { str, waHref, type Section } from '../../lib/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../Reveal';

export function FaqAccordion({ faqs, columns = 1 }: { faqs: QA[]; columns?: 1 | 2 }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={columns === 2 ? 'grid items-start gap-3 md:grid-cols-2' : 'space-y-3'}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={`${f.question}-${i}`}
            className={`card overflow-hidden transition-colors ${isOpen ? '!border-gold/40 card-gold' : ''}`}
          >
            <button
              type="button"
              className="w-full flex items-start justify-between gap-4 text-left p-5 md:p-6"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-base md:text-lg font-medium text-white">{f.question}</span>
              <span
                className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen ? 'rotate-45 border-gold bg-gold text-black' : 'border-royal-light/40 text-royal-light'
                }`}
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 md:px-6 pb-6 -mt-1 text-fg-2 leading-relaxed whitespace-pre-line">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({ faqs, intro, columns = 1 }: { faqs: QA[]; intro?: Section; columns?: 1 | 2 }) {
  const { settings } = useSite();
  if (!faqs.length) return null;
  return (
    <section className="section">
      <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-32 self-start">
          <SectionHeading
            eyebrow={str(intro, 'eyebrow', 'FAQ')}
            title={str(intro, 'title', 'Frequently asked questions')}
            body={str(intro, 'body')}
          />
          <Reveal delay={0.1} className="mt-8 card card-blue p-6">
            <p className="font-display text-lg text-white font-semibold">Still have questions?</p>
            <p className="mt-1.5 text-sm text-fg-2">Talk to our team directly — we usually reply within a few hours.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/contact-us" className="btn btn-primary btn-sm">
                Contact Us
              </Link>
              {settings.whatsapp && (
                <a href={waHref(settings.whatsapp)} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <MessageCircle size={15} /> WhatsApp
                </a>
              )}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <FaqAccordion faqs={faqs} columns={columns} />
        </Reveal>
      </div>
    </section>
  );
}
