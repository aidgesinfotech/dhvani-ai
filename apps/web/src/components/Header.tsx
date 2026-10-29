import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Logo } from './ui/Logo';
import { Icon } from './ui/Icon';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/services/egocentric-video-data-collection', label: 'Egocentric', featured: true },
  { to: '/services', label: 'Services', mega: true },
  { to: '/blog', label: 'Blog' },
  { to: '/collaborate-with-us', label: 'Collaborate' },
  { to: '/contact-us', label: 'Contact' },
];

export function Header() {
  const { settings, services } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof services>();
    services.forEach((s) => {
      const k = s.category || 'Services';
      map.set(k, [...(map.get(k) || []), s]);
    });
    return [...map.entries()];
  }, [services]);

  const cta = settings.cta_label || "Let's Talk";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="container-x pt-3 md:pt-4">
          <div
            className={`pointer-events-auto relative flex items-center justify-between gap-3 rounded-full px-3 py-2 md:px-4 md:py-2.5 transition-all duration-500 ${
              scrolled ? 'header-glass shadow-[0_14px_40px_-12px_rgba(0,0,0,0.8)]' : 'border border-transparent'
            }`}
            onMouseLeave={() => setMega(false)}
          >
            <Link to="/" className="shrink-0" aria-label={`${settings.site_name || 'Dhvani.ai'} home`} data-cursor="hover">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
              {links.map((l) =>
                l.mega ? (
                  <div key={l.to} className="relative" onMouseEnter={() => setMega(true)}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                          isActive || mega ? 'text-gold' : 'text-fg-2 hover:text-white'
                        }`
                      }
                      aria-haspopup="true"
                      aria-expanded={mega}
                      onFocus={() => setMega(true)}
                    >
                      {l.label}
                      <ChevronDown size={14} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    onMouseEnter={() => setMega(false)}
                    className={({ isActive }) =>
                      `px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                        'featured' in l && l.featured
                          ? 'text-gold'
                          : isActive
                            ? 'text-gold'
                            : 'text-fg-2 hover:text-white'
                      }`
                    }
                  >
                    {'featured' in l && l.featured ? (
                      <span className="relative inline-block text-gold drop-shadow-[0_0_10px_rgba(209,169,8,0.55)]">
                        <Star
                          size={9}
                          className="absolute -top-2 left-0 fill-gold text-gold drop-shadow-[0_0_6px_rgba(209,169,8,0.9)]"
                          aria-hidden
                        />
                        {l.label}
                      </span>
                    ) : (
                      l.label
                    )}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Link to="/contact-us" className="btn btn-primary btn-sm hidden sm:inline-flex" data-cursor="hover">
                {cta}
                <ArrowUpRight size={15} />
              </Link>
              <button
                type="button"
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 bg-white/5 text-white"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>

            <AnimatePresence>
              {mega && grouped.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-0 right-0 top-full pt-3 hidden lg:block"
                >
                  <div className="rounded-[1.5rem] border border-line-2 bg-[#0a0a0d] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)]">
                    <div className="grid grid-cols-[1fr_1fr_1fr_16rem] gap-6">
                      <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-5">
                        {grouped.map(([cat, list]) => (
                          <div key={cat}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-royal-light mb-2">{cat}</p>
                            <ul className="space-y-0.5">
                              {list.map((s) => (
                                <li key={s.id}>
                                  <Link
                                    to={`/services/${s.slug}`}
                                    className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm text-fg-2 hover:bg-white/5 hover:text-white transition-colors"
                                  >
                                    <Icon name={s.icon} size={16} className="text-gold shrink-0" />
                                    <span className="leading-snug">{s.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="card card-gold p-5 flex flex-col">
                        <p className="font-display text-lg font-semibold text-white">Not sure where to start?</p>
                        <p className="mt-2 text-sm text-fg-2 flex-1">Tell us your use case — we’ll recommend the right data & AI mix.</p>
                        <Link to="/services" className="link-arrow mt-4">
                          All services <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl lg:hidden overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute -top-40 -right-20 h-96 w-96 glow-blue pointer-events-none" aria-hidden />
            <div className="container-x flex items-center justify-between py-4">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Home">
                <Logo />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-white"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="container-x relative flex flex-col pt-6 pb-32" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-line"
                >
                  {'mega' in l && l.mega ? (
                    <>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between py-4 font-display text-2xl font-semibold text-white"
                        onClick={() => setMobileServices((v) => !v)}
                        aria-expanded={mobileServices}
                      >
                        {l.label}
                        <ChevronDown size={20} className={`text-gold transition-transform ${mobileServices ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServices && (
                        <div className="pb-4 grid gap-1">
                          <Link to="/services" className="py-1.5 text-sm text-gold" onClick={() => setOpen(false)}>
                            All services →
                          </Link>
                          {services.map((s) => (
                            <Link
                              key={s.id}
                              to={`/services/${s.slug}`}
                              className="flex items-center gap-2.5 py-1.5 text-sm text-fg-2"
                              onClick={() => setOpen(false)}
                            >
                              <Icon name={s.icon} size={15} className="text-gold" />
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `block py-4 font-display text-2xl font-semibold ${
                          ('featured' in l && l.featured) || isActive ? 'text-gold' : 'text-white'
                        }`
                      }
                      onClick={() => setOpen(false)}
                    >
                      {'featured' in l && l.featured ? (
                        <span className="relative inline-block text-gold drop-shadow-[0_0_12px_rgba(209,169,8,0.5)]">
                          <Star
                            size={12}
                            className="absolute -top-1 left-0 fill-gold text-gold drop-shadow-[0_0_6px_rgba(209,169,8,0.9)]"
                            aria-hidden
                          />
                          {l.label}
                        </span>
                      ) : (
                        l.label
                      )}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <Link to="/contact-us" className="btn btn-primary mt-8 self-start" onClick={() => setOpen(false)}>
                {cta}
                <ArrowUpRight size={17} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
