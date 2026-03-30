// src/components/ui/Input.tsx
// ─────────────────────────────────────────────────────
// Controlled text input — branded focus ring, error
// states, optional icon slot.
// ─────────────────────────────────────────────────────

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  /** Icon or prefix element rendered inside the input */
  leftSlot?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftSlot, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-small font-medium text-text-secondary"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {leftSlot && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftSlot}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              // Base
              'w-full bg-surface-raised/60 text-white',
              'border border-border rounded-md',
              'px-4 py-2.5 text-body',
              'placeholder:text-text-muted',
              // Transitions
              'transition-all duration-fast ease-smooth',
              // Focus
              'focus:outline-none focus:border-brand-mid focus:shadow-glow-purple',
              'focus:bg-surface-raised',
              // Error
              error && 'border-red-400/60 focus:border-red-400 focus:shadow-[0_0_20px_rgba(248,113,113,0.2)]',
              // Left slot padding
              leftSlot && 'pl-10',
              // Disabled
              'disabled:opacity-40 disabled:cursor-not-allowed',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            {...props}
          />
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p id={`${id}-hint`} className="text-caption text-text-muted">
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={`${id}-error`} role="alert" className="text-caption text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
