// src/components/ui/Modal.tsx
// ─────────────────────────────────────────────────────
// Accessible dialog — uses <dialog> for native a11y,
// glass overlay, scale-in animation.
// ─────────────────────────────────────────────────────

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Title shown in the modal header */
  title?: string;
  className?: string;
}

export default function Modal({ open, onClose, children, title, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn(
        // Reset dialog defaults
        'p-0 m-auto max-w-lg w-[calc(100%-2rem)]',
        'bg-transparent backdrop:bg-brand-dark/80 backdrop:backdrop-blur-sm',
        // Animation
        'open:animate-scale-in',
        className,
      )}
    >
      <div className="glass rounded-xl overflow-hidden shadow-glow-purple">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-display text-heading text-white">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className={cn(
                'w-8 h-8 flex items-center justify-center rounded-sm',
                'text-text-muted hover:text-white hover:bg-brand-mid/20',
                'transition-colors duration-fast',
                'focus-brand',
              )}
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
}
