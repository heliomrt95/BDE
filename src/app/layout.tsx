// src/app/layout.tsx
import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import SmoothScroll from '@/components/providers/SmoothScroll';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BDE MMI Bordeaux',
    template: '%s — BDE MMI Bordeaux',
  },
  description: 'Le site officiel du BDE du BUT MMI de Bordeaux',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-body bg-brand-dark text-white antialiased overflow-x-hidden">
        <SmoothScroll speed={1}>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
