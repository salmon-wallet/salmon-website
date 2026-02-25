'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  noPadding?: boolean;
  /** Brand hex color (e.g. '#9945FF') applied to border + inset tint on hover. Orange glow is always kept. */
  hoverTint?: string;
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function GlassmorphicCard({
  children,
  className = '',
  hoverGlow = true,
  noPadding = false,
  hoverTint,
}: GlassmorphicCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const buildHover = () => {
    if (!hoverGlow) return { scale: 1.02, y: -4 };

    const orangeGlow = '0 0 40px rgba(255,92,69,0.15), 0 20px 60px rgba(0,0,0,0.3)';

    if (hoverTint) {
      return {
        scale: 1.02,
        y: -4,
        boxShadow: `${orangeGlow}, inset 0 0 60px ${hexToRgba(hoverTint, 0.07)}`,
        borderColor: hexToRgba(hoverTint, 0.35),
      };
    }

    return {
      scale: 1.02,
      y: -4,
      boxShadow: orangeGlow,
      borderColor: 'rgba(255,92,69,0.2)',
    };
  };

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? buildHover() : undefined}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`rounded-xl border border-card-border bg-card-bg backdrop-blur-xl transition-colors ${noPadding ? '' : 'p-6'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
