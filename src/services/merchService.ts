// src/services/merchService.ts

import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  // TODO: replace with Supabase or Stripe query
  return [];
}

export async function getProductById(id: string): Promise<Product | null> {
  return null;
}
