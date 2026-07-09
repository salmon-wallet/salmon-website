'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

const LABEL_STYLE = {
  font: '600 8px var(--font-mono)',
  letterSpacing: '0.14em',
} as const;

interface DiagramLabels {
  protocols: string;
  wallet: string;
  users: string;
}

/* ── Closed layer: requests pile up in front of a wallet nothing gets through ── */

/** Lanes from each protocol square into the wallet's left edge. */
const CLOSED_LANES = [
  { y0: 28, y1: 54 },
  { y0: 60, y1: 60 },
  { y0: 92, y1: 66 },
] as const;

/** Point at parameter t (0..1) along a closed lane — keeps dots ON the line. */
function lanePoint(lane: (typeof CLOSED_LANES)[number], t: number) {
  return { x: 26 + 98 * t, y: lane.y0 + (lane.y1 - lane.y0) * t };
}

const QUEUE_STOPS = [
  { t: 0.9, opacity: 0.9 },
  { t: 0.8, opacity: 0.65 },
  { t: 0.7, opacity: 0.4 },
] as const;

function ClosedDiagram({ animated, labels }: { animated: boolean; labels: DiagramLabels }) {
  return (
    <svg viewBox="0 0 300 132" className="w-full" aria-hidden="true">
      {/* protocols */}
      {[20, 52, 84].map((y) => (
        <rect key={y} x="10" y={y} width="16" height="16" rx="4" className="fill-none stroke-[#404962]" strokeWidth="1.5" />
      ))}
      {CLOSED_LANES.map((l) => (
        <line key={l.y0} x1="26" y1={l.y0} x2="124" y2={l.y1} className="stroke-[#404962]" strokeWidth="1.5" opacity="0.6" />
      ))}

      {/* the queue: requests waiting on every lane */}
      {CLOSED_LANES.map((lane) =>
        QUEUE_STOPS.map(({ t, opacity }) => {
          const p = lanePoint(lane, t);
          return <circle key={`${lane.y0}-${t}`} cx={p.x} cy={p.y} r="2.5" className="fill-[#8a8d98]" opacity={opacity} />;
        })
      )}
      {animated &&
        CLOSED_LANES.map((lane, i) => {
          const end = lanePoint(lane, 0.62);
          return (
            <motion.circle
              key={lane.y0}
              r="2.5"
              className="fill-[#8a8d98]"
              animate={{ cx: [26, end.x, end.x], cy: [lane.y0, end.y, end.y], opacity: [0.9, 0.9, 0] }}
              transition={{ duration: 2.8, times: [0, 0.5, 1], delay: i * 0.9, repeat: Infinity, repeatDelay: 0.4, ease: 'linear' }}
            />
          );
        })}

      {/* the closed wallet: a box with a lock */}
      <rect x="124" y="38" width="40" height="44" rx="8" className="fill-[#161c2d] stroke-[#404962]" strokeWidth="1.5" />
      <path d="M138 58 v-3 a6 6 0 0 1 12 0 v3" className="fill-none stroke-[#6b6e7b]" strokeWidth="1.5" />
      <rect x="136" y="58" width="16" height="11" rx="2" className="fill-[#6b6e7b]" />

      {/* the other side never connects */}
      <line x1="170" y1="60" x2="204" y2="60" className="stroke-[#404962]" strokeWidth="1.5" strokeDasharray="2 5" opacity="0.35" />
      {[36, 60, 84].map((y) => (
        <circle key={y} cx="264" cy={y} r="6" className="fill-none stroke-[#404962]" strokeWidth="1.5" opacity="0.5" />
      ))}

      {/* labels */}
      <text x="10" y="122" className="fill-[#6b6e7b]" style={LABEL_STYLE}>{labels.protocols}</text>
      <text x="144" y="122" textAnchor="middle" className="fill-[#6b6e7b]" style={LABEL_STYLE}>{labels.wallet}</text>
      <text x="272" y="122" textAnchor="end" className="fill-[#6b6e7b]" style={LABEL_STYLE}>{labels.users}</text>
    </svg>
  );
}

/* ── Open layer: more protocols, flowing through Salmon to users ── */

const IN_LANES = [20, 40, 60, 80, 100] as const;
const OUT_LANES = [36, 60, 84] as const;

