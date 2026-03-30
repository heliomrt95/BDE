// src/components/ui/Button.tsx
// ─────────────────────────────────────────────────────
// Brand button with 4 variants, 3 sizes, glow states.
// Uses Tailwind only — no inline styles.
// ─────────────────────────────────────────────────────

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Adds a subtle glow effect on hover (use sparingly) */
  glow?: boolean;
}

/* ── Size classes ── */
const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-small rounded-sm gap-1.5',
  md: 'px-5 py-2.5 text-body rounded-md gap-2',
  lg: 'px-7 py-3.5 text-subheading rounded-lg gap-2.5',
};

/* ── Variant classes ── */
const variants: Record<Variant, string> = {
  // Solid purple — main CTA
  primary: [
    'bg-brand-mid text-white',
    'hover:bg-[#8244a3] active:bg-[#5d2e78]',
    'shadow-inner-glow',
  ].join(' '),

  // Outlined — secondary actions
  secondary: [
    'bg-transparent text-brand-light',
    'border border-border-strong',
    'hover:bg-brand-mid/10 hover:border-brand-light/40',
    'active:bg-brand-mid/20',
  ].join(' '),

  // Ghost — minimal, for toolbars / nav
  ghost: [
    'bg-transparent text-text-secondary',
    'hover:bg-brand-mid/10 hover:text-white',
    'active:bg-brand-mid/20',
  ].join(' '),

  // Yellow accent — high-emphasis, rare usage
  accent: [
    'bg-brand-accent text-brand-dark font-medium',
    'hover:bg-[#ffe14d] active:bg-[#e6c009]',
    'shadow-inner-glow',
  ].join(' '),
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', glow = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium',
          'transition-all duration-normal ease-smooth',
          'select-none whitespace-nowrap',
          'focus-brand',
          // Disabled
          'disabled:opacity-40 disabled:pointer-events-none',
          // Size & variant
          sizes[size],
          variants[variant],
          // Optional glow
          glow && variant === 'primary' && 'hover:shadow-glow-purple',
          glow && variant === 'accent'  && 'hover:shadow-glow-accent',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
