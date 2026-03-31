// src/app/blog/[slug]/page.tsx — Single post (route: /blog/:slug)

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/services/blogService';
import PostContent from '@/components/features/blog/PostContent';
import { FadeIn, SlideIn } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/utils/cn';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for known posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article introuvable' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.3) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-5 md:px-8">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-small text-text-muted hover:text-brand-accent transition-colors duration-fast mb-8 focus-brand rounded-sm"
            >
              <span aria-hidden="true">←</span> Tous les articles
            </Link>
          </FadeIn>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <FadeIn delay={0.05}>
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md text-caption bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Title */}
          <FadeIn delay={0.08}>
            <h1 className="font-display text-display-md md:text-display-lg text-white mb-6 text-balance">
              {post.title}
            </h1>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.12}>
            <div className="flex items-center gap-4 pb-8 border-b border-border/20">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-brand-mid/30 border border-brand-mid/40 text-[10px] font-bold text-brand-accent">
                  {post.author.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-small text-text-secondary">{post.author}</span>
              </div>
              <span className="text-border/40" aria-hidden="true">·</span>
              <time className="pixel-text text-pixel-sm text-text-muted" dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-24">
        <SlideIn from="left" delay={0.1}>
          <PostContent content={post.content} />
        </SlideIn>

        {/* Footer nav */}
        <div className={cn(
          'mt-16 pt-8 border-t border-border/20',
          'flex items-center justify-between',
        )}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-small text-text-muted hover:text-brand-accent transition-colors duration-fast focus-brand rounded-sm"
          >
            <span aria-hidden="true">←</span> Tous les articles
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-small font-medium bg-brand-accent text-brand-dark hover:bg-[#ffe14d] transition-colors duration-fast focus-brand"
          >
            Voir les événements <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
