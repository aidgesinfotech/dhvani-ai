import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, UserRound } from 'lucide-react';
import { api, type Post } from '../lib/api';
import { Seo } from '../components/Seo';
import { Markdown } from '../components/Markdown';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { PageLoader, SectionHeading } from '../components/ui/SectionHeading';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { CtaBand } from '../components/sections/CtaBand';
import { PostCard, PostMeta } from './BlogPage';
import { NotFoundPage } from './NotFoundPage';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [others, setOthers] = useState<Post[]>([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setPost(null);
    setMissing(false);
    api
      .get<Post>(`/api/public/posts/${slug}`)
      .then(setPost)
      .catch(() => setMissing(true));
    api
      .get<Post[]>('/api/public/posts')
      .then((all) => setOthers(all.filter((p) => p.slug !== slug).slice(0, 3)))
      .catch(() => setOthers([]));
  }, [slug]);

  if (missing) return <NotFoundPage />;
  if (!post) return <PageLoader />;

  return (
    <>
      <Seo title={post.seo_title || `${post.title} | Dhvani.ai Blog`} description={post.seo_description || post.excerpt} image={post.cover_url} />

      <article>
        <header className="relative overflow-hidden pt-32 md:pt-40 pb-10">
          <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[50rem] max-w-[140vw] glow-blue opacity-60" aria-hidden />
          <div className="container-x relative max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-fg-3">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <ChevronRight size={12} className="text-royal-light" />
              <Link to="/blog" className="hover:text-gold">
                Blog
              </Link>
              <ChevronRight size={12} className="text-royal-light" />
              <span className="text-fg-2 line-clamp-1">{post.title}</span>
            </nav>
            <PostMeta post={post} />
            <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] text-white text-balance">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-5 text-lg text-fg-2 leading-relaxed">{post.excerpt}</p>}
            {post.author && (
              <div className="mt-7 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-royal text-black">
                  <UserRound size={18} />
                </span>
                <span className="text-sm text-white">{post.author}</span>
              </div>
            )}
          </div>
        </header>

        <div className="container-x max-w-5xl">
          <Reveal>
            <ImagePlaceholder src={post.cover_url} label={post.cover_label || post.title} ratio="aspect-[16/8]" />
          </Reveal>
        </div>

        <div className="container-x max-w-3xl py-14 md:py-20">
          <Markdown source={post.content} />
          {!!post.tags?.length && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((t) => (
                <span key={t} className="chip chip-gold">
                  #{t}
                </span>
              ))}
            </div>
          )}
          <Link to="/blog" className="link-arrow mt-10">
            <ArrowLeft size={15} /> Back to all articles
          </Link>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section !pt-0">
          <div className="container-x">
            <SectionHeading eyebrow="Keep reading" title="More from the blog" />
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <RevealItem key={p.id} className="h-full">
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBand
        data={{
          eyebrow: 'Work With Us',
          title: 'Need data like this for your AI?',
          body: 'Talk to our team about speech, video, image, text and evaluation data — in 100+ languages.',
          cta_primary: 'Start a Project',
          cta_secondary: 'Explore Services',
        }}
      />
    </>
  );
}
