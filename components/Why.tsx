'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

/* ── Closed layer: protocols converge on a gate; the dot never gets through ── */

function ClosedDiagram({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 300 120" className="w-full" aria-hidden="true">
      {[12, 52, 92].map((y) => (
        <rect key={y} x="10" y={y} width="16" height="16" rx="4" className="fill-none stroke-[#404962]" strokeWidth="1.5" />
      ))}
      <line x1="26" y1="20" x2="136" y2="56" className="stroke-[#404962]" strokeWidth="1.5" opacity="0.6" />
      <line x1="26" y1="60" x2="136" y2="60" className="stroke-[#404962]" strokeWidth="1.5" opacity="0.6" />
      <line x1="26" y1="100" x2="136" y2="64" className="stroke-[#404962]" strokeWidth="1.5" opacity="0.6" />
      {/* the gate */}
      <rect x="142" y="34" width="4" height="52" rx="2" className="fill-[#404962]" />
      <rect x="150" y="34" width="4" height="52" rx="2" className="fill-[#404962]" />
      {/* the other side, out of reach */}
      <line x1="162" y1="60" x2="248" y2="60" className="stroke-[#404962]" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
      <circle cx="262" cy="60" r="10" className="fill-none stroke-[#404962]" strokeWidth="1.5" opacity="0.6" />
      <circle cx="262" cy="60" r="2" className="fill-[#6b6e7b]" />
      {/* blocked at the gate, forever */}
      {animated ? (
        <motion.circle
          r="3.5"
          cy="60"
          className="fill-[#8a8d98]"
          animate={{ cx: [26, 134, 134], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 2.6, times: [0, 0.55, 1], repeat: Infinity, repeatDelay: 0.5, ease: 'linear' }}
        />
      ) : (
        <circle cx="134" cy="60" r="3.5" className="fill-[#8a8d98]" />
      )}
    </svg>
  );
}

/* ── Open layer: protocols reach users directly; flow never stops ── */

const OPEN_LANES = [
  { y1: 20, y2: 56 },
  { y1: 60, y2: 60 },
  { y1: 100, y2: 64 },
] as const;

function OpenDiagram({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 300 120" className="w-full" aria-hidden="true">
      {[12, 52, 92].map((y) => (
        <rect key={y} x="10" y={y} width="16" height="16" rx="4" className="fill-none stroke-accent" strokeWidth="1.5" opacity="0.55" />
      ))}
      {OPEN_LANES.map((l) => (
        <line key={l.y1} x1="26" y1={l.y1} x2="246" y2={l.y2} className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.3" />
      ))}
      {animated ? (
        <motion.circle
          cx="260"
          cy="60"
          r="12"
          className="fill-accent/15 stroke-accent"
          strokeWidth="1.5"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '260px 60px' }}
        />
      ) : (
        <circle cx="260" cy="60" r="12" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
      )}
      <circle cx="260" cy="60" r="3" className="fill-accent" />
      {animated &&
        OPEN_LANES.map((l, i) => (
          <motion.circle
            key={l.y1}
            r="3.5"
            className="fill-accent"
            animate={{ cx: [26, 246], cy: [l.y1, l.y2], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.65,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: 'linear',
              opacity: { duration: 2, times: [0, 0.12, 0.88, 1], delay: i * 0.65, repeat: Infinity, repeatDelay: 0.6 },
            }}
          />
        ))}
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
              <ClosedDiagram animated={animated} />
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
              <OpenDiagram animated={animated} />
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
