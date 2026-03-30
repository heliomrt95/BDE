// src/services/blogService.ts

import { Post } from '@/types';

export async function getPosts(): Promise<Post[]> {
  // TODO: replace with Supabase or CMS query
  return [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return null;
}
