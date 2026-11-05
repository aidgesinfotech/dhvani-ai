import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, Check, Shield, Users } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { usePage } from '../lib/usePage';
import { items, list, paragraphs, str } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { Logo } from '../components/ui/Logo';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { StatsGrid } from '../components/sections/StatsGrid';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';

export function AboutPage() {
  const { page, s, loading } = usePage('about-us');
  const { stats, faqsFor } = useSite();
  if (loading || !page) return <PageLoader />;

  const { intro, audiences, domains, ecosystem, vision_mission, values, security, scale, closing_cta } = s;

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
        <div className="absolute top-0 left-1/2 h-[34rem] w-[60rem] max-w-[140vw] -translate-x-1/2 glow-blue opacity-70" aria-hidden />
        <div className="container-x relative mx-auto max-w-4xl text-center">
          <Reveal>
            <Logo className="mx-auto h-16 md:h-20" />
          </Reveal>
          {page.hero_eyebrow && (
            <Reveal delay={0.05}>
              <span className="eyebrow mx-auto mt-8">{page.hero_eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[2.2rem] leading-[1.08] font-semibold text-balance text-white sm:text-5xl md:text-6xl">
              {page.hero_title || page.title}
            </h1>
          </Reveal>
          {page.hero_subtitle && (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-fg-2 md:text-lg">{page.hero_subtitle}</p>
            </Reveal>
          )}
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {page.hero_cta_primary && (
                <Link to="/contact-us" className="btn btn-primary">
                  {page.hero_cta_primary}
                  <ArrowUpRight size={17} />
                </Link>
              )}
              {page.hero_cta_secondary && (
                <Link to="/collaborate-with-us" className="btn btn-ghost">
                  {page.hero_cta_secondary}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {intro && (
        <section className="section !pt-4">
          <div className="container-x mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow={str(intro, 'eyebrow')}
              title={str(intro, 'title')}
              body={str(intro, 'body')}
              align="center"
            />
          </div>
        </section>
      )}

      {audiences && (
        <section className="section">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            <Reveal className="card h-full p-6 md:p-8">
              <span className="icon-tile !h-12 !w-12">
                <Users size={22} />
              </span>
              <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">{str(audiences, 'crowd_eyebrow', 'For Contributors & Partners')}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">{str(audiences, 'crowd_title')}</h2>
              <p className="mt-2 text-sm font-medium text-gold">{str(audiences, 'crowd_kicker')}</p>
              <div className="mt-4 space-y-4">
                {paragraphs(str(audiences, 'crowd_body')).map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-fg-2">
                    {p}
                  </p>
                ))}
              </div>
              {str(audiences, 'crowd_cta') && (
                <Link to="/collaborate-with-us" className="btn btn-ghost btn-sm mt-7">
                  {str(audiences, 'crowd_cta')}
                  <ArrowUpRight size={15} />
                </Link>
              )}
            </Reveal>

            <Reveal delay={0.08} className="card card-gold h-full p-6 md:p-8">
              <span className="icon-tile !h-12 !w-12">
                <Building2 size={22} />
              </span>
              <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-gold uppercase">{str(audiences, 'client_eyebrow', 'For AI Labs & Enterprise Clients')}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">{str(audiences, 'client_title')}</h2>
              <p className="mt-2 text-sm font-medium text-gold">{str(audiences, 'client_kicker')}</p>
              <div className="mt-4 space-y-4">
                {paragraphs(str(audiences, 'client_body')).map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-fg-2">
                    {p}
                  </p>
                ))}
              </div>
              {str(audiences, 'client_cta') && (
                <Link to="/contact-us" className="btn btn-primary btn-sm mt-7">
                  {str(audiences, 'client_cta')}
                  <ArrowUpRight size={15} />
                </Link>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {domains && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow={str(domains, 'eyebrow')}
              title={str(domains, 'title')}
              body={str(domains, 'body')}
              align="center"
            />
            <FeatureGrid items={items(domains)} columns={5} className="mt-12" />
          </div>
        </section>
      )}

      {ecosystem && (
        <section className="section">
          <div className="container-x mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={str(ecosystem, 'eyebrow')}
              title={str(ecosystem, 'title')}
              body={str(ecosystem, 'body')}
              align="center"
            />
            <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list(ecosystem, 'categories').map((name, i) => (
                <RevealItem key={name}>
                  <div className="card card-hover flex h-full items-start gap-3 p-5">
                    <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-display text-base font-semibold text-white">{name}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            {str(ecosystem, 'closing') && (
              <Reveal delay={0.1}>
                <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-fg-2">{str(ecosystem, 'closing')}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {vision_mission && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={str(vision_mission, 'eyebrow')} title={str(vision_mission, 'title')} align="center" />
            <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
              {items(vision_mission).map((item) => (
                <Reveal key={item.title} className="card h-full p-6 md:p-8">
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">{item.body}</p>
                </Reveal>
              ))}
            </div>
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

      {security && (
        <section className="section">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-6 md:p-10">
              <div className="absolute inset-0 bg-dots opacity-30" aria-hidden />
              <div className="relative">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/35 bg-gold/10 text-gold">
                    <Shield size={22} />
                  </span>
                  <SectionHeading
                    className="mt-5"
                    eyebrow={str(security, 'eyebrow')}
                    title={str(security, 'title')}
                    body={str(security, 'body')}
                    align="center"
                  />
                </div>
                <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items(security).map((item) => (
                    <RevealItem key={item.title}>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                        <div className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                          <div>
                            <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{item.body}</p>
                          </div>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </div>
        </section>
      )}

      {stats.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow={str(scale, 'eyebrow', 'Our Global Scale')}
              title={str(scale, 'title', 'Numbers that reflect our reach')}
              body={str(scale, 'body')}
              align="center"
            />
            <div className="mt-12">
              <StatsGrid stats={stats} />
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={faqsFor('General').slice(0, 6)} />
      <CtaBand data={closing_cta} />
    </>
  );
}
