// src/components/ui/Card.tsx
// ─────────────────────────────────────────────────────
// Generic card shell — glass morphism + subtle lift.
// Composed with Card.Image, Card.Body, Card.Footer.
// ─────────────────────────────────────────────────────

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type CardVariant = 'default' | 'glass' | 'outlined' | 'elevated';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Enables hover lift + glow */
  interactive?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: [
    'bg-surface-raised/60',
    'border border-border',
  ].join(' '),

  glass: [
    'glass',
  ].join(' '),

  outlined: [
    'bg-transparent',
    'border border-border-strong',
  ].join(' '),

  elevated: [
    'bg-surface-raised',
    'shadow-card',
    'border border-border/50',
  ].join(' '),
};

/* ── Root ── */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          'transition-all duration-normal ease-smooth',
          variantClasses[variant],
          interactive && [
            'cursor-pointer',
            'hover:-translate-y-1 hover:shadow-card-hover',
            'hover:border-brand-mid/60',
            'active:translate-y-0 active:shadow-card',
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

/* ── Card.Image ── */
function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden aspect-video', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-slow ease-smooth group-hover:scale-105"
      />
      {/* Gradient scrim at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
    </div>
  );
}
CardImage.displayName = 'CardImage';

/* ── Card.Body ── */
function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
}
CardBody.displayName = 'CardBody';

/* ── Card.Footer ── */
function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('px-5 py-3 border-t border-border flex items-center gap-3', className)}>
      {children}
    </div>
  );
}
CardFooter.displayName = 'CardFooter';

/* ── Compose ── */
export default Object.assign(Card, {
  Image: CardImage,
  Body: CardBody,
  Footer: CardFooter,
});
