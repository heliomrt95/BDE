// src/components/ui/Tag.tsx
// ─────────────────────────────────────────────────────
// Removable tag — used in active filter displays.
// Different from Badge: has a close button.
// ─────────────────────────────────────────────────────

import { cn } from '@/lib/utils/cn';

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export default function Tag({ label, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'bg-brand-accent/15 text-brand-accent',
        'border border-brand-accent/30',
        'px-2.5 py-0.5 rounded-pill',
        'font-pixel text-pixel-sm uppercase tracking-wider',
        'animate-scale-in',
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Supprimer le filtre ${label}`}
          className={cn(
            'w-4 h-4 flex items-center justify-center rounded-full',
            'hover:bg-brand-accent/30 transition-colors duration-fast',
            'focus-brand text-[10px] leading-none',
          )}
        >
          ×
        </button>
      )}
    </span>
  );
}
