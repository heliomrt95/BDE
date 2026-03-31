// src/app/merch/page.tsx — Merch shop (route: /merch)

import type { Metadata } from 'next';
import { getProducts } from '@/services/merchService';
import SectionTitle from '@/components/ui/SectionTitle';
import { FadeIn, SlideIn } from '@/components/motion/ScrollReveal';
import MerchShop from '@/components/features/merch/MerchShop';

export const metadata: Metadata = {
  title: 'Boutique BDE',
  description:
    'Le merch officiel du BDE MMI Bordeaux — hoodies, tee-shirts, tote bags et éditions limitées.',
};

export default async function MerchPage() {
  const products = await getProducts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.3) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(111,52,139,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(111,52,139,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <FadeIn>
              <SectionTitle pixelLabel="BOUTIQUE" title="Merch BDE" />
              <p className="mt-4 text-brand-light/70 max-w-xl leading-relaxed">
                Le merch officiel du BDE MMI Bordeaux. Porte les couleurs de ta promo —
                hoodies, tees, tote bags et éditions limitées.
              </p>
            </FadeIn>

            <SlideIn from="right" delay={0.1}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-200/70">
                  <span className="text-emerald-300 font-medium">
                    {products.filter((p) => p.status === 'available').length}
                  </span>{' '}
                  articles disponibles
                </span>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
        <MerchShop products={products} />
      </section>

      {/* ── Coming soon banner ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6 md:p-8">
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,214,10,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,214,10,0.6) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Icon */}
              <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 shrink-0">
                <svg
                  className="w-6 h-6 text-brand-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-white text-lg">
                  Paiement en ligne bientôt disponible.
                </p>
                <p className="text-brand-light/60 text-sm mt-0.5">
                  En attendant, commande directement par DM Instagram —{' '}
                  <span className="text-brand-accent">@bde_mmi_bordeaux</span>
                </p>
              </div>

              {/* CTA */}
              <a
                href="https://instagram.com/bde_mmi_bordeaux"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-accent text-brand-dark text-sm font-medium hover:bg-brand-accent/90 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Commander par DM
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
