'use client';

import { motion } from 'framer-motion';
import { fade, fadeUp, springy } from './motion';

/* Mono row shell used by transaction-like visuals. */
function Row({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-border-subtle bg-bg-primary/60 px-3 py-2.5 ${className}`}
    >
      {children}
    </div>
  );
}

/* ── 01. Create or import: seed words fill in, wallet is ready ── */

const SEED_WORDS = ['orbit', 'canyon', 'velvet', 'harbor', 'signal', 'ember'];

export function CreateVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="grid grid-cols-3 gap-1.5">
        {SEED_WORDS.map((w, i) => (
          <span
            key={w}
            className="relative rounded-md border border-border-subtle bg-bg-primary/60 px-2 py-1.5 text-center font-mono text-[10px]"
          >
            <motion.span
              variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-text-tertiary"
            >
              · · ·
            </motion.span>
            <motion.span
              variants={fade}
              transition={{ ...springy, delay: i * 0.06 }}
              className="text-text-secondary"
            >
              {w}
            </motion.span>
          </span>
        ))}
      </div>
      <motion.p
        variants={fadeUp}
        transition={{ ...springy, delay: 0.45 }}
        className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Wallet ready
      </motion.p>
    </div>
  );
}

/* ── 02. Receive funds: incoming transfer lands, balance updates ── */

export function ReceiveVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 font-mono text-xs">
      <Row>
        <span className="text-text-tertiary">From</span>
        <span className="text-text-secondary">3xQm…8kLp</span>
      </Row>
      <Row>
        <span className="text-text-tertiary">Balance</span>
        <span className="relative flex h-5 items-center justify-end">
          <motion.span
            variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
            className="absolute text-text-tertiary"
          >
            0.00 SOL
          </motion.span>
          <motion.span
            variants={fade}
            transition={{ ...springy, delay: 0.2 }}
            className="font-semibold text-text-primary"
          >
            5.00 SOL
          </motion.span>
        </span>
      </Row>
      <motion.p
        variants={fadeUp}
        transition={{ ...springy, delay: 0.35 }}
        className="px-1 text-[10px] text-success"
      >
        +5.00 SOL received · finalized
      </motion.p>
    </div>
  );
}

/* ── 03. Send a transaction: pending tx confirms, hash appears ── */

export function SendVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 font-mono text-xs">
      <Row>
        <span className="text-text-tertiary">To</span>
        <span className="text-text-secondary">7xKX…9fRt</span>
      </Row>
      <Row>
        <span className="font-semibold text-text-primary">2.4 SOL</span>
        <span className="relative flex h-5 items-center justify-end">
          <motion.span
            variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
            className="absolute flex items-center gap-1.5 text-text-tertiary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
            Pending
          </motion.span>
          <motion.span
            variants={fade}
            transition={{ ...springy, delay: 0.2 }}
            className="flex items-center gap-1.5 text-success"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Confirmed
          </motion.span>
        </span>
      </Row>
      <motion.p
        variants={fadeUp}
        transition={{ ...springy, delay: 0.35 }}
        className="px-1 text-[10px] text-text-tertiary"
      >
        sig 5metKx…2PqA · finalized
      </motion.p>
    </div>
  );
}

/* ── 04. Use the integration: connect request gets approved ── */

export function UseIntegrationVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="rounded-lg border border-border-subtle bg-bg-primary/60 p-3">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 font-mono text-[9px] text-text-secondary">◇</span>
          <div className="font-mono text-[10px] leading-tight">
            <p className="text-text-primary">dapp.example</p>
            <p className="text-text-tertiary">wants to connect</p>
          </div>
        </div>
        <span className="relative flex h-7 items-center">
          <motion.span
            variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center rounded-md bg-accent/90 font-mono text-[10px] font-semibold text-white"
          >
            Connect
          </motion.span>
          <motion.span
            variants={fade}
            transition={{ ...springy, delay: 0.2 }}
            className="flex h-full w-full items-center justify-center gap-1.5 rounded-md border border-success/40 bg-success/10 font-mono text-[10px] font-semibold text-success"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Connected
          </motion.span>
        </span>
      </div>
      <motion.p
        variants={fadeUp}
        transition={{ ...springy, delay: 0.35 }}
        className="px-1 text-center font-mono text-[10px] text-text-tertiary"
      >
        You approve every connection
      </motion.p>
    </div>
  );
}
