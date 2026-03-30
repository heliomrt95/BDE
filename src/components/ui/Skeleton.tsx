// src/components/ui/Skeleton.tsx
// ─────────────────────────────────────────────────────
// Loading skeleton with branded shimmer animation.
// ─────────────────────────────────────────────────────

import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  /** Pre-set shapes */
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'image';
}

const variantClasses: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text:   'h-4 w-3/4 rounded-sm',
  title:  'h-7 w-1/2 rounded-md',
  avatar: 'h-10 w-10 rounded-full',
  card:   'h-48 w-full rounded-lg',
  image:  'aspect-video w-full rounded-lg',
};

export default function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'shimmer',
        variantClasses[variant],
        className,
      )}
    />
  );
}