function OpenDiagram({ animated, labels }: { animated: boolean; labels: DiagramLabels }) {
  return (
    <svg viewBox="0 0 300 132" className="w-full" aria-hidden="true">
      {/* protocols */}
      {IN_LANES.map((y) => (
        <rect key={y} x="10" y={y - 8} width="16" height="16" rx="4" className="fill-none stroke-accent" strokeWidth="1.5" opacity="0.55" />
      ))}
      {IN_LANES.map((y) => (
        <line key={y} x1="26" y1={y} x2="136" y2={57 + (y - 60) * 0.05} className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3" />
      ))}
      {/* it flows out the other side */}
      {OUT_LANES.map((y) => (
        <line key={y} x1="164" y1="60" x2="256" y2={y} className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3" />
      ))}

      {/* Salmon in the middle, letting everything through */}
      {animated ? (
        <motion.circle
          cx="150"
          cy="60"
          r="15"
          className="fill-accent/15 stroke-accent"
          strokeWidth="1.5"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 60px' }}
        />
      ) : (
        <circle cx="150" cy="60" r="15" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
      )}
      <image href="/images/logo.png" x="141" y="51" width="18" height="18" />

      {/* users, actually reached */}
      {OUT_LANES.map((y) => (
        <circle key={y} cx="264" cy={y} r="6" className="fill-none stroke-accent" strokeWidth="1.5" opacity="0.5" />
      ))}

      {/* traffic passing through */}
      {animated &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="3"
            className="fill-accent"
            animate={{
              cx: [26, 150, 258],
              cy: [IN_LANES[i * 2], 60, OUT_LANES[i]],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.6,
              times: [0, 0.5, 1],
              delay: i * 0.55,
              repeat: Infinity,
              repeatDelay: 0.7,
              ease: 'linear',
              opacity: { duration: 2.6, times: [0, 0.1, 0.9, 1], delay: i * 0.55, repeat: Infinity, repeatDelay: 0.7 },
            }}
          />
        ))}

      {/* labels */}
      <text x="10" y="122" className="fill-[#6b6e7b]" style={LABEL_STYLE}>{labels.protocols}</text>
      <text x="150" y="122" textAnchor="middle" className="fill-accent" style={LABEL_STYLE}>{labels.wallet}</text>
      <text x="272" y="122" textAnchor="end" className="fill-[#6b6e7b]" style={LABEL_STYLE}>{labels.users}</text>
    </svg>
  );
}

/* ── Section: the argument as a before/after contrast ── */

export default function Why() {
  const t = useTranslations('why');
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const closedItems = t.raw('closed.items') as string[];
  const openItems = t.raw('open.items') as string[];

  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {t('heading')}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2 mb-12">
          <ScrollReveal direction="right" duration={1.1}>
            <div className="h-full rounded-2xl border border-border-subtle bg-card-bg/30 p-6 sm:p-8">
              <p className="eyebrow mb-6 text-text-tertiary">{t('closed.label')}</p>
              <ClosedDiagram
                animated={animated}
                labels={{
                  protocols: t('labels.protocols'),
                  wallet: t('labels.closedWallet'),
                  users: t('labels.users'),
                }}
              />
              <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-border-subtle bg-bg-primary/50 px-3 py-2 font-mono text-[10px] tracking-wide text-text-tertiary">
                <span className={`h-1.5 w-1.5 rounded-full bg-text-tertiary ${animated ? 'animate-pulse' : ''}`} />
                {t('closed.status')}
              </div>
              <ul className="mt-6 space-y-3">
                {closedItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-tertiary">
                    <span className="select-none font-mono">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15} duration={1.1}>
            <div className="h-full rounded-2xl border border-accent/25 bg-accent/[0.04] p-6 sm:p-8 shadow-[0_0_60px_rgba(255,92,69,0.06)]">
              <p className="eyebrow mb-6 text-accent">{t('open.label')}</p>
              <OpenDiagram
                animated={animated}
                labels={{
                  protocols: t('labels.protocols'),
                  wallet: 'SALMON',
                  users: t('labels.users'),
                }}
              />
              <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-success/30 bg-bg-primary/50 px-3 py-2 font-mono text-[10px] tracking-wide text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {t('open.status')}
              </div>
              <ul className="mt-6 space-y-3">
                {openItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                    <span className="select-none font-mono text-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <p className="max-w-3xl text-text-secondary leading-relaxed border-l-2 border-accent/50 pl-5">
            {t('kicker')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
