import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Building2, UserRound } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { usePage, useProcess } from '../lib/usePage';
import { heroImage, items, list, str } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { Bullet, PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { PageHero } from '../components/sections/PageHero';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';
import { CollaborateForm, type PartnerType } from '../components/forms/CollaborateForm';

export function CollaboratePage() {
  const { page, s, loading } = usePage('collaborate-with-us');
  const { faqsFor } = useSite();
  const steps = useProcess('collaborate');
  const { hash } = useLocation();
  const [type, setType] = useState<PartnerType>('freelancer');
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hash || loading) return;
    if (hash === '#vendor') setType('vendor');
    if (hash === '#freelancer') setType('freelancer');
    if (['#vendor', '#freelancer', '#register'].includes(hash)) {
      const t = window.setTimeout(() => {
        const el = formRef.current;
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
        else el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => window.clearTimeout(t);
    }
  }, [hash, loading]);

  if (loading || !page) return <PageLoader />;
  const { intro, benefits, opportunities, roles, process_intro, form_intro } = s;

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <PageHero
        eyebrow={page.hero_eyebrow}
        title={page.hero_title || page.title}
        subtitle={page.hero_subtitle}
        primary={{ label: page.hero_cta_primary, to: '#freelancer' }}
        secondary={{ label: page.hero_cta_secondary, to: '#vendor' }}
        crumbs={[{ label: page.title }]}
        accentWords={3}
        image={heroImage(s.hero_media)}
      />

      {intro && (
        <section className="section !pt-4">
          <div className="container-x">
            <SectionHeading eyebrow={str(intro, 'eyebrow')} title={str(intro, 'title')} body={str(intro, 'body')} />
          </div>
        </section>
      )}

      {roles && (
        <section className="section !pt-0">
          <div className="container-x grid gap-5 lg:grid-cols-2">
            {[
              { k: 'freelancer', Ico: UserRound, blue: false },
              { k: 'vendor', Ico: Building2, blue: true },
            ].map(({ k, Ico, blue }) => (
              <Reveal key={k} delay={blue ? 0.06 : 0}>
                <div className={`card ${blue ? 'card-blue' : 'card-gold'} h-full p-7 md:p-9`}>
                  <span className={`icon-tile ${blue ? 'icon-tile-blue' : ''} !h-14 !w-14`}>
                    <Ico size={26} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl md:text-3xl font-semibold text-white">{str(roles, `${k}_title`)}</h2>
                  <p className="mt-2 text-fg-2">{str(roles, `${k}_body`)}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {list(roles, `${k}_roles`).map((r) => (
                      <Bullet key={r} tone={blue ? 'blue' : 'gold'}>
                        <span className="text-sm">{r}</span>
                      </Bullet>
                    ))}
                  </ul>
                  <a href={`#${k}`} className="btn btn-primary btn-sm mt-8">
                    Register as {k === 'vendor' ? 'Vendor' : 'Freelancer'}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {benefits && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(benefits, 'eyebrow')} title={str(benefits, 'title')} align="center" />
            <FeatureGrid items={items(benefits)} columns={3} className="mt-12" />
          </div>
        </section>
      )}

      {opportunities && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(opportunities, 'eyebrow')} title={str(opportunities, 'title')} />
            <FeatureGrid items={items(opportunities)} columns={3} tone="blue" numbered className="mt-12" />
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(process_intro, 'eyebrow')} title={str(process_intro, 'title')} body={str(process_intro, 'body')} align="center" />
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      <section ref={formRef} id="register" className="section scroll-mt-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="Register" title={str(form_intro, 'title', 'Vendor Registration Form – Dhvani.ai')} body={str(form_intro, 'body')} />
            <Reveal delay={0.08} className="mt-8 space-y-3 text-sm text-fg-2">
              <p className="flex gap-3">
                <span className="font-mono text-gold">01</span> Choose freelancer or vendor.
              </p>
              <p className="flex gap-3">
                <span className="font-mono text-gold">02</span> Share your languages, expertise and experience.
              </p>
              <p className="flex gap-3">
                <span className="font-mono text-gold">03</span> Upload your resume or company profile (max 2.5 MB).
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05} className="card p-5 sm:p-7 md:p-9">
            <CollaborateForm type={type} onTypeChange={setType} />
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqsFor('Collaborate')} intro={s.faq_intro} />
      <CtaBand data={s.closing_cta} primaryTo="#register" secondaryTo="/contact-us" />
    </>
  );
}
