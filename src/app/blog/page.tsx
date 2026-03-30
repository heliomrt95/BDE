// src/app/blog/page.tsx — Blog index (route: /blog)

import { getPosts } from '@/services/blogService';
import PostCard from '@/components/features/blog/PostCard';
import PageWrapper from '@/components/layout/PageWrapper';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageWrapper>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
