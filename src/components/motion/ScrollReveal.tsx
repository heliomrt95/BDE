'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// ─── Shared defaults ───────────────────────────────
// expo-out: confident, natural deceleration — beats the generic cubic-bezier ease
const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.65;

// ─── FadeIn ────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Override travel distance (px). Default 24 */
  y?: number;
}

export function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: shouldReduce ? 0 : DURATION, ease: EASE, delay: shouldReduce ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn — horizontal reveal ───────────────────
interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction: 'left' | 'right'. Default 'left' */
  from?: 'left' | 'right';
  /** Travel distance in px. Default 32 */
  x?: number;
}

export function SlideIn({ children, className, delay = 0, from = 'left', x = 32 }: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const xVal = from === 'left' ? -x : x;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: shouldReduce ? 0 : xVal },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: shouldReduce ? 0 : DURATION, ease: EASE, delay: shouldReduce ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ─────────────────────────────
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{
        staggerChildren: shouldReduce ? 0 : stagger,
        delayChildren: shouldReduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrap each direct child of Stagger with this
export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: shouldReduce ? 0 : DURATION, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ParallaxLayer ─────────────────────────────────
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Shift range in px. Default 50 */
  offset?: number;
}

export function ParallaxLayer({ children, className, offset = 50 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [offset, -offset]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── ScaleReveal ───────────────────────────────────
interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleReveal({ children, className, delay = 0 }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.96 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: shouldReduce ? 0 : DURATION, ease: EASE, delay: shouldReduce ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
