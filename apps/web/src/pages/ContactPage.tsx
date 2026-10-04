import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { useSite } from '../context/SiteContext';
import { usePage } from '../lib/usePage';
import { heroImage, items, str, telHref, waHref } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { PageHero } from '../components/sections/PageHero';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { FaqSection } from '../components/sections/FaqSection';
import { ContactForm } from '../components/forms/ContactForm';

function InfoCard({ icon, label, children, href, blue }: { icon: ReactNode; label: string; children: ReactNode; href?: string; blue?: boolean }) {
  const inner = (
    <div className={`card card-hover ${blue ? 'card-blue' : ''} flex h-full gap-4 p-5`}>
      <span className={`icon-tile ${blue ? 'icon-tile-blue' : ''} !h-11 !w-11`}>{icon}</span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">{label}</p>
        <div className="mt-1 text-sm md:text-[0.95rem] text-white break-words">{children}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    inner
  );
}

export function ContactPage() {
  const { page, s, loading } = usePage('contact-us');
  const { settings, faqsFor } = useSite();
  if (loading || !page) return <PageLoader />;
  const { form, next_steps, office } = s;
  const mapQuery = encodeURIComponent(settings.address || 'Vadodara, Gujarat, India');

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <PageHero eyebrow={page.hero_eyebrow} title={page.hero_title || page.title} subtitle={page.hero_subtitle} crumbs={[{ label: page.title }]} accentWords={3} image={heroImage(s.hero_media)} />

      <section className="section !pt-2">
        <div className="container-x">
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {settings.phone && (
              <RevealItem className="h-full">
                <InfoCard icon={<Phone size={20} />} label="Call us" href={telHref(settings.phone)}>
                  {settings.phone}
                </InfoCard>
              </RevealItem>
            )}
            {settings.whatsapp && (
              <RevealItem className="h-full">
                <InfoCard icon={<MessageCircle size={20} />} label="WhatsApp" href={waHref(settings.whatsapp)} blue>
                  Chat with our team
                </InfoCard>
              </RevealItem>
            )}
            {settings.email && (
              <RevealItem className="h-full">
                <InfoCard icon={<Mail size={20} />} label="Email" href={`mailto:${settings.email}`}>
                  {settings.email}
                </InfoCard>
              </RevealItem>
            )}
            {settings.business_hours && (
              <RevealItem className="h-full">
                <InfoCard icon={<Clock size={20} />} label="Business hours" blue>
                  {settings.business_hours}
                </InfoCard>
              </RevealItem>
            )}
          </RevealGroup>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start">
            <Reveal className="card p-6 sm:p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">{str(form, 'title', 'Tell us about your project')}</h2>
              {str(form, 'body') && <p className="mt-2 text-fg-2">{str(form, 'body')}</p>}
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
            <div className="space-y-4 lg:sticky lg:top-32">
              <Reveal delay={0.06} className="card card-gold p-6 md:p-7">
                <span className="eyebrow">{str(office, 'eyebrow', 'Head Office')}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{str(office, 'title')}</h3>
                {str(office, 'body') && <p className="mt-2 text-sm text-fg-2 leading-relaxed">{str(office, 'body')}</p>}
                {settings.address && (
                  <p className="mt-5 flex gap-3 text-sm text-white/90 leading-relaxed">
                    <MapPin size={18} className="mt-0.5 text-gold shrink-0" />
                    {settings.address}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm mt-6"
                >
                  Get directions
                </a>
              </Reveal>
              <Reveal delay={0.1} className="overflow-hidden rounded-[1.25rem] border border-line">
                <iframe
                  title="Dhvani.ai office location"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-72 w-full grayscale invert-[0.9] hue-rotate-180 contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {next_steps && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(next_steps, 'eyebrow')} title={str(next_steps, 'title')} align="center" />
            <FeatureGrid items={items(next_steps)} columns={3} numbered className="mt-12" />
          </div>
        </section>
      )}

      <FaqSection faqs={faqsFor('Contact')} intro={s.faq_intro} />
    </>
  );
}
