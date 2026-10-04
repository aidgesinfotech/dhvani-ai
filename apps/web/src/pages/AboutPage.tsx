import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Check } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { usePage, useProcess } from '../lib/usePage';
import { items, list, paragraphs, str } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { Bullet, PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { PageHero } from '../components/sections/PageHero';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { StatsGrid } from '../components/sections/StatsGrid';
import { Marquee } from '../components/sections/Marquee';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';

export function AboutPage() {
  const { page, s, loading } = usePage('about-us');
  const { stats, faqsFor } = useSite();
  const steps = useProcess('about');
  if (loading || !page) return <PageLoader />;

  const { intro, real_world, human_layer, lifecycle_intro, beyond, scale, heritage, values, why } = s;
  const highlights = list(intro, 'highlights');

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <PageHero
        eyebrow={page.hero_eyebrow}
        title={page.hero_title || page.title}
        subtitle={page.hero_subtitle}
        primary={{ label: page.hero_cta_primary, to: '/contact-us' }}
        secondary={{ label: page.hero_cta_secondary, to: '/services' }}
        crumbs={[{ label: page.title }]}
        accentWords={3}
      />

      {highlights.length > 0 && (
        <div className="border-y border-line bg-ink-2 py-6">
          <Marquee items={highlights} speed={30} />
        </div>
      )}

      {intro && (
        <section className="section">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <SectionHeading eyebrow={str(intro, 'eyebrow')} title={str(intro, 'title')} accent="AI-Ready Intelligence" />
              <Reveal delay={0.08} className="mt-6 space-y-5">
                {paragraphs(str(intro, 'body')).map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-lg md:text-xl text-white/90 leading-relaxed' : 'text-fg-2 leading-relaxed'}>
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
            <Reveal delay={0.1} className="relative lg:sticky lg:top-32">
              <div className="absolute -inset-8 glow-blue opacity-60" aria-hidden />
              <ImagePlaceholder src={str(intro, 'image_url')} label={str(intro, 'image_label')} ratio="aspect-[4/5]" className="relative" />
            </Reveal>
          </div>
        </section>
      )}

      {real_world && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(real_world, 'eyebrow')} title={str(real_world, 'title')} accent="but right." body={str(real_world, 'body')} />
            <Reveal className="mt-12 mb-6 flex items-center gap-4">
              <span className="font-display text-xl font-semibold text-white">{str(real_world, 'combines_title', 'Dhvani.ai combines:')}</span>
              <span className="h-px flex-1 divider-glow" />
            </Reveal>
            <FeatureGrid items={items(real_world)} columns={5} />
          </div>
        </section>
      )}

      {human_layer && (
        <section className="section">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <Reveal className="relative order-2 lg:order-1">
              <div className="absolute -inset-8 glow-gold opacity-50" aria-hidden />
              <ImagePlaceholder src={str(human_layer, 'image_url')} label={str(human_layer, 'image_label')} ratio="aspect-square" className="relative" />
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHeading eyebrow={str(human_layer, 'eyebrow')} title={str(human_layer, 'title')} accent="Better AI" />
              <Reveal delay={0.08} className="mt-6 space-y-4">
                {paragraphs(str(human_layer, 'body')).map((p, i) => (
                  <p key={i} className="text-fg-2 leading-relaxed">
                    {p}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.12}>
                <ul className="mt-7 space-y-3">
                  {list(human_layer, 'points').map((p) => (
                    <Bullet key={p}>{p}</Bullet>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(lifecycle_intro, 'eyebrow')} title={str(lifecycle_intro, 'title')} body={str(lifecycle_intro, 'body')} align="center" />
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      {beyond && (
        <section className="section">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2rem] border border-royal-light/25 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(55,24,200,0.3),transparent_55%),#05040c] p-6 md:p-12">
              <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
              <div className="relative">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <SectionHeading eyebrow={str(beyond, 'eyebrow')} title={str(beyond, 'title')} accent="AI Solutions" body={str(beyond, 'body')} />
                  <Reveal>
                    <Link to="/services/agentic-ai-solutions" className="btn btn-primary shrink-0">
                      Agentic AI <ArrowUpRight size={16} />
                    </Link>
                  </Reveal>
                </div>
                <FeatureGrid items={items(beyond)} columns={5} tone="blue" className="mt-10" />
              </div>
            </div>
          </div>
        </section>
      )}

      {stats.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(scale, 'eyebrow')} title={str(scale, 'title')} body={str(scale, 'body')} />
            <div className="mt-12">
              <StatsGrid stats={stats} />
            </div>
          </div>
        </section>
      )}

      {heritage && (
        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start">
            <div>
              <SectionHeading eyebrow={str(heritage, 'eyebrow')} title={str(heritage, 'title')} accent="Built for AI." />
              <Reveal delay={0.08} className="mt-6 space-y-4">
                {paragraphs(str(heritage, 'body')).map((p, i) => (
                  <p key={i} className="text-fg-2 leading-relaxed">
                    {p}
                  </p>
                ))}
              </Reveal>
              {str(heritage, 'badge') && (
                <Reveal delay={0.12} className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-gold/35 bg-gold/[0.07] px-5 py-4">
                  <Award size={26} className="text-gold shrink-0" />
                  <span className="text-sm font-medium text-gold-light">{str(heritage, 'badge')}</span>
                </Reveal>
              )}
            </div>
            <Reveal delay={0.1} className="card card-blue p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{str(heritage, 'services_title')}</p>
              <ul className="mt-5 divide-y divide-line">
                {list(heritage, 'services').map((sv) => (
                  <li key={sv} className="flex items-center gap-3 py-3 text-white/90">
                    <Check size={16} className="text-gold shrink-0" />
                    {sv}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {values && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(values, 'eyebrow')} title={str(values, 'title')} align="center" />
            <FeatureGrid items={items(values)} columns={3} className="mt-12" />
          </div>
        </section>
      )}

      {why && (
        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHeading eyebrow={str(why, 'eyebrow')} title={str(why, 'title')} />
            </div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {items(why).map((w, i) => (
                <RevealItem key={w.title}>
                  <div className="card card-hover h-full p-6">
                    <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{w.title}</h3>
                    <p className="mt-2 text-sm text-fg-2 leading-relaxed">{w.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <FaqSection faqs={faqsFor('General').slice(0, 6)} />
      <CtaBand data={s.closing_cta} />
    </>
  );
}
