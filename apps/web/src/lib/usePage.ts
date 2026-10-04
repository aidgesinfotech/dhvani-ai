import { useEffect, useState } from 'react';
import { api, sectionMap, type PageData, type ProcessStep } from './api';

const pageCache = new Map<string, PageData>();

/** Loads a CMS page (cached per session) and exposes its sections keyed by section_key. */
export function usePage(slug: string) {
  const [page, setPage] = useState<PageData | null>(() => pageCache.get(slug) || null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    api
      .get<PageData>(`/api/public/pages/${slug}`)
      .then((p) => {
        pageCache.set(slug, p);
        if (alive) setPage(p);
      })
      .catch((e) => alive && setError(e instanceof Error ? e.message : 'Failed to load'));
    return () => {
      alive = false;
    };
  }, [slug]);

  return { page, s: sectionMap(page), loading: !page && !error, error };
}

export function useProcess(group: string) {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  useEffect(() => {
    api.get<ProcessStep[]>(`/api/public/process/${group}`).then(setSteps).catch(console.error);
  }, [group]);
  return steps;
}
