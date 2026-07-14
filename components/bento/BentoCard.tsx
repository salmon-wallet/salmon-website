'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface BentoCardProps {
  title: string;
  description?: string;
  eyebrow?: string;
  visual: ReactNode;
  className?: string;
}

/**
 * Two-state capability card (Clerk-style): the visual area renders the
 * feature idle, then "executes" it when active. Activation is hover on
 * pointer devices and in-view on touch devices. With reduced motion (or
 * before hydration) the card stays in its final, fully-populated state.
 */
export default function BentoCard({
  title,
  description,
  eyebrow,
  visual,
  className = '',
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const active =
    prefersReducedMotion || !mounted ? true : canHover ? hovered : inView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={active ? 'active' : 'idle'}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-card-border bg-card-bg backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-accent/25 hover:shadow-[0_0_40px_rgba(255,92,69,0.12)] ${className}`}
    >
      {/* Visual keeps a fixed height so every card's title starts on the same baseline */}
      <div className="relative min-h-44 overflow-hidden border-b border-border-subtle/60 bg-bg-secondary/40 p-5">
        {visual}
      </div>
      <div className="flex-1 p-5">
        {eyebrow && (
          <span className="mb-1.5 block font-mono text-sm text-accent">{eyebrow}</span>
        )}
        <h3 className={`text-base font-semibold ${description ? 'mb-1' : ''}`}>{title}</h3>
        {description && (
          <p className="text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
