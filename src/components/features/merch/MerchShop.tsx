'use client';

// Client component: filter bar + product grid

import { useState } from 'react';
import { Product, ProductStatus } from '@/types/merch';
import { cn } from '@/lib/utils/cn';
import { Stagger, StaggerItem } from '@/components/motion/ScrollReveal';
import ProductCard from './ProductCard';

type FilterValue = 'all' | ProductStatus;

const FILTERS: { value: FilterValue; label: string; hoverClass: string }[] = [
  { value: 'all', label: 'Tout voir', hoverClass: 'hover:bg-brand-mid/30 hover:text-brand-light hover:border-brand-mid/40' },
  { value: 'available', label: 'Disponible', hoverClass: 'hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/20' },
  { value: 'coming_soon', label: 'Bientôt', hoverClass: 'hover:bg-brand-accent/10 hover:text-brand-accent hover:border-brand-accent/20' },
  { value: 'out_of_stock', label: 'Épuisé', hoverClass: 'hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20' },
];

export default function MerchShop({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered =
    filter === 'all' ? products : products.filter((p) => p.status === filter);

  const countFor = (value: FilterValue) =>
    value === 'all' ? products.length : products.filter((p) => p.status === value).length;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {FILTERS.map(({ value, label, hoverClass }) => {
          const count = countFor(value);
          const active = filter === value;
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                'transition-all duration-200',
                active
                  ? 'bg-brand-accent text-brand-dark shadow-[0_0_12px_rgba(255,214,10,0.3)]'
                  : cn('bg-brand-mid/10 text-brand-light/70 border border-brand-mid/30', hoverClass),
              )}
            >
              {label}
              <span
                className={cn(
                  'text-[10px] font-pixel px-1.5 py-0.5 rounded-full',
                  active ? 'bg-brand-dark/20 text-brand-dark' : 'bg-brand-mid/30 text-brand-light/50',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <Stagger
          key={filter}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {filtered.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-widest">
            VIDE
          </span>
          <p className="text-brand-light/50 text-sm max-w-xs">
            Aucun article dans cette catégorie pour l&apos;instant. Reviens bientôt !
          </p>
        </div>
      )}
    </div>
  );
}
