'use client';

// Feature component: merch product card

import { Product, ProductStatus } from '@/types/merch';
import { cn } from '@/lib/utils/cn';

const STATUS_CONFIG: Record<ProductStatus, { label: string; badgeClass: string; imageClass: string }> = {
  available: {
    label: 'Disponible',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    imageClass: 'bg-emerald-950/40',
  },
  out_of_stock: {
    label: 'Épuisé',
    badgeClass: 'bg-red-500/20 text-red-300 border border-red-500/30',
    imageClass: 'bg-red-950/40',
  },
  coming_soon: {
    label: 'Bientôt',
    badgeClass: 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30',
    imageClass: 'bg-brand-accent/5',
  },
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { label: statusLabel, badgeClass, imageClass } = STATUS_CONFIG[product.status];
  const isUnavailable = product.status !== 'available';

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'bg-brand-dark border border-brand-mid/20',
        'transition-all duration-300 ease-out',
        'hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-mid/40',
      )}
    >
      {/* Image */}
      <div className={cn('relative aspect-square overflow-hidden', imageClass)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105',
            isUnavailable && 'opacity-60',
          )}
        />

        {/* Out of stock overlay */}
        {product.status === 'out_of_stock' && (
          <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-[1px]" />
        )}

        {/* Status badge */}
        <span
          className={cn(
            'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest',
            'font-pixel backdrop-blur-sm',
            badgeClass,
          )}
        >
          {statusLabel}
        </span>

        {/* Limited edition ribbon */}
        {product.id === '5' && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded bg-brand-accent text-brand-dark text-[9px] font-pixel uppercase tracking-widest">
            #Limité
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base text-white leading-tight">{product.name}</h3>
          <span className="font-display text-lg text-brand-accent shrink-0 tabular-nums">
            {product.price}&nbsp;€
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-brand-light/60 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Sizes */}
        {product.sizes && (
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-brand-mid/20 text-brand-light/70 border border-brand-mid/30"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Colors */}
        {product.colors && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-brand-light/40 uppercase tracking-wider">Coloris</span>
            <span className="text-[11px] text-brand-light/60">
              {product.colors.join(' · ')}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA with tooltip */}
        <div className="relative group/btn">
          <button
            disabled
            title="Bientôt disponible"
            className={cn(
              'w-full px-4 py-2.5 rounded-xl text-sm font-medium',
              'bg-brand-accent text-brand-dark',
              'cursor-not-allowed opacity-80',
              'transition-opacity duration-200',
            )}
          >
            Ajouter au panier
          </button>

          {/* Tooltip */}
          <div
            role="tooltip"
            className={cn(
              'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10',
              'px-3 py-1.5 rounded-lg bg-brand-dark border border-brand-mid/40',
              'text-brand-light/80 text-xs whitespace-nowrap pointer-events-none',
              'opacity-0 translate-y-1',
              'group-hover/btn:opacity-100 group-hover/btn:translate-y-0',
              'transition-all duration-200',
            )}
          >
            Bientôt disponible
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-dark" />
          </div>
        </div>
      </div>
    </article>
  );
}
