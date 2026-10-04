import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Smooth scroll to top on every route change (visible motion, not an instant jump). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    // Small delay so the new page paints, then animate upward
    const id = window.setTimeout(() => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.05, force: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 40);

    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  return null;
}
