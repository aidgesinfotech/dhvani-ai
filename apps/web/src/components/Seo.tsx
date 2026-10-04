import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Per-page title/description/OG + canonical; falls back to the CMS site defaults. */
export function Seo({ title, description, image }: { title?: string; description?: string; image?: string | null }) {
  const { settings } = useSite();
  const { pathname } = useLocation();

  useEffect(() => {
    const t = title || settings.seo_default_title || 'Dhvani.ai';
    const d = description || settings.seo_default_description || '';
    document.title = t;
    if (d) {
      setMeta('name', 'description', d);
      setMeta('property', 'og:description', d);
      setMeta('name', 'twitter:description', d);
    }
    setMeta('property', 'og:title', t);
    setMeta('name', 'twitter:title', t);
    const url = `${window.location.origin}${pathname}`;
    setMeta('property', 'og:url', url);
    if (image) setMeta('property', 'og:image', image);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, image, pathname, settings.seo_default_title, settings.seo_default_description]);

  return null;
}
