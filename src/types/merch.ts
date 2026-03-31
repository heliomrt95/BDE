// src/types/merch.ts

export type ProductStatus = 'available' | 'out_of_stock' | 'coming_soon';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in euros
  image_url: string;
  status: ProductStatus;
  sizes?: string[];
  colors?: string[];
}
