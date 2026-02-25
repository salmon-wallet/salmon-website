'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
}

export default function GradientButton({
  children,
  variant = 'primary',
  href,
  className = '',
}: GradientButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = href ? 'a' : 'button';

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer';

  const variantClasses =
    variant === 'primary'
      ? 'text-white bg-gradient-to-r from-accent to-accent-end hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,92,69,0.3)]'
      : 'text-white border border-border-subtle bg-transparent hover:bg-white/5 hover:border-white/25';

  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.04, y: -1 }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : { scale: 0.97 }
      }
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      <Tag
        {...(href
          ? {
              href,
              ...(href.startsWith('http') || href.startsWith('//')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {}),
            }
          : {})}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
