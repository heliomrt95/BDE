// src/services/merchService.ts

import { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hoodie BDE',
    description: 'Le classique du BDE. Chaud, comfy, et stylé — parfait pour les soirées fraîches de Bordeaux.',
    price: 45,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=HOODIE',
    status: 'available',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Violet', 'Noir'],
  },
  {
    id: '2',
    name: 'T-shirt MMI',
    description: 'Un tee qui claque. 100% coton bio, coupe unisexe, avec le logo MMI brodé.',
    price: 22,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=TEE',
    status: 'available',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanc', 'Violet'],
  },
  {
    id: '3',
    name: 'Tote Bag BDE',
    description: 'Pour tes courses, tes cours, ou juste poser une vibe. Coton épais, sérigraphie recto-verso.',
    price: 15,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=TOTE',
    status: 'available',
    colors: ['Naturel', 'Noir'],
  },
  {
    id: '4',
    name: 'Casquette MMI',
    description: 'Six-panel brodée, ajustable — pour les journées studio ou les matins difficiles.',
    price: 28,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=CAP',
    status: 'coming_soon',
    colors: ['Violet', 'Beige'],
  },
  {
    id: '5',
    name: 'Sweat Édition Limitée',
    description: 'Collab avec un illustrateur MMI. Sérigraphie artisanale, tirage numéroté à 50 exemplaires.',
    price: 50,
    imageUrl: 'https://placehold.co/400x400/6f348b/ffd60a?text=LIMITED',
    status: 'coming_soon',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir'],
  },
  {
    id: '6',
    name: 'Carnet de Notes MMI',
    description: 'A5, couverture rigide, 120 pages pointillées. Pour sketcher tes idées en cours.',
    price: 12,
    imageUrl: 'https://placehold.co/400x400/43245c/ffd60a?text=CARNET',
    status: 'out_of_stock',
  },
];

export async function getProducts(): Promise<Product[]> {
  // TODO: replace with Supabase query
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}
