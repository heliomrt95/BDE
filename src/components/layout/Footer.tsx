// src/components/layout/Footer.tsx
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { NAV_ITEMS } from '@/config/nav';

export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="pixel-text text-pixel-xl text-brand-accent">BDE</span>
            <p className="text-small text-text-muted max-w-xs">
              Bureau des Étudiants du BUT MMI — Université Bordeaux Montaigne.
              La créativité, le numérique, la communauté.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="pixel-text text-pixel-sm text-text-muted uppercase mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-text-secondary hover:text-white transition-colors duration-fast"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="pixel-text text-pixel-sm text-text-muted uppercase mb-4">Réseaux</h3>
            <div className="flex flex-col gap-2">
              {SITE_CONFIG.socials.instagram && (
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-text-secondary hover:text-brand-accent transition-colors duration-fast"
                >
                  Instagram
                </a>
              )}
              {SITE_CONFIG.socials.linkedin && (
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-text-secondary hover:text-brand-accent transition-colors duration-fast"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-muted">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Fait avec passion par les étudiants MMI.
          </p>
          <p className="pixel-text text-pixel-sm text-text-muted">
            &lt;/&gt; WITH LOVE
          </p>
        </div>
      </div>
    </footer>
  );
}
