// src/types/blog.ts

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / MDX
  author: string;
  publishedAt: string; // ISO 8601
  tags: string[];
  coverImageUrl?: string;
}
