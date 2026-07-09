'use client';

import { motion } from 'framer-motion';
import type { RepoCommit } from '@/lib/github';
import { fade, fadeUp, staggerChildren, springy } from './motion';

/* ── 7. Validator: stake flows wallet → node, live Stakewiz stats ── */

interface ValidatorVisualProps {
  apy: number;
  uptime: number;
  activeStake: number;
}

export function ValidatorVisual({ apy, uptime, activeStake }: ValidatorVisualProps) {
  const stats = [
    { label: 'Est. APY', value: `${apy.toFixed(2)}%` },
    { label: 'Uptime', value: `${uptime.toFixed(1)}%` },
    { label: 'Active stake', value: `${Math.round(activeStake).toLocaleString('en-US')} SOL` },
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-5 sm:flex-row sm:items-center sm:gap-8">
      {/* Stake flowing from wallet to node */}
      <div className="flex-1">
        <svg viewBox="0 0 220 64" className="w-full" aria-hidden="true">
          {/* wallet */}
          <rect x="8" y="22" width="26" height="20" rx="5" className="fill-none stroke-[#404962]" strokeWidth="1.5" />
          <circle cx="28" cy="32" r="2" className="fill-[#8a8d98]" />
          {/* link */}
          <line x1="42" y1="32" x2="178" y2="32" className="stroke-[#404962]" strokeWidth="1.5" strokeDasharray="3 4" />
          {/* traveling stake */}
          <motion.circle
            r="3.5"
            cy="32"
            className="fill-accent"
            variants={{
              idle: { cx: 42, opacity: 0.25 },
              active: {
                cx: [42, 178],
                opacity: 1,
                transition: {
                  cx: { duration: 1.8, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 0.3 },
                },
              },
            }}
          />
          {/* validator node */}
          <motion.rect
            x="186"
            y="20"
            width="24"
            height="24"
            rx="6"
            className="fill-accent/15 stroke-accent"
            strokeWidth="1.5"
            variants={{
              idle: { opacity: 0.5, scale: 1 },
              active: {
                opacity: 1,
                scale: [1, 1.08, 1],
                transition: { scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
              },
            }}
            style={{ transformOrigin: '198px 32px' }}
          />
          <motion.circle cx="198" cy="32" r="3" className="fill-accent" variants={fade} />
        </svg>
      </div>

      {/* Live stats */}
      <motion.div variants={staggerChildren} className="flex shrink-0 gap-6 sm:flex-col sm:gap-3">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} transition={springy}>
            <p className="font-mono text-sm font-semibold text-text-primary">{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── 8. Open source: git clone types out, real commits stream in ── */

interface OpenSourceVisualProps {
  commits: RepoCommit[];
}

export function OpenSourceVisual({ commits }: OpenSourceVisualProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="overflow-hidden rounded-lg border border-border-subtle bg-bg-primary/80">
        <div className="flex items-center gap-1.5 border-b border-border-subtle px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-error/60" />
          <span className="h-2 w-2 rounded-full bg-[#e8a33d]/60" />
          <span className="h-2 w-2 rounded-full bg-success/60" />
        </div>
        <div className="space-y-1.5 p-3 font-mono text-[10px] leading-relaxed">
          <p className="flex items-center text-text-secondary">
            <span className="mr-1.5 text-accent">$</span>
            <motion.span
              variants={{
                idle: { clipPath: 'inset(0 100% 0 0)' },
                active: {
                  clipPath: 'inset(0 0% 0 0)',
                  transition: { duration: 0.8, ease: 'linear' },
                },
              }}
              className="whitespace-nowrap"
            >
              git clone github.com/salmon-wallet
            </motion.span>
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-text-secondary/70" />
          </p>
          <motion.div variants={staggerChildren} className="space-y-1 pt-1">
            {commits.map((c) => (
              <motion.p
                key={c.sha}
                variants={fadeUp}
                transition={{ ...springy, delay: 0.7 }}
                className="truncate text-text-tertiary"
              >
                <span className="text-accent">{c.sha}</span> {c.message}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
