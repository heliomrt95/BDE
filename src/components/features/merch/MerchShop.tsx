'use client';

import { Product } from '@/types/merch';
import { Stagger, StaggerItem } from '@/components/motion/ScrollReveal';
import ProductCard from './ProductCard';

export default function MerchShop({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-widest">VIDE</span>
        <p className="text-brand-light/50 text-sm max-w-xs">
          Aucun article disponible pour l&apos;instant. Reviens bientôt !
        </p>
      </div>
    );
  }

  return (
    <Stagger className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
