// src/components/ui/SectionTitle.tsx
// ─────────────────────────────────────────────────────
// Section heading with experimental accent — P22 Cusp
// font + pixel sub-label + gradient underline.
// ─────────────────────────────────────────────────────

import { cn } from '@/lib/utils/cn';

interface SectionTitleProps {
  /** Main heading text (P22 Cusp) */
  title: string;
  /** Small pixel-font label above the title */
  pixelLabel?: string;
  /** Alignment */
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  title,
  pixelLabel,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {/* Pixel sub-label */}
      {pixelLabel && (
        <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.15em]">
          {pixelLabel}
        </span>
      )}

      {/* Main title */}
      <h2
        className={cn(
          'font-display text-display-md text-white text-balance',
          // Yellow accent dot at the end
          "after:content-['.'] after:text-brand-accent after:ml-0.5",
        )}
      >
        {title}
      </h2>

      {/* Gradient rule */}
      <div
        className={cn(
          'h-[2px] mt-1 rounded-full',
          'bg-gradient-to-r from-brand-mid via-brand-accent/60 to-transparent',
          align === 'center' ? 'w-32' : 'w-24',
        )}
      />
    </div>
  );
}
