'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface MindfolkStoryProps {
  repo: string;
  reroute: string;
  kept: string;
}

const TXT = 'var(--color-text-tertiary)';
const MUTED = 'var(--color-text-secondary)';
const ACCENT = 'var(--color-accent)';
const GREEN = 'rgb(74,222,128)';
const RED = 'rgb(248,113,113)';

/**
 * Mindfolk story, told graphically: a holder's access rides the old path
 * toward the repo, the repo→NFTs leg breaks, and Salmon draws a reroute the
 * dot takes instead — arriving green. Plays on in-view, replays on hover.
 */
export default function MindfolkStory({ repo, reroute, kept }: MindfolkStoryProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const [mounted, setMounted] = useState(false);
  const [playId, setPlayId] = useState(0);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (inView) setPlayId((p) => p + 1);
  }, [inView]);

  const still = prefersReduced || !mounted;
  // still → snap straight to the resolved state (no timeline)
  const at = (d: number) => (still ? 0 : d);
  const dur = (d: number) => (still ? 0 : d);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      ref={ref}
      onMouseEnter={() => !still && setPlayId((p) => p + 1)}
      className="select-none"
    >
      <svg
        viewBox="0 0 400 124"
        className="w-full"
        role="img"
        aria-label={`${repo} — ${reroute} — ${kept}`}
      >
        <g key={playId} className="font-mono" style={{ fontSize: 9 }}>
          {/* Old top lane: holder → repo (stays intact) */}
          <path
            d="M44 54 C 92 46, 140 40, 168 37"
            fill="none"
            stroke={TXT}
            strokeWidth={1.5}
          />

          {/* Broken leg: repo → NFTs snaps */}
          <motion.path
            d="M208 37 C 260 44, 320 50, 350 54"
            fill="none"
            stroke={RED}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ opacity: still ? 0.9 : 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: at(0.9), duration: dur(0.4) }}
          />
          <motion.g
            initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: at(1.05), duration: dur(0.3), ease }}
            style={{ transformOrigin: '279px 45px' }}
          >
            <line x1={274} y1={40} x2={284} y2={50} stroke={RED} strokeWidth={1.6} strokeLinecap="round" />
            <line x1={284} y1={40} x2={274} y2={50} stroke={RED} strokeWidth={1.6} strokeLinecap="round" />
          </motion.g>

          {/* Reroute lane: draws in below, bypassing the repo */}
          <motion.path
            d="M44 62 C 110 76, 150 96, 210 96 L 300 96 C 346 96, 352 72, 352 60"
            fill="none"
            stroke={ACCENT}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: still ? 1 : 0, opacity: still ? 1 : 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: at(1.4), duration: dur(0.9), ease }}
          />

          {/* Repo node */}
          <rect x={168} y={28} width={40} height={18} rx={4} fill="var(--color-bg-secondary)" stroke={MUTED} strokeWidth={1} />
          <text x={188} y={20} textAnchor="middle" style={{ fill: TXT }}>
            {repo}
          </text>

          {/* Holder node */}
          <circle cx={36} cy={56} r={7} fill="none" stroke={MUTED} strokeWidth={1.5} />
          <circle cx={36} cy={56} r={2.5} fill={MUTED} />
          <text x={36} y={82} textAnchor="middle" style={{ fill: TXT }}>
            Holder
          </text>

          {/* NFTs node — restores to green on arrival */}
          <motion.circle
            cx={360}
            cy={56}
            r={9}
            fill="none"
            strokeWidth={1.8}
            initial={{ stroke: still ? GREEN : MUTED }}
            animate={{ stroke: GREEN }}
            transition={{ delay: at(2.7), duration: dur(0.4) }}
          />
          <motion.path
            d="M356 56 l3 3 l5 -6"
            fill="none"
            stroke={GREEN}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: still ? 1 : 0, pathLength: still ? 1 : 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ delay: at(2.85), duration: dur(0.3) }}
          />
          <text x={360} y={82} textAnchor="middle" style={{ fill: TXT }}>
            NFTs
          </text>

          {/* Reroute label */}
          <motion.text
            x={150}
            y={116}
            textAnchor="middle"
            style={{ fill: ACCENT }}
            initial={{ opacity: still ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: at(1.7), duration: dur(0.4) }}
          >
            {reroute}
          </motion.text>

          {/* Kept caption near NFTs */}
          <motion.text
            x={398}
            y={116}
            textAnchor="end"
            style={{ fill: GREEN }}
            initial={{ opacity: still ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: at(2.9), duration: dur(0.4) }}
          >
            {kept}
          </motion.text>

          {/* Traveling dot: tries the top, diverts to the reroute, arrives */}
          <motion.circle
            r={4}
            fill={ACCENT}
            initial={{ cx: 40, cy: 56, opacity: still ? 0 : 1 }}
            animate={{
              cx: [40, 120, 162, 214, 300, 356],
              cy: [56, 42, 76, 96, 96, 56],
              opacity: still ? 0 : [1, 1, 1, 1, 1, 1],
            }}
            transition={{
              delay: at(1.95),
              duration: dur(1.05),
              times: [0, 0.28, 0.42, 0.55, 0.82, 1],
              ease: 'easeInOut',
            }}
          />
        </g>
      </svg>
    </div>
  );
}
