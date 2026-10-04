import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { api, type Service } from '../lib/api';
import { useSite } from '../context/SiteContext';
import { useProcess } from '../lib/usePage';
import { paragraphs, waHref } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { Bullet, PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../components/sections/PageHero';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ServiceGrid } from '../components/sections/ServiceCard';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBand } from '../components/sections/CtaBand';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const { services, settings } = useSite();
  const steps = useProcess('services');
  const [svc, setSvc] = useState<Service | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setSvc(null);
    setMissing(false);
    api
      .get<Service>(`/api/public/services/${slug}`)
      .then(setSvc)
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing) return <NotFoundPage />;
  if (!svc) return <PageLoader />;

  const b = svc.body || {};
  const related = services.filter((x) => x.slug !== svc.slug && x.category === svc.category).slice(0, 3);
  const more = related.length >= 2 ? related : services.filter((x) => x.slug !== svc.slug).slice(0, 3);

  return (
    <>
      <Seo title={svc.seo_title || `${svc.title} | Dhvani.ai`} description={svc.seo_description || svc.excerpt} image={svc.image_url} />
      <PageHero
        eyebrow={svc.category}
        title={svc.title}
        subtitle={b.tagline || svc.excerpt}
        primary={{ label: 'Discuss Your Project', to: '/contact-us' }}
        secondary={{ label: 'All Services', to: '/services' }}
        crumbs={[{ label: 'Services', to: '/services' }, { label: svc.title }]}
        image={{ src: svc.image_url, label: svc.image_label || svc.title }}
      >
        {!!svc.tags?.length && (
          <div className="mt-8 flex flex-wrap gap-2">
            {svc.tags.map((t, i) => (
              <span key={t} className={`chip ${i % 2 ? 'chip-blue' : 'chip-gold'}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </PageHero>

      <section className="section !pt-6">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Overview" title={svc.excerpt || svc.title} />
            <Reveal delay={0.06} className="mt-6 space-y-5">
              {paragraphs(b.overview || svc.description).map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-white/90 leading-relaxed' : 'text-fg-2 leading-relaxed'}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
          <aside className="lg:sticky lg:top-32 self-start space-y-4">
            {!!b.highlights?.length && (
              <Reveal className="card card-gold p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Key highlights</p>
                <ul className="mt-4 space-y-3">
                  {b.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-white/90">
                      <Check size={16} className="mt-0.5 text-gold shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal delay={0.06} className="card card-blue p-6">
              <span className="icon-tile icon-tile-blue">
                <Icon name={svc.icon} size={22} />
              </span>
              <p className="mt-4 font-display text-lg font-semibold text-white">Need this for your model?</p>
              <p className="mt-1.5 text-sm text-fg-2">Get a scoped proposal — most projects start with a quick pilot.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/contact-us" className="btn btn-primary btn-sm">
                  Get a Quote <ArrowUpRight size={14} />
                </Link>
                {settings.whatsapp && (
                  <a href={waHref(settings.whatsapp, `Hi Dhvani.ai, I'm interested in ${svc.title}.`)} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                )}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {!!b.blocks?.length && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Capabilities" title={b.blocks_title || 'What we deliver'} />
            <FeatureGrid items={b.blocks} columns={b.blocks.length === 4 ? 4 : 3} className="mt-12" />
          </div>
        </section>
      )}

      {!!b.groups?.length && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Scope" title={b.groups_title || 'Coverage'} />
            <RevealGroup className={`mt-12 grid gap-4 sm:grid-cols-2 ${b.groups.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {b.groups.map((g, i) => (
                <RevealItem key={g.title} className="h-full">
                  <div className={`card ${i % 2 ? 'card-blue' : ''} h-full p-6 md:p-7`}>
                    <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {g.items.map((it) => (
                        <Bullet key={it} tone={i % 2 ? 'blue' : 'gold'}>
                          <span className="text-sm">{it}</span>
                        </Bullet>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {(!!b.use_cases?.length || !!b.quality?.length) && (
        <section className="section">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            {!!b.use_cases?.length && (
              <Reveal className="card p-7 md:p-9">
                <span className="eyebrow">Use cases</span>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">Where it powers AI</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {b.use_cases.map((u) => (
                    <span key={u} className="chip !text-sm !py-2 !px-3.5">
                      {u}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
            {!!b.quality?.length && (
              <Reveal delay={0.06} className="card card-gold p-7 md:p-9">
                <span className="eyebrow">Quality & security</span>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-semibold text-white">Built to be trusted</h2>
                <ul className="mt-6 space-y-3">
                  {b.quality.map((q) => (
                    <Bullet key={q}>{q}</Bullet>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          {!!b.formats?.length && (
            <div className="container-x mt-6">
              <Reveal className="card card-blue flex flex-col gap-4 p-6 md:flex-row md:items-center md:p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold shrink-0">Delivery formats</span>
                <div className="flex flex-wrap gap-2">
                  {b.formats.map((f) => (
                    <span key={f} className="chip chip-blue font-mono">
                      {f}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </section>
      )}

      {b.closing && (
        <section className="section !py-10">
          <div className="container-x">
            <Reveal className="relative overflow-hidden rounded-[1.5rem] border border-line p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
              <p className="relative mx-auto max-w-3xl font-display text-xl md:text-3xl font-medium leading-snug text-white text-balance">
                “{b.closing}”
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="How it works" title="From brief to AI-ready delivery" align="center" />
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      <FaqSection
        faqs={b.faqs || []}
        intro={{ eyebrow: 'Service FAQ', title: `${svc.title} — FAQs`, body: 'Quick answers to common questions about this service.' }}
      />

      {more.length > 0 && (
        <section className="section">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="Related" title="Explore related services" />
              <Reveal>
                <Link to="/services" className="btn btn-ghost shrink-0">
                  All services <ArrowUpRight size={16} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-10">
              <ServiceGrid services={more} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        data={{
          eyebrow: 'Start a Project',
          title: `Ready to start your ${svc.title.toLowerCase()} project?`,
          body: 'Share your languages, volumes and timelines — we’ll respond with a scoped plan within one business day.',
          cta_primary: 'Get a Quote',
          cta_secondary: 'Explore Services',
        }}
      />
    </>
  );
}
