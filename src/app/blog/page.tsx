// src/app/blog/page.tsx — Blog index (route: /blog)

import type { Metadata } from 'next';
import { getPosts } from '@/services/blogService';
import PostCard from '@/components/features/blog/PostCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, retours d\'expérience et conseils du BDE MMI Bordeaux.',
};

export const revalidate = 60; // revalidate every minute

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.35) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(111,52,139,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(111,52,139,0.5) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <FadeIn>
            <SectionTitle pixelLabel="Actualités" title="Le Blog BDE" />
            <p className="mt-4 text-body text-text-secondary max-w-xl">
              Retours d&apos;événements, conseils, actu de la promo — tout ce qui se passe au MMI.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24 space-y-12">

        {posts.length === 0 ? (
          <FadeIn>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="pixel-text text-pixel-xl text-brand-mid/30 mb-4">{'{ }'}</span>
              <p className="text-body text-text-secondary">Aucun article pour l&apos;instant.</p>
            </div>
          </FadeIn>
        ) : (
          <>
            {/* ── Featured post ── */}
            {featured && (
              <FadeIn>
                <PostCard post={featured} featured />
              </FadeIn>
            )}

            {/* ── Rest of posts ── */}
            {rest.length > 0 && (
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
                {rest.map((post) => (
                  <StaggerItem key={post.id}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </>
        )}
      </div>
    </>
  );
}
