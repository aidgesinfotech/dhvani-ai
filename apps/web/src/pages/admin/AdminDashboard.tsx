import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, CircleHelp, Inbox, Layers, Mail, MessageSquare, Newspaper, Star, UserRound } from 'lucide-react';
import { api } from '../../lib/api';
import { AdminHeader, Badge } from './ui';

type Dash = {
  counts: Record<string, number>;
  recentLeads: { id: number; type: string; name: string; email: string; subject: string; status: string; created_at: string }[];
};

const TYPE_TONE: Record<string, 'gold' | 'blue' | 'gray' | 'green'> = { contact: 'gold', freelancer: 'blue', vendor: 'green', newsletter: 'gray' };

export function AdminDashboard() {
  const [data, setData] = useState<Dash | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.get<Dash>('/api/admin/dashboard').then(setData).catch((e) => setErr(e.message));
  }, []);

  if (err) return <p className="text-red-300">{err}</p>;
  if (!data) return <p className="text-white/40">Loading…</p>;
  const c = data.counts;

  const leadCards = [
    { label: 'New leads', value: c.leads_new, icon: Inbox, to: '/admin/leads', highlight: true },
    { label: 'Contact enquiries', value: c.contact, icon: MessageSquare, to: '/admin/leads?type=contact' },
    { label: 'Freelancers', value: c.freelancer, icon: UserRound, to: '/admin/leads?type=freelancer' },
    { label: 'Vendors', value: c.vendor, icon: Building2, to: '/admin/leads?type=vendor' },
    { label: 'Newsletter', value: c.newsletter, icon: Mail, to: '/admin/leads?type=newsletter' },
  ];
  const contentCards = [
    { label: 'Services', value: c.services, icon: Layers, to: '/admin/services' },
    { label: 'Blog posts', value: c.posts, icon: Newspaper, to: '/admin/posts' },
    { label: 'FAQs', value: c.faqs, icon: CircleHelp, to: '/admin/faqs' },
    { label: 'Testimonials', value: c.testimonials, icon: Star, to: '/admin/testimonials' },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" subtitle="Everything you edit here goes live on the website immediately." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {leadCards.map((k) => (
          <Link key={k.label} to={k.to} className={`card card-hover p-5 ${k.highlight ? 'card-gold' : ''}`}>
            <k.icon size={18} className={k.highlight ? 'text-gold' : 'text-royal-light'} />
            <p className="mt-4 font-display text-3xl font-bold text-white">{k.value}</p>
            <p className="mt-1 text-xs text-white/50">{k.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-3 grid gap-3 grid-cols-2 lg:grid-cols-4">
        {contentCards.map((k) => (
          <Link key={k.label} to={k.to} className="card card-hover flex items-center gap-4 p-5">
            <span className="icon-tile !h-10 !w-10">
              <k.icon size={18} />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-white">{k.value}</p>
              <p className="text-xs text-white/50">{k.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Recent submissions</h2>
          <Link to="/admin/leads" className="link-arrow text-sm">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        {data.recentLeads.length === 0 ? (
          <p className="text-sm text-white/40">No submissions yet. Contact, collaborate and newsletter forms will appear here.</p>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {data.recentLeads.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">
                    {l.name || l.email} <span className="text-white/40">· {l.email}</span>
                  </p>
                  <p className="truncate text-xs text-white/40">{l.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={TYPE_TONE[l.type] || 'gray'}>{l.type}</Badge>
                  {l.status === 'new' && <Badge tone="gold">new</Badge>}
                  <span className="text-xs text-white/35">{new Date(l.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
