import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  /** Full-bleed sections (hero) bypass max-width */
  fullBleed?: boolean;
}

export default function PageWrapper({ children, className, fullBleed = false }: PageWrapperProps) {
  return (
    <main
      className={cn(
        'min-h-screen',
        !fullBleed && 'max-w-7xl mx-auto px-5 md:px-8',
        className,
      )}
    >
      {children}
    </main>
  );
}
