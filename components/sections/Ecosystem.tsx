'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import StatusPill from '@/components/ui/StatusPill';

const X_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TELEGRAM_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const NODE = 'flex-1 rounded-lg border px-3 py-2.5 text-center text-sm leading-tight';

/** Connector that lights up (grey → accent) when the story plays. */
function Arrow({ active }: { active: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ color: active ? 'rgb(255,92,69)' : 'rgb(107,110,123)' }}
      transition={{ duration: 0.4 }}
      className="self-center px-2 sm:px-3"
    >
      <span className="hidden sm:inline">→</span>
      <span className="sm:hidden">↓</span>
    </motion.span>
  );
}

/**
 * The reroute plays as a story: idle shows the break, active runs the fix —
 * Salmon reroute glows and "Holders keep access" restores to green.
 */
function Reroute({
  before,
  action,
  after,
  active,
}: {
  before: string;
  action: string;
  after: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
      <div className={`${NODE} border-border-subtle bg-card-bg/40 text-text-secondary`}>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
          {before}
        </span>
      </div>
      <Arrow active={active} />
      <motion.div
        animate={
          active
            ? { scale: 1.03, boxShadow: '0 0 24px rgba(255,92,69,0.25)' }
            : { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`${NODE} border-accent/50 bg-accent/10 font-medium text-text-primary`}
      >
        {action}
      </motion.div>
      <Arrow active={active} />
      <motion.div
        animate={
          active
            ? {
                borderColor: 'rgba(74,222,128,0.45)',
                backgroundColor: 'rgba(74,222,128,0.10)',
                color: 'rgb(74,222,128)',
              }
            : {
                borderColor: 'rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(64,73,98,0.15)',
                color: 'rgb(138,141,152)',
              }
        }
        transition={{ duration: 0.5, delay: active ? 0.2 : 0 }}
        className={NODE}
      >
        <span className="inline-flex items-center gap-1.5">
          <motion.svg
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
            transition={{ duration: 0.3, delay: active ? 0.35 : 0 }}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
          {after}
        </span>
      </motion.div>
    </div>
  );
}

/** Mindfolk spotlight — the reroute story plays on hover (pointer) or in-view (touch). */
function MindfolkCard() {
  const t = useTranslations('ecosystem');
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-30% 0px -30% 0px' });
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const active =
    prefersReducedMotion || !mounted ? true : canHover ? hovered : inView;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlassmorphicCard className="h-full">
        <div className="flex h-full flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-end text-lg font-bold text-white">
                M
              </span>
              <div>
                <h3 className="text-2xl font-semibold leading-tight text-text-primary">
                  {t('mindfolk.name')}
                </h3>
                <span className="eyebrow">{t('mindfolk.tag')}</span>
              </div>
            </div>
            <StatusPill label={t('status')} />
          </div>

          <p className="mb-6 leading-relaxed text-text-secondary">
            {t('mindfolk.body')}
          </p>

          <div className="mb-6">
            <Reroute
              before={t('flow.before')}
              action={t('flow.action')}
              after={t('flow.after')}
              active={active}
            />
          </div>

          <p className="mt-auto border-t border-border-subtle pt-5 text-sm leading-relaxed text-text-tertiary">
            {t('mindfolk.outcome')}
          </p>
        </div>
      </GlassmorphicCard>
    </div>
  );
}

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  return (
    <section id="ecosystem" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <ScrollReveal direction="right" duration={1.1}>
            <MindfolkCard />
          </ScrollReveal>

          {/* More in progress + follow */}
          <ScrollReveal direction="left" delay={0.12} duration={1.1}>
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="eyebrow mb-4">{t('progress.eyebrow')}</p>
                <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                  {t('progress.body')}
                </p>
                <p className="text-sm text-text-tertiary">{t('progress.follow')}</p>
              </div>

              <div className="flex items-center gap-4 text-text-secondary">
                <a
                  href={LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-card-bg/30 transition-colors hover:border-white/25 hover:text-text-primary"
                >
                  {X_ICON}
                </a>
                <a
                  href={LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-card-bg/30 transition-colors hover:border-white/25 hover:text-text-primary"
                >
                  {TELEGRAM_ICON}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
