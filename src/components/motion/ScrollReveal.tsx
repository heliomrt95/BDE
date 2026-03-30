'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// ─── Shared defaults ───────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as const;
const DURATION = 0.6;

// ─── FadeIn ────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Override travel distance (px). Default 30 */
  y?: number;
}

export function FadeIn({ children, className, delay = 0, y = 30 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: DURATION, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Staggered container ───────────────────────────
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrap each child inside Stagger with this
export function StaggerItem({ children, className, y = 30 }: { children: React.ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ParallaxLayer ─────────────────────────────────
// Subtle vertical offset driven by scroll progress.
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Shift range in px. Default 60 */
  offset?: number;
}

export function ParallaxLayer({ children, className, offset = 60 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── Scale reveal ──────────────────────────────────
interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleReveal({ children, className, delay = 0 }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: DURATION, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
