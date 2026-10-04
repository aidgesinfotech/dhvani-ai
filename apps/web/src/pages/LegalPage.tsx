import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { api, sectionMap, type PageData } from '../lib/api';
import { paragraphs } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { PageLoader } from '../components/ui/SectionHeading';
import { PageHero } from '../components/sections/PageHero';

export type LegalBlock = { heading?: string; body: string };

function blockId(heading: string | undefined, i: number) {
  if (!heading) return `section-${i + 1}`;
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function LegalPage({ slug }: { slug: 'privacy-policy' | 'terms-of-service' }) {
  const [page, setPage] = useState<PageData | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setPage(null);
    setFailed(false);
    api
      .get<PageData>(`/api/public/pages/${slug}`)
      .then(setPage)
      .catch(() => setFailed(true));
  }, [slug]);

  const content = sectionMap(page).content || {};
  const blocks = useMemo(() => (Array.isArray(content.blocks) ? (content.blocks as LegalBlock[]) : []), [content.blocks]);
  const lastUpdated = typeof content.last_updated === 'string' ? content.last_updated : '';
  const isPrivacy = slug === 'privacy-policy';
  const other = isPrivacy ? { to: '/terms-of-service', label: 'Terms of Service' } : { to: '/privacy-policy', label: 'Privacy Policy' };

  const toc = useMemo(
    () => blocks.map((b, i) => ({ heading: b.heading, id: blockId(b.heading, i) })).filter((t) => t.heading),
    [blocks]
  );

  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = toc.findIndex((t) => t.id === visible.target.id);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] }
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  if (!page && !failed) return <PageLoader />;
  const title = page?.hero_title || (isPrivacy ? 'Privacy Policy' : 'Terms of Service');

  return (
    <>
      <Seo title={page?.seo_title || `${title} | Dhvani.ai`} description={page?.seo_description} />
      <PageHero eyebrow={page?.hero_eyebrow || 'Legal'} title={title} subtitle={page?.hero_subtitle} crumbs={[{ label: title }]} accentWords={1}>
        {lastUpdated && <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3">Last updated · {lastUpdated}</p>}
      </PageHero>

      <section className="section !pt-4">
        <div className="container-x lg:grid lg:grid-cols-[0.7fr_1.5fr] lg:gap-16 lg:items-start">
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-3 mb-4">On this page</p>
            <nav className="space-y-1" aria-label="Document sections">
              {toc.map((t, i) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active === i ? 'bg-gold/10 text-white' : 'text-fg-3 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span className={`font-mono text-[10px] tabular-nums ${active === i ? 'text-gold' : 'text-fg-3'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{t.heading}</span>
                </a>
              ))}
            </nav>
            <div className="mt-8 border-t border-line pt-6 space-y-3">
              <Link to={other.to} className="link-arrow">
                {other.label} <ArrowUpRight size={14} />
              </Link>
              <br />
              <Link to="/contact-us" className="link-arrow">
                Contact us <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>

          <div className="min-w-0">
            {failed && <p className="card p-8 text-fg-2">This document is currently unavailable. Please contact us for a copy.</p>}
            <div className="border-t border-line">
              {blocks.map((block, i) => {
                const id = blockId(block.heading, i);
                return (
                  <Reveal key={`${id}-${i}`} delay={Math.min(i * 0.03, 0.2)}>
                    <article id={id} className="scroll-mt-28 border-b border-line py-8 md:py-10 grid grid-cols-[auto_1fr] gap-4 md:gap-6">
                      <span className="font-mono text-[11px] text-gold pt-1.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <div className="min-w-0">
                        {block.heading && <h2 className="font-display text-xl md:text-2xl font-semibold text-white mb-3">{block.heading}</h2>}
                        {paragraphs(block.body).map((p, j) => (
                          <p key={j} className="text-[15px] text-fg-2 leading-relaxed mb-3 last:mb-0 max-w-2xl">
                            {p}
                          </p>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/contact-us" className="btn btn-primary">
                Contact us <ArrowUpRight size={16} />
              </Link>
              <Link to={other.to} className="btn btn-ghost">
                {other.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
