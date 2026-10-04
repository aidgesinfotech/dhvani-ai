import { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ChartColumn,
  CircleHelp,
  ExternalLink,
  FileText,
  Inbox,
  Layers,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  Newspaper,
  ScrollText,
  Settings,
  Shield,
  Star,
  X,
} from 'lucide-react';
import { TOKEN_KEY } from '../lib/api';
import { LOGO_SRC } from '../components/ui/Logo';

const groups = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/leads', label: 'Leads & Registrations', icon: Inbox },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/pages', label: 'Pages', icon: FileText },
      { to: '/admin/services', label: 'Services', icon: Layers },
      { to: '/admin/posts', label: 'Blog Posts', icon: Newspaper },
      { to: '/admin/process', label: 'Process Steps', icon: ListOrdered },
      { to: '/admin/stats', label: 'Stats', icon: ChartColumn },
      { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
      { to: '/admin/faqs', label: 'FAQs', icon: CircleHelp },
    ],
  },
  {
    label: 'Legal & Site',
    items: [
      { to: '/admin/privacy-policy', label: 'Privacy Policy', icon: Shield },
      { to: '/admin/terms-of-service', label: 'Terms of Service', icon: ScrollText },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{g.label}</p>
          <div className="space-y-0.5">
            {g.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-gold/12 text-gold-light shadow-[inset_2px_0_0_#d1a908]' : 'text-white/55 hover:bg-white/5 hover:text-white'
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

  useEffect(() => setOpen(false), [pathname]);

  if (!token) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate('/admin/login');
  };

  const brand = (
    <Link to="/admin" className="flex items-center gap-3 px-2">
      <img src={LOGO_SRC} alt="Dhvani.ai" className="h-10 w-auto" />
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Admin CMS</p>
    </Link>
  );

  const footer = (
    <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
      <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/55 hover:text-white">
        <ExternalLink size={16} /> View website
      </a>
      <button type="button" onClick={logout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/55 hover:text-white">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#050507] p-4 md:flex">
        <div className="mb-8">{brand}</div>
        <Nav />
        {footer}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/10 bg-[#050507] p-4">
            <div className="mb-6 flex items-center justify-between">
              {brand}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-white/60">
                <X size={20} />
              </button>
            </div>
            <Nav onNavigate={() => setOpen(false)} />
            {footer}
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur md:hidden">
          {brand}
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg border border-white/10 p-2">
            <Menu size={18} />
          </button>
        </header>
        <main className="mx-auto max-w-6xl p-4 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
