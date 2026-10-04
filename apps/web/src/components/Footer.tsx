import { Link } from 'react-router-dom';
import { ArrowUp, Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { telHref, waHref } from '../lib/content';
import { Logo } from './ui/Logo';
import { NewsletterForm } from './forms/NewsletterForm';

const company = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/collaborate-with-us', label: 'Collaborate With Us' },
  { to: '/contact-us', label: 'Contact Us' },
];

export function Footer() {
  const { settings, services } = useSite();
  const year = new Date().getFullYear();
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
        <div className="grid gap-6 rounded-[1.5rem] border border-line bg-black/40 p-6 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">Newsletter</span>
            <p className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white">Stay ahead in AI data.</p>
            <p className="mt-2 text-sm text-fg-2">Insights on datasets, LLM evaluation and Agentic AI — no spam.</p>
          </div>
          <NewsletterForm compact />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
          <div>
            <Link to="/" aria-label="Home" className="inline-block">
              <Logo className="h-14 md:h-16" />
            </Link>
            <p className="mt-5 text-sm text-fg-2 leading-relaxed max-w-sm">{settings.footer_blurb}</p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socials.map(({ key, icon: Ico, label }) => (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg-2 hover:border-gold hover:text-gold transition-colors"
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
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-fg-2 hover:text-white transition-colors">
                    {l.label}
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
                  <Link to={`/services/${s.slug}`} className="text-sm text-fg-2 hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Get in Touch</p>
            <ul className="mt-5 space-y-4 text-sm text-fg-2">
              {settings.phone && (
                <li>
                  <a href={telHref(settings.phone)} className="flex gap-3 hover:text-white transition-colors">
                    <Phone size={16} className="mt-0.5 text-royal-light shrink-0" />
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a href={waHref(settings.whatsapp)} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white transition-colors">
                    <MessageCircle size={16} className="mt-0.5 text-royal-light shrink-0" />
                    WhatsApp us
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex gap-3 hover:text-white transition-colors break-all">
                    <Mail size={16} className="mt-0.5 text-royal-light shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex gap-3">
                  <MapPin size={16} className="mt-0.5 text-royal-light shrink-0" />
                  <span className="leading-relaxed">{settings.address}</span>
                </li>
              )}
              {settings.business_hours && (
                <li className="flex gap-3">
                  <Clock size={16} className="mt-0.5 text-royal-light shrink-0" />
                  {settings.business_hours}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-fg-3">
            © {year} {settings.site_name || 'Dhvani.ai'}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-fg-3">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={toTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
            >
              <ArrowUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>

      <div className="container-x relative select-none overflow-hidden" aria-hidden>
        <div className="footer-wordmark font-display text-center whitespace-nowrap translate-y-[18%]">DHVANI.AI</div>
      </div>
    </footer>
  );
}
