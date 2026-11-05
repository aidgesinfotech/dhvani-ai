import { Link } from 'react-router-dom';
import { ArrowUp, Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { telHref, waHref } from '../lib/content';
import { Logo } from './ui/Logo';
import { NewsletterForm } from './forms/NewsletterForm';

const company = [
  { to: '/', key: 'nav_home', label: 'Home' },
  { to: '/about-us', key: 'nav_about', label: 'About Us' },
  { to: '/services', key: 'nav_services', label: 'Services' },
  { to: '/blog', key: 'nav_blog', label: 'Blog' },
  { to: '/collaborate-with-us', key: 'nav_collaborate', label: 'Collaborate With Us' },
  { to: '/contact-us', key: 'nav_contact', label: 'Contact Us' },
  { to: '/collaborate-with-us', key: 'nav_careers', label: 'Careers' },
];

const LEGAL = [
  { to: '/terms-of-service', label: 'Website Terms of Use' },
  { to: '/privacy-policy', label: 'Privacy and Cookie Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/data-license-agreement', label: 'Data License Agreement' },
  { to: '/supplier-code-of-conduct', label: 'Supplier Code of Conduct' },
  { to: '/ccpa-privacy-statement', label: 'CCPA Privacy Statement' },
  { to: '/candidate-privacy-statement', label: 'Candidate Privacy Statement' },
];

function formatWa(raw: string | undefined, fallbackLabel: string) {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (digits.startsWith('44') && digits.length >= 12) return `+44 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (raw?.trim()) return raw.trim();
  return fallbackLabel;
}

export function Footer() {
  const { settings, services } = useSite();
  const year = new Date().getFullYear();
  const indiaWa = settings.whatsapp || '917046070460';
  const ukWa = settings.whatsapp_uk || '447311304787';
  const email = settings.email || 'support@dhvani.ai.in';
  const socials = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'facebook', icon: Facebook, label: 'Facebook' },
    { key: 'youtube', icon: Youtube, label: 'YouTube' },
    { key: 'x', icon: Twitter, label: 'X' },
  ].filter((s) => settings[s.key]);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2 pb-28 lg:pb-0">
      <div className="absolute inset-x-0 top-0 h-px divider-glow" aria-hidden />
      <div className="absolute -top-40 left-1/4 h-80 w-80 glow-blue opacity-50" aria-hidden />

      <div className="container-x relative pt-16 md:pt-20">
        <div className="flex flex-col gap-5 rounded-[1.75rem] border border-line bg-black/40 px-5 py-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0 md:max-w-md">
            <span className="eyebrow">{settings.newsletter_eyebrow || 'Newsletter'}</span>
            <p className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">{settings.newsletter_title || 'Stay ahead in AI data.'}</p>
            <p className="mt-2 max-w-sm text-sm text-fg-2">{settings.newsletter_body || 'Insights on datasets, LLM evaluation and Agentic AI — no spam.'}</p>
          </div>
          <div className="w-full md:max-w-xl md:flex-1">
            <NewsletterForm compact />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
          <div>
            <Link to="/" aria-label="Home" className="inline-block">
              <Logo className="h-14 md:h-16" />
            </Link>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{settings.tagline || 'AI is Future'}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-2">
              {settings.footer_blurb ||
                'Dhvani.Ai — Building Data for the Future of AI. Let’s build the future of AI together. Let’s innovate, collaborate, and grow together in the AI-powered world.'}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(({ key, icon: Ico, label }) => (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Ico size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Company</p>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={`${l.to}-${l.label}`}>
                  <Link to={l.to} className="text-sm text-fg-2 transition-colors hover:text-white">
                    {settings[l.key] || l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Services</p>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-fg-2 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Get in Touch</p>
            <ul className="mt-5 space-y-4 text-sm text-fg-2">
              <li>
                <a href={waHref(indiaWa)} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-white">
                  <MessageCircle size={16} className="mt-0.5 shrink-0 text-royal-light" />
                  <span>
                    <span className="block text-[11px] text-fg-3">India WhatsApp</span>
                    {formatWa(indiaWa, '+91 70460 70460')}
                  </span>
                </a>
              </li>
              <li>
                <a href={waHref(ukWa)} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-white">
                  <MessageCircle size={16} className="mt-0.5 shrink-0 text-royal-light" />
                  <span>
                    <span className="block text-[11px] text-fg-3">UK WhatsApp</span>
                    {formatWa(ukWa, '+44 73113 04787')}
                  </span>
                </a>
              </li>
              {settings.phone && (
                <li>
                  <a href={telHref(settings.phone)} className="flex gap-3 transition-colors hover:text-white">
                    <Phone size={16} className="mt-0.5 shrink-0 text-royal-light" />
                    {settings.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${email}`} className="flex gap-3 break-all transition-colors hover:text-white">
                  <Mail size={16} className="mt-0.5 shrink-0 text-royal-light" />
                  {email}
                </a>
              </li>
              {settings.address && (
                <li className="flex gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-royal-light" />
                  <span className="leading-relaxed">{settings.address}</span>
                </li>
              )}
              {settings.business_hours && (
                <li className="flex gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-royal-light" />
                  {settings.business_hours}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line py-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-fg-3">
            {LEGAL.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-fg-3">
              © {year} {settings.site_name || 'Dhvani.ai'}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={toTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1.5 text-xs text-fg-3 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>

      <div className="container-x relative select-none overflow-hidden" aria-hidden>
        <div className="footer-wordmark font-display translate-y-[18%] text-center whitespace-nowrap">DHVANI.AI</div>
      </div>
    </footer>
  );
}
