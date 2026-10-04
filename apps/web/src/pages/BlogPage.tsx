import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { api, formatDate, type Post } from '../lib/api';
import { usePage } from '../lib/usePage';
import { str } from '../lib/content';
import { Seo } from '../components/Seo';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { PageLoader } from '../components/ui/SectionHeading';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { PageHero } from '../components/sections/PageHero';
import { NewsletterForm } from '../components/forms/NewsletterForm';

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-3">
      {post.category && <span className="chip chip-blue !py-1 !text-[11px]">{post.category}</span>}
      {post.published_at && <span>{formatDate(post.published_at)}</span>}
      {!!post.read_minutes && (
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {post.read_minutes} min read
        </span>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="p-3 pb-0">
        <ImagePlaceholder src={post.cover_url} label={post.cover_label || post.title} ratio="aspect-[16/10]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-white group-hover:text-gold-light transition-colors">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-3 text-sm text-fg-2 leading-relaxed flex-1">{post.excerpt}</p>}
        <span className="link-arrow mt-5">
          Read article <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const { page, s, loading } = usePage('blog');
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    api.get<Post[]>('/api/public/posts').then(setPosts).catch(() => setPosts([]));
  }, []);

  const categories = useMemo(() => ['All', ...new Set((posts || []).map((p) => p.category).filter(Boolean) as string[])], [posts]);

  if (loading || !page || !posts) return <PageLoader />;
  const filtered = cat === 'All' ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = filtered;

  return (
    <>
      <Seo title={page.seo_title} description={page.seo_description} />
      <PageHero eyebrow={page.hero_eyebrow} title={page.hero_title || page.title} subtitle={page.hero_subtitle} crumbs={[{ label: page.title }]} />

      <section className="section !pt-2">
        <div className="container-x">
          {categories.length > 2 && (
            <Reveal className="mb-10 -mx-[4%] px-[4%] overflow-x-auto">
              <div className="flex gap-2 w-max">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                      cat === c ? 'bg-gold text-black' : 'border border-line-2 text-fg-2 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {!featured ? (
            <p className="card p-10 text-center text-fg-2">New articles are coming soon. Subscribe below to be notified.</p>
          ) : (
            <>
              <Reveal>
                <Link to={`/blog/${featured.slug}`} className="card card-hover card-gold group grid overflow-hidden lg:grid-cols-2">
                  <div className="p-3">
                    <ImagePlaceholder src={featured.cover_url} label={featured.cover_label || featured.title} ratio="aspect-[16/10] lg:aspect-auto lg:h-full" className="min-h-[15rem]" />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Featured article</span>
                    <div className="mt-4">
                      <PostMeta post={featured} />
                    </div>
                    <h2 className="mt-4 font-display text-2xl md:text-4xl font-semibold leading-tight text-white group-hover:text-gold-light transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && <p className="mt-4 text-fg-2 leading-relaxed">{featured.excerpt}</p>}
                    <span className="btn btn-primary btn-sm mt-8 self-start">
                      Read article <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
              {rest.length > 0 && (
                <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <RevealItem key={p.id} className="h-full">
                      <PostCard post={p} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-royal-light/25 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(55,24,200,0.3),transparent_55%),#05040c] p-8 md:p-12 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="eyebrow">Newsletter</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-white">{str(s.newsletter, 'title', 'Get AI data insights in your inbox')}</h2>
              <p className="mt-3 text-fg-2">{str(s.newsletter, 'body')}</p>
            </div>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
