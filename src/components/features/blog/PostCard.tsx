// src/components/features/blog/PostCard.tsx

import Link from 'next/link';
import type { Post } from '@/types/blog';
import { cn } from '@/lib/utils/cn';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full focus-brand rounded-xl">
      <article
        className={cn(
          'relative flex rounded-xl overflow-hidden h-full',
          'border border-border/40 bg-surface-raised/20 backdrop-blur-sm',
          'hover:border-brand-mid/50 hover:-translate-y-1',
          'transition-all duration-normal ease-smooth',
          // featured: side-by-side on md+, stacked below
          featured ? 'flex-col md:flex-row md:min-h-[300px]' : 'flex-col',
        )}
      >
        {/* Accent bar — always at the very top, absolute so it doesn't affect flex layout */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] z-10 bg-gradient-to-r from-brand-mid via-brand-accent/50 to-transparent"
          aria-hidden="true"
        />

        {/* ── Cover ── */}
        {post.cover_image_url ? (
          <div className={cn(
            'shrink-0 overflow-hidden bg-brand-mid/20',
            featured ? 'w-full md:w-2/5 aspect-[16/9] md:aspect-auto' : 'aspect-[16/9]',
          )}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
            />
          </div>
        ) : (
          <div className={cn(
            'shrink-0 flex items-center justify-center',
            'bg-gradient-to-br from-brand-mid/20 via-brand-dark to-brand-dark',
            featured ? 'w-full md:w-2/5 aspect-[16/9] md:aspect-auto' : 'aspect-[16/9]',
          )}>
            <span className="pixel-text text-pixel-xl text-brand-mid/25 select-none">{'{ }'}</span>
          </div>
        )}

        {/* ── Content ── */}
        <div className={cn(
          'flex flex-col flex-1 min-w-0',
          featured ? 'p-7 md:p-10' : 'p-6',
        )}>
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-caption bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className={cn(
            'font-display text-white mb-3 group-hover:text-brand-accent transition-colors duration-fast',
            featured ? 'text-display-sm' : 'text-heading',
          )}>
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className={cn(
              'text-text-secondary mb-5 flex-1',
              featured ? 'text-body line-clamp-3' : 'text-small line-clamp-2',
            )}>
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand-mid/30 border border-brand-mid/40 text-[9px] font-bold text-brand-accent">
                {post.author.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-caption text-text-muted">{post.author}</span>
            </div>
            <time className="pixel-text text-pixel-sm text-text-muted" dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
          </div>
        </div>

        {/* Hover arrow */}
        <span
          className="absolute bottom-6 right-6 text-brand-accent/0 group-hover:text-brand-accent/50 group-hover:translate-x-0.5 transition-all duration-fast"
          aria-hidden="true"
        >→</span>
      </article>
    </Link>
  );
}
