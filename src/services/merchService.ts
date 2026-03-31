// src/services/merchService.ts

import { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-shirt MMI',
    description: 'Un tee qui claque. 100% coton bio, coupe unisexe, avec le logo MMI brodé.',
    price: 22,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=TEE',
    status: 'available',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanc', 'Violet'],
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });
    if (error) return MOCK_PRODUCTS;
    return data as Product[];
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data as Product;
  } catch {
    return null;
  }
}
