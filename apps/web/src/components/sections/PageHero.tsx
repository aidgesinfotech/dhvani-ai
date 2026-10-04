import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

/** Gold-highlights the last `n` words of a heading. */
export function splitAccent(title: string, n = 2) {
  const words = title.trim().split(/\s+/);
  if (words.length <= n + 1) return { head: title, tail: '' };
  return { head: words.slice(0, -n).join(' ') + ' ', tail: words.slice(-n).join(' ') };
}

type Crumb = { label: string; to?: string };
type Cta = { label?: string | null; to: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  crumbs = [],
  image,
  children,
  accentWords = 2,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary?: Cta;
  secondary?: Cta;
  crumbs?: Crumb[];
  image?: { src?: string | null; label?: string | null };
  children?: ReactNode;
  accentWords?: number;
}) {
  const reduce = useReducedMotion();
  const { head, tail } = splitAccent(title, accentWords);
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[34rem] w-[60rem] max-w-[140vw] glow-blue opacity-70" aria-hidden />
      <div className="absolute -bottom-40 -right-20 h-[26rem] w-[26rem] glow-gold opacity-60" aria-hidden />

      <div className={`container-x relative ${image ? 'grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center' : ''}`}>
        <div className={image ? '' : 'max-w-4xl'}>
          {crumbs.length > 0 && (
            <motion.nav {...anim(0)} aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-fg-3">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="inline-flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-royal-light" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-gold transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-fg-2">{c.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
          {eyebrow && (
            <motion.span {...anim(0.05)} className="eyebrow">
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            {...anim(0.12)}
            className="mt-5 font-display text-[2.4rem] leading-[1.04] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-semibold text-white text-balance"
          >
            {head}
            {tail && <span className="text-gradient-gold">{tail}</span>}
          </motion.h1>
          {subtitle && (
            <motion.p {...anim(0.2)} className="mt-6 max-w-2xl text-base md:text-lg text-fg-2 leading-relaxed">
              {subtitle}
            </motion.p>
          )}
          {(primary?.label || secondary?.label) && (
            <motion.div {...anim(0.28)} className="mt-9 flex flex-wrap gap-3">
              {primary?.label && (
                <Link to={primary.to} className="btn btn-primary">
                  {primary.label}
                  <ArrowUpRight size={17} />
                </Link>
              )}
              {secondary?.label && (
                <Link to={secondary.to} className="btn btn-ghost">
                  {secondary.label}
                </Link>
              )}
            </motion.div>
          )}
          {children}
        </div>
        {image && (
          <motion.div {...anim(0.25)} className="relative">
            <div className="absolute -inset-6 glow-blue opacity-60" aria-hidden />
            <ImagePlaceholder src={image.src} label={image.label} ratio="aspect-[5/4]" className="relative" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
