// src/components/ui/Badge.tsx
// ─────────────────────────────────────────────────────
// Tag/filter badge — used for event categories, blog
// tags, filter chips on the events page, etc.
// ─────────────────────────────────────────────────────

import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'accent' | 'outline' | 'bde' | 'university' | 'bordeaux';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
  /** Smaller size for inline usage */
  compact?: boolean;
  /** Makes it clickable (for filters) */
  interactive?: boolean;
  /** Active state for filter chips */
  active?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:    'bg-brand-mid/20 text-brand-light border-brand-mid/30',
  accent:     'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
  outline:    'bg-transparent text-text-secondary border-border-strong',
  // Semantic variants for event filters
  bde:        'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
  university: 'bg-brand-mid/25 text-brand-light border-brand-mid/40',
  bordeaux:   'bg-[#c0392b]/15 text-[#e8a09a] border-[#c0392b]/30',
};

const activeVariantClasses: Record<BadgeVariant, string> = {
  default:    'bg-brand-mid text-white border-brand-mid',
  accent:     'bg-brand-accent text-brand-dark border-brand-accent',
  outline:    'bg-brand-light text-brand-dark border-brand-light',
  bde:        'bg-brand-accent text-brand-dark border-brand-accent',
  university: 'bg-brand-mid text-white border-brand-mid',
  bordeaux:   'bg-[#c0392b] text-white border-[#c0392b]',
};

export default function Badge({
  label,
  variant = 'default',
  compact = false,
  interactive = false,
  active = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        // Base
        'inline-flex items-center font-medium border',
        'font-pixel uppercase tracking-wider',
        'transition-all duration-fast ease-smooth',
        // Size
        compact
          ? 'px-2 py-0.5 text-pixel-sm rounded-sm'
          : 'px-3 py-1 text-pixel-sm rounded-sm',
        // State
        active
          ? activeVariantClasses[variant]
          : variantClasses[variant],
        // Interactive
        interactive && !active && 'cursor-pointer hover:bg-brand-mid/30 hover:border-brand-mid/50',
        interactive && active  && 'cursor-pointer shadow-glow-soft',
        interactive && 'focus-brand',
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}
