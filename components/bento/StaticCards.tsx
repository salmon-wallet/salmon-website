'use client';

import { motion } from 'framer-motion';
import { fade, fadeUp, staggerChildren, springy } from './motion';

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

/* ── 1. Send & receive: pending tx confirms, hash appears ── */

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

/* ── 2. Swap: amounts fill in, arrow flips, rate appears ── */

function TokenAmount({ filled, empty, delay }: { filled: string; empty: string; delay: number }) {
  return (
    <span className="relative flex h-4 items-center justify-end">
      <motion.span
        variants={{ idle: { opacity: 1 }, active: { opacity: 0 } }}
        transition={{ duration: 0.25 }}
        className="absolute text-text-tertiary"
      >
        {empty}
      </motion.span>
      <motion.span
        variants={fade}
        transition={{ ...springy, delay }}
        className="font-semibold text-text-primary"
      >
        {filled}
      </motion.span>
    </span>
  );
}

export function SwapVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 font-mono text-xs">
      <Row>
        <span className="flex items-center gap-2 text-text-secondary">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[9px] font-bold text-accent">S</span>
          SOL
        </span>
        <TokenAmount empty="0.00" filled="12.50" delay={0.15} />
      </Row>
      <div className="flex justify-center">
        <motion.span
          variants={{ idle: { rotate: 0 }, active: { rotate: 180 } }}
          transition={springy}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-border-subtle bg-bg-primary/60 text-text-secondary"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
          </svg>
        </motion.span>
      </div>
      <Row>
        <span className="flex items-center gap-2 text-text-secondary">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-text-secondary">U</span>
          USDC
        </span>
        <TokenAmount empty="0.00" filled="2,431.88" delay={0.3} />
      </Row>
      <motion.p
        variants={fadeUp}
        transition={{ ...springy, delay: 0.45 }}
        className="px-1 text-center text-[10px] text-text-tertiary"
      >
        1 SOL ≈ 194.55 USDC
      </motion.p>
    </div>
  );
}

/* ── 3. Self-custody: seed blurs out, padlock closes ── */

const SEED_WORDS = ['orbit', 'canyon', 'velvet', 'harbor', 'signal', 'ember'];

export function CustodyVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-3">
      <div className="grid grid-cols-3 gap-1.5">
        {SEED_WORDS.map((w, i) => (
          <motion.span
            key={w}
            variants={{
              idle: { filter: 'blur(0px)', opacity: 1 },
              active: { filter: 'blur(5px)', opacity: 0.45 },
            }}
            transition={{ ...springy, delay: i * 0.04 }}
            className="rounded-md border border-border-subtle bg-bg-primary/60 px-2 py-1.5 text-center font-mono text-[10px] text-text-secondary"
          >
            {w}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex h-6 w-5 flex-col items-center">
          {/* shackle: lifted while open, drops shut on activate */}
          <motion.span
            variants={{ idle: { y: -3, rotate: -12 }, active: { y: 0, rotate: 0 } }}
            transition={springy}
            className="h-2.5 w-3 rounded-t-full border-2 border-b-0 border-accent"
          />
          <span className="h-3 w-4 rounded-[3px] bg-accent" />
        </span>
        <motion.span
          variants={fade}
          transition={{ ...springy, delay: 0.25 }}
          className="font-mono text-[10px] uppercase tracking-wider text-text-secondary"
        >
          Encrypted on this device
        </motion.span>
      </div>
    </div>
  );
}

/* ── 4. NFTs: empty tiles fill with brand gradients ── */

const NFT_TILES = [
  'from-accent/70 to-accent-end/70',
  'from-accent-soft/60 to-accent/40',
  'from-[#3a4a7a]/80 to-[#232c4a]/80',
  'from-accent-end/60 to-[#3a2030]/80',
];

export function NftsVisual() {
  return (
    <motion.div variants={staggerChildren} className="grid h-full grid-cols-2 place-content-center gap-2">
      {NFT_TILES.map((g, i) => (
        <div key={i} className="relative aspect-[5/3] overflow-hidden rounded-lg border border-border-subtle bg-bg-primary/60">
          <motion.div
            variants={{
              idle: { opacity: 0, scale: 1.06 },
              active: { opacity: 1, scale: 1 },
            }}
            transition={springy}
            className={`absolute inset-0 bg-gradient-to-br ${g}`}
          />
        </div>
      ))}
    </motion.div>
  );
}

/* ── 5. dApps: connect request gets approved ── */

export function DappsVisual() {
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

/* ── 6. Solana + Bitcoin: chains light up with their networks ── */

const CHAINS = [
  { name: 'Solana', dot: 'bg-accent', networks: 'Mainnet · Devnet' },
  { name: 'Bitcoin', dot: 'bg-[#f7931a]', networks: 'Mainnet · Testnet' },
];

export function ChainsVisual() {
  return (
    <motion.div variants={staggerChildren} className="flex h-full flex-col justify-center gap-2.5">
      {CHAINS.map((c) => (
        <motion.div
          key={c.name}
          variants={{
            idle: { opacity: 0.45 },
            active: { opacity: 1 },
          }}
          transition={springy}
          className="flex items-center justify-between rounded-lg border border-border-subtle bg-bg-primary/60 px-3 py-2.5"
        >
          <span className="flex items-center gap-2 text-xs font-medium text-text-primary">
            <span className={`h-2 w-2 rounded-full ${c.dot}`} />
            {c.name}
          </span>
          <motion.span variants={fadeUp} transition={springy} className="font-mono text-[10px] text-text-tertiary">
            {c.networks}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}
