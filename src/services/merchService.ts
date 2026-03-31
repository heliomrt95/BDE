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
  // TODO: replace with Supabase query
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}
