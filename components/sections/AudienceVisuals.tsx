'use client';

import { motion } from 'framer-motion';
import { fade, fadeUp, staggerChildren, springy } from '@/components/bento/motion';

/* ── 1. Emerging protocols: diverse protocols route into Salmon ── */
const PROTOCOLS = ['New DeFi primitive', 'Consumer app', 'Network layer'];

export function ProtocolsVisual() {
  return (
    <motion.div
      variants={staggerChildren}
      className="flex h-full flex-col justify-center gap-2 font-mono text-[11px]"
    >
      {PROTOCOLS.map((label) => (
        <motion.div
          key={label}
          variants={fadeUp}
          transition={springy}
          className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-primary/60 px-3 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-text-secondary">{label}</span>
          <span className="ml-auto text-text-tertiary">→ Salmon</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── 2. NFT communities: tiles fill with brand gradients ── */
const TILES = [
  'from-accent/70 to-accent-end/70',
  'from-accent-soft/60 to-accent/40',
  'from-[#3a4a7a]/80 to-[#232c4a]/80',
  'from-accent-end/60 to-[#3a2030]/80',
];

export function NftCommunitiesVisual() {
  return (
    <motion.div
      variants={staggerChildren}
      className="grid h-full grid-cols-4 place-content-center gap-2"
    >
      {TILES.map((g, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-lg border border-border-subtle bg-bg-primary/60"
        >
          <motion.div
            variants={{ idle: { opacity: 0, scale: 1.1 }, active: { opacity: 1, scale: 1 } }}
            transition={springy}
            className={`absolute inset-0 bg-gradient-to-br ${g}`}
          />
        </div>
      ))}
    </motion.div>
  );
}

/* ── 3. Security tools: padlock drops shut ── */
export function SecurityToolsVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <span className="relative flex h-9 w-7 flex-col items-center">
        <motion.span
          variants={{ idle: { y: -4, rotate: -14 }, active: { y: 0, rotate: 0 } }}
          transition={springy}
          className="h-4 w-4.5 rounded-t-full border-2 border-b-0 border-accent"
          style={{ width: '1.1rem' }}
        />
        <span className="h-4.5 w-5 rounded-[3px] bg-accent" style={{ height: '1.1rem' }} />
      </span>
      <motion.span
        variants={fade}
        transition={{ ...springy, delay: 0.2 }}
        className="font-mono text-[11px] uppercase tracking-wider text-text-secondary"
      >
        Safer signing
      </motion.span>
    </div>
  );
}

/* ── 4. Builders: integration deploys and goes live ── */
export function BuildersVisual() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="rounded-lg border border-border-subtle bg-bg-primary/70 p-3 font-mono text-[11px]">
        <p className="text-text-tertiary">$ salmon integrate</p>
        <span className="relative mt-2 flex h-5 items-center">
          <motion.span
            variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
            className="absolute flex items-center gap-1.5 text-text-tertiary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
            building…
          </motion.span>
          <motion.span
            variants={fade}
            transition={{ ...springy, delay: 0.25 }}
            className="flex items-center gap-1.5 text-success"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            live · wallet is the gateway
          </motion.span>
        </span>
      </div>
    </div>
  );
}

/* ── 5. Aligned communities: visible progress builds up ── */
const BARS = ['40%', '62%', '50%', '78%', '68%', '92%'];

export function AlignedVisual() {
  return (
    <motion.div
      variants={staggerChildren}
      className="flex h-full items-end justify-center gap-2 px-2 pb-1"
    >
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          variants={{ idle: { scaleY: 0.15, opacity: 0.4 }, active: { scaleY: 1, opacity: 1 } }}
          transition={springy}
          style={{ height: h }}
          className="w-3 origin-bottom rounded-t bg-gradient-to-t from-accent/40 to-accent"
        />
      ))}
    </motion.div>
  );
}
