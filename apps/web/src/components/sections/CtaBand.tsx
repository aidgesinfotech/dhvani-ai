import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { str, telHref, waHref, type Section } from '../../lib/content';
import { Reveal } from '../Reveal';

export function CtaBand({
  data,
  primaryTo = '/contact-us',
  secondaryTo = '/services',
}: {
  data?: Section;
  primaryTo?: string;
  secondaryTo?: string;
}) {
  const { settings } = useSite();
  const title = str(data, 'title', 'Ready to scale your AI data pipeline?');
  const primary = str(data, 'cta_primary', 'Start a Project');
  const secondary = str(data, 'cta_secondary');

  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-ink-2 px-6 py-14 md:px-14 md:py-20">
            <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
            <div className="absolute -top-32 -left-24 h-[24rem] w-[24rem] glow-blue" aria-hidden />
            <div className="absolute -bottom-36 -right-16 h-[26rem] w-[26rem] glow-gold" aria-hidden />
            <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:flex items-end gap-2 h-32 opacity-50" aria-hidden>
              {[30, 60, 90, 100, 70, 45, 80, 55, 25].map((h, i) => (
                <span
                  key={i}
                  className={`wave-bar w-2 rounded-full ${i === 4 ? 'bg-royal-light' : 'bg-gold'}`}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.11}s` }}
                />
              ))}
            </div>

            <div className="relative max-w-3xl">
              <span className="eyebrow">{str(data, 'eyebrow', 'Get in Touch')}</span>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-[3.3rem] leading-[1.06] font-semibold text-white text-balance">
                {title}
              </h2>
              {str(data, 'body') && <p className="mt-5 text-base md:text-lg text-fg-2 max-w-2xl">{str(data, 'body')}</p>}
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to={primaryTo} className="btn btn-primary">
                  {primary}
                  <ArrowUpRight size={17} />
                </Link>
                {secondary && (
                  <Link to={secondaryTo} className="btn btn-blue">
                    {secondary}
                  </Link>
                )}
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-fg-2">
                {settings.phone && (
                  <a href={telHref(settings.phone)} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                    <Phone size={15} className="text-gold" /> {settings.phone}
                  </a>
                )}
                {settings.whatsapp && (
                  <a
                    href={waHref(settings.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-gold transition-colors"
                  >
                    <MessageCircle size={15} className="text-gold" /> WhatsApp
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                    <Mail size={15} className="text-gold" /> {settings.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
