import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  className,
}: ScrollRevealProps) {
  // Content must never depend on IntersectionObserver to become visible.
  // Keeping this wrapper as plain HTML makes visibility the SSR/default state;
  // decorative motion elsewhere on the page remains progressive enhancement.
  return <div className={className}>{children}</div>;
}
