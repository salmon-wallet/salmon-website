'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface NumberTickerProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts up to `value` when it scrolls into view.
 * SSR-renders the final value (SEO-safe, no hydration mismatch); the count-up is a
 * post-hydration enhancement. Reduced-motion shows the value immediately.
 */
export default function NumberTicker({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  // Init = value so SSR + first client render match.
  const [display, setDisplay] = useState(value);

  // After hydration, drop to 0 so the count-up has somewhere to start (skipped if reduced-motion).
  useEffect(() => {
    if (!reduce) setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
