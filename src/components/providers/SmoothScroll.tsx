'use client';

import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

// ─── Context ───────────────────────────────────────
// Expose the Lenis instance so any component can
// read scroll position or call scrollTo().
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

// ─── Props ─────────────────────────────────────────
interface SmoothScrollProps {
  children: React.ReactNode;
  /** 0–1+ — lower = slower scroll. Default 1 */
  speed?: number;
}

export default function SmoothScroll({ children, speed = 1 }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: speed,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // ── rAF loop ──
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [speed]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
