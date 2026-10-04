import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type Faq, type Service, type SiteSettings, type Stat, type Testimonial } from '../lib/api';

type SiteContextValue = {
  settings: SiteSettings;
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: Faq[];
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  faqsFor: (category: string) => Faq[];
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    try {
      const data = await api.get<{
        settings: SiteSettings;
        services: Service[];
        stats: Stat[];
        testimonials: Testimonial[];
        faqs: Faq[];
      }>('/api/public/site');
      setSettings(data.settings || {});
      setServices(data.services || []);
      setStats(data.stats || []);
      setTestimonials(data.testimonials || []);
      setFaqs(data.faqs || []);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load site data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const faqsFor = useCallback(
    (category: string) => faqs.filter((f) => (f.category || 'General').toLowerCase() === category.toLowerCase()),
    [faqs]
  );

  return (
    <SiteContext.Provider value={{ settings, services, stats, testimonials, faqs, loading, error, refresh, faqsFor }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
