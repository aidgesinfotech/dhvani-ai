import { useEffect, useMemo, useRef, useState } from 'react';
import markup from './home/live-home.html?raw';
import { ContributorIntro } from './home/ContributorIntro';
import { applyHomeSections, paintRegion, syncHomeFaqs } from './home/applyHome';
import { mergeHome, type HomeContent, type MapRegion } from './home/homeModel';
import { Seo } from '../components/Seo';
import { api } from '../lib/api';
import { useSite } from '../context/SiteContext';

function toggleFaq(button: HTMLButtonElement) {
  const card = button.parentElement;
  if (!card) return;
  const open = button.getAttribute('aria-expanded') === 'true';
  const next = !open;
  button.setAttribute('aria-expanded', next ? 'true' : 'false');
  const body = button.nextElementSibling as HTMLElement | null;
  if (body) {
    if (next) body.removeAttribute('hidden');
    else body.setAttribute('hidden', '');
  }
  card.classList.toggle('card-gold', next);
  card.classList.toggle('!border-gold/40', next);
  const icon = button.querySelector('span.inline-flex');
  if (icon) {
    icon.classList.toggle('rotate-45', next);
    icon.classList.toggle('border-[#d1a908]', next);
    icon.classList.toggle('bg-[#d1a908]', next);
    icon.classList.toggle('text-black', next);
    icon.classList.toggle('border-royal-light/40', !next);
    icon.classList.toggle('text-royal-light', !next);
  }
}

export function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<MapRegion[]>([]);
  const [content, setContent] = useState<HomeContent>(() => mergeHome(null));
  const { faqs } = useSite();
  const generalFaqs = useMemo(
    () => faqs.filter((f) => (f.category || 'General').toLowerCase() === 'general'),
    [faqs]
  );

  useEffect(() => {
    api
      .get<HomeContent | null>('/api/public/homepage')
      .then((saved) => setContent(mergeHome(saved)))
      .catch(() => setContent(mergeHome(null)));
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    regionsRef.current = content.regions;
    applyHomeSections(root, content.sections);
    paintRegion(root, 0, content.regions);
    syncHomeFaqs(root, generalFaqs);
  }, [content, generalFaqs]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const id = anchor.getAttribute('href')?.slice(1);
        const el = id ? document.getElementById(id) : null;
        if (el) {
          event.preventDefault();
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      const tab = target.closest<HTMLButtonElement>('[role="tab"]');
      if (tab && root.contains(tab)) {
        const tabs = [...root.querySelectorAll('[role="tab"]')];
        paintRegion(root, tabs.indexOf(tab), regionsRef.current);
        return;
      }

      const faq = target.closest<HTMLButtonElement>('button[aria-expanded]');
      if (faq && root.contains(faq) && !faq.getAttribute('role')) toggleFaq(faq);
    };

    root.querySelectorAll('animateMotion, animate, animateTransform').forEach((node) => {
      const motion = node as SVGAnimationElement;
      if (typeof motion.beginElement !== 'function') return;
      try {
        motion.beginElement();
      } catch {
        /* animation is already on the timeline */
      }
    });

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Seo title={content.seoTitle} description={content.seoDescription} />
      <ContributorIntro content={content} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
