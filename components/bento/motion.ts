import type { Variants, Transition } from 'framer-motion';

/** Shared two-state variants for bento card children. */
export const fadeUp: Variants = {
  idle: { opacity: 0, y: 8 },
  active: { opacity: 1, y: 0 },
};

export const fade: Variants = {
  idle: { opacity: 0 },
  active: { opacity: 1 },
};

/** Container that staggers its children when the card activates. */
export const staggerChildren: Variants = {
  idle: {},
  active: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const springy: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};
