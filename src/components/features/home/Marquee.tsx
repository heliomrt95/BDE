// src/components/features/home/Marquee.tsx
// ─────────────────────────────────────────────────────
// Infinite horizontal scrolling band — editorial rhythm
// breaker between hero and content sections.
// ─────────────────────────────────────────────────────

'use client';

const WORDS = ['CRÉATIVITÉ', 'NUMÉRIQUE', 'COMMUNAUTÉ', 'BORDEAUX', 'MMI', 'DESIGN', 'CODE', 'VIDÉO'];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-8 animate-marquee">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-white/[0.07] uppercase tracking-tight whitespace-nowrap">
            {word}
          </span>
          <span className="text-brand-accent/20 text-sm" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative py-6 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top & bottom lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/30 to-transparent" />

      {/* Double track for seamless loop */}
      <div className="flex w-max">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
}
