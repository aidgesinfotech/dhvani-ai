import { useMemo, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { usePage, useProcess } from '../lib/usePage';
import { heroImage, items, list, str } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { PageHero } from '../components/sections/PageHero';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ServiceGrid } from '../components/sections/ServiceCard';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';

export function ServicesPage() {
  const { page, s, loading } = usePage('services');
  const { services, faqsFor } = useSite();
  const steps = useProcess('services');
  const [cat, setCat] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(services.map((x) => x.category || 'Services'))], [services]);
  const filtered = cat === 'All' ? services : services.filter((x) => (x.category || 'Services') === cat);

  if (loading || !page) return <PageLoader />;
  const { intro, catalog, channels, process_intro, formats } = s;

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <PageHero
        eyebrow={page.hero_eyebrow}
        title={page.hero_title || page.title}
        subtitle={page.hero_subtitle}
        primary={{ label: page.hero_cta_primary, to: '/contact-us' }}
        secondary={{ label: page.hero_cta_secondary, to: '/contact-us' }}
        crumbs={[{ label: page.title }]}
        accentWords={3}
        image={heroImage(s.hero_media)}
      />

      {intro && (
        <section className="section !pt-4">
          <div className="container-x">
            <SectionHeading eyebrow={str(intro, 'eyebrow')} title={str(intro, 'title')} body={str(intro, 'body')} />
            <FeatureGrid items={items(intro, 'pillars')} columns={4} numbered className="mt-12" />
          </div>
        </section>
      )}

      <section className="section" id="catalog">
        <div className="container-x">
          <SectionHeading eyebrow={str(catalog, 'eyebrow', 'Service Catalogue')} title={str(catalog, 'title', 'Explore our services')} body={str(catalog, 'body')} />
          {categories.length > 2 && (
            <Reveal className="mt-10 -mx-[4%] px-[4%] overflow-x-auto">
              <div className="flex gap-2 w-max">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                      cat === c ? 'bg-gold text-black shadow-[0_8px_24px_-8px_rgba(209,169,8,0.8)]' : 'border border-line-2 text-fg-2 hover:text-white hover:border-royal-light/50'
                    }`}
                  >
                    {c}
                    <span className="ml-2 font-mono text-[11px] opacity-60">
                      {c === 'All' ? services.length : services.filter((x) => (x.category || 'Services') === c).length}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}
          <div className="mt-8" key={cat}>
            <ServiceGrid services={filtered} />
          </div>
        </div>
      </section>

      {channels && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(channels, 'eyebrow')} title={str(channels, 'title')} body={str(channels, 'body')} align="center" />
            <FeatureGrid items={items(channels)} columns={5} tone="blue" className="mt-12" />
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(process_intro, 'eyebrow')} title={str(process_intro, 'title')} body={str(process_intro, 'body')} />
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      {formats && (
        <section className="section">
          <div className="container-x">
            <Reveal className="card card-gold p-8 md:p-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
              <div>
                <span className="eyebrow">{str(formats, 'eyebrow')}</span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-white">{str(formats, 'title')}</h2>
                <p className="mt-4 text-fg-2 leading-relaxed">{str(formats, 'body')}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {list(formats, 'items').map((f, i) => (
                  <span key={f} className={`chip ${i % 2 ? 'chip-blue' : 'chip-gold'} font-mono !text-sm !px-4 !py-2`}>
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <FaqSection faqs={faqsFor('Services')} intro={s.faq_intro} />
      <CtaBand data={s.closing_cta} secondaryTo="/collaborate-with-us" />
    </>
  );
}
