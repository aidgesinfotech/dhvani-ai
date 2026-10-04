import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import { api } from '../../lib/api';
import { AdminHeader, Badge } from './ui';

type PageRow = { id: number; slug: string; title: string; seo_title?: string; published?: number; updated_at?: string };

const LEGAL = new Set(['privacy-policy', 'terms-of-service']);

export function AdminPages() {
  const [pages, setPages] = useState<PageRow[]>([]);

  useEffect(() => {
    api.get<PageRow[]>('/api/admin/pages').then(setPages).catch(console.error);
  }, []);

  return (
    <div>
      <AdminHeader title="Pages" subtitle="Edit hero text, SEO and every content section of each page. Image URLs left empty show branded placeholders." />
      <div className="grid gap-3 sm:grid-cols-2">
        {pages.map((p) => {
          const path = p.slug === 'home' ? '/' : `/${p.slug}`;
          const to = LEGAL.has(p.slug) ? `/admin/${p.slug}` : `/admin/pages/${p.id}`;
          return (
            <div key={p.id} className="card card-hover flex items-center gap-4 p-5">
              <span className="icon-tile !h-11 !w-11">
                <FileText size={18} />
              </span>
              <Link to={to} className="min-w-0 flex-1">
                <p className="font-semibold text-white">{p.title}</p>
                <p className="truncate text-xs text-white/40">{path}</p>
              </Link>
              {!p.published && <Badge tone="red">hidden</Badge>}
              <a href={path} target="_blank" rel="noreferrer" className="text-white/40 hover:text-gold" aria-label="Open page">
                <ArrowUpRight size={16} />
              </a>
              <Link to={to} className="text-sm font-medium text-gold hover:text-gold-light">
                Edit
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
