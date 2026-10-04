import { NavLink } from 'react-router-dom';
import { Handshake, House, Layers, Newspaper, Phone } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/services', label: 'Services', icon: Layers, end: false },
  { to: '/blog', label: 'Blog', icon: Newspaper, end: false },
  { to: '/collaborate-with-us', label: 'Join', icon: Handshake, end: false },
  { to: '/contact-us', label: 'Contact', icon: Phone, end: false },
] as const;

export function MobileBottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-[60] pointer-events-none px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile navigation"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-[23rem]">
        <div className="header-glass relative flex items-center justify-between rounded-full p-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {items.map(({ to, label, icon: Ico, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-full py-2 transition-colors ${
                  isActive ? 'text-black' : 'text-white/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute inset-0 rounded-full bg-gold shadow-[0_0_20px_rgba(209,169,8,0.55)]" aria-hidden />}
                  <Ico size={16} strokeWidth={isActive ? 2.3 : 1.8} className="relative z-10" />
                  <span className="relative z-10 font-mono text-[8.5px] uppercase tracking-[0.06em] leading-none">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
