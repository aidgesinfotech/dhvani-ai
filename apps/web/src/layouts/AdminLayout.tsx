import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ChartColumn,
  CircleHelp,
  ExternalLink,
  FileText,
  House,
  Inbox,
  Layers,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  Newspaper,
  ScrollText,
  Search,
  Settings,
  Shield,
  Star,
  X,
} from 'lucide-react';
import { TOKEN_KEY } from '../lib/api';
import { LOGO_SRC } from '../components/ui/Logo';
import { field } from '../pages/admin/ui';

const groups = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/homepage', label: 'Homepage', icon: House },
      { to: '/admin/leads', label: 'Leads', icon: Inbox },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/pages', label: 'Pages', icon: FileText },
      { to: '/admin/services', label: 'Services', icon: Layers },
      { to: '/admin/posts', label: 'Blog', icon: Newspaper },
      { to: '/admin/process', label: 'Process', icon: ListOrdered },
      { to: '/admin/stats', label: 'Stats', icon: ChartColumn },
      { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
      { to: '/admin/faqs', label: 'FAQs', icon: CircleHelp },
    ],
  },
  {
    label: 'Site',
    items: [
      { to: '/admin/privacy-policy', label: 'Privacy & Cookies', icon: Shield },
      { to: '/admin/terms-of-service', label: 'Website Terms', icon: ScrollText },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

const tabs = [
  { to: '/admin', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/admin/homepage', label: 'Page', icon: House, end: false },
  { to: '/admin/leads', label: 'Leads', icon: Inbox, end: false },
] as const;

type Item = (typeof groups)[number]['items'][number];

function matches(pathname: string, item: { to: string; end?: boolean }) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

function NavList({ query, onNavigate }: { query: string; onNavigate?: () => void }) {
  const q = query.trim().toLowerCase();
  const visible = groups
    .map((group) => ({ ...group, items: group.items.filter((item) => !q || item.label.toLowerCase().includes(q)) }))
    .filter((group) => group.items.length);

  if (!visible.length) return <p className="px-3 py-6 text-sm text-white/40">No matches.</p>;

  return (
    <nav className="space-y-5">
      {visible.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">{group.label}</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-0.5">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex min-h-14 items-center gap-2.5 rounded-2xl px-3 text-sm font-medium transition-colors lg:min-h-11 lg:rounded-xl ${
                    isActive ? 'bg-gold text-black' : 'border border-white/10 text-white/70 hover:bg-white/5 hover:text-white lg:border-transparent'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AdminLayout() {
  const token = localStorage.getItem(TOKEN_KEY);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const current = useMemo(() => {
    const items = groups.flatMap((group) => group.items) as Item[];
    return [...items].reverse().find((item) => matches(pathname, item));
  }, [pathname]);

  if (!token) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate('/admin/login');
  };

  const moreActive = !tabs.some((tab) => matches(pathname, tab));

  const search = (
    <label className="relative mb-4 block">
      <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/35" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search admin"
        className={`${field} pl-9`}
      />
    </label>
  );

  const account = (
    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 lg:grid-cols-1">
      <a href="/" target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 px-3 text-sm text-white/70 hover:text-white lg:justify-start lg:rounded-xl lg:border-transparent">
        <ExternalLink size={16} /> Website
      </a>
      <button type="button" onClick={logout} className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 px-3 text-sm text-white/70 hover:text-white lg:justify-start lg:rounded-xl lg:border-transparent">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(209,169,8,0.14),transparent_62%)]" aria-hidden />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17.5rem] flex-col border-r border-white/10 bg-[#07070b]/95 p-4 backdrop-blur-xl lg:flex">
        <Link to="/admin" className="mb-6 flex items-center gap-3 px-1">
          <img src={LOGO_SRC} alt="Dhvani.ai" className="h-9 w-auto" />
          <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] text-gold uppercase">CMS</span>
        </Link>
        {search}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <NavList query={query} />
        </div>
        {account}
      </aside>

      <div className="relative lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[#050507]/80 px-4 py-3 backdrop-blur-xl lg:hidden pt-[max(0.75rem,env(safe-area-inset-top))]">
          <img src={LOGO_SRC} alt="" className="h-8 w-auto" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-semibold text-white">{current?.label || 'Admin'}</p>
            <p className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">Dhvani CMS</p>
          </div>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Menu size={18} />
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-4 pt-5 pb-[calc(6.75rem+env(safe-area-inset-bottom))] sm:px-5 lg:px-10 lg:pt-8 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[1.7rem] border border-white/10 bg-[#0b0b10] px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-24px_80px_rgba(0,0,0,0.65)]">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" aria-hidden />
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg font-semibold">All sections</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70">
                <X size={18} />
              </button>
            </div>
            {search}
            <NavList query={query} onNavigate={() => setOpen(false)} />
            {account}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))] lg:hidden" aria-label="Admin">
        <div className="mx-auto flex max-w-md items-stretch rounded-full border border-white/10 bg-black/80 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {tabs.map(({ to, label, icon: Ico, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium ${
                  isActive ? 'bg-gold text-black' : 'text-white/55'
                }`
              }
            >
              <Ico size={16} />
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium ${
              moreActive ? 'bg-gold text-black' : 'text-white/55'
            }`}
          >
            <Menu size={16} />
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
}
