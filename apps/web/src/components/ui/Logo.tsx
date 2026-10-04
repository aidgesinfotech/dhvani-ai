import { useSite } from '../../context/SiteContext';

export const LOGO_SRC = '/logo.png';

/** Brand logo image only — `settings.logo_url` (CMS) overrides the bundled file. */
export function Logo({ className = 'h-10 md:h-12' }: { className?: string }) {
  const { settings } = useSite();
  return (
    <img
      src={settings.logo_url || LOGO_SRC}
      alt={settings.site_name || 'Dhvani.ai'}
      width={366}
      height={176}
      className={`w-auto object-contain drop-shadow-[0_0_14px_rgba(139,116,255,0.35)] ${className}`}
    />
  );
}
