// src/types/blog.ts — snake_case to match Supabase columns

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string; // Markdown
  author: string;
  tags: string[];
  cover_image_url?: string;
  published_at: string; // ISO 8601
  created_at?: string;
}

export type PostInsert = Omit<Post, 'id' | 'created_at'>;
