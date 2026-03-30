// src/app/blog/[slug]/page.tsx — Single blog post (route: /blog/:slug)

import { getPostBySlug } from '@/services/blogService';
import PageWrapper from '@/components/layout/PageWrapper';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <PageWrapper>
      <article>
        <h1>{post.title}</h1>
        {/* MDX or rich text renderer goes here */}
      </article>
    </PageWrapper>
  );
}
