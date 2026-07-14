'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import GradientButton from '@/components/ui/GradientButton';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatusPill from '@/components/ui/StatusPill';

interface DiffLineProps {
  tone: 'minus' | 'plus';
  children: string;
  delay: number;
}

/** One line of the before/after diff: a removed state, then the state Salmon shipped. */
function DiffLine({ tone, children, delay }: DiffLineProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPlus = tone === 'plus';

  const className = `flex gap-3 border-l-2 px-4 py-3 ${
    isPlus
      ? 'border-accent bg-accent/10 text-text-primary'
      : 'border-border-default bg-white/[0.02] text-text-tertiary'
  }`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`select-none ${isPlus ? 'text-accent' : 'text-text-tertiary'}`}
      >
        {isPlus ? '+' : '-'}
      </span>
      <span>{children}</span>
    </>
  );

  if (prefersReducedMotion) {
    return <p className={className}>{content}</p>;
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.p>
  );
}

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  return (
    <section id="ecosystem" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <div className="mb-14 max-w-3xl">
            <p className="eyebrow-pill mb-4">{t('eyebrow')}</p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">{t('subheading')}</p>
          </div>
        </ScrollReveal>

        <ol className="border-t border-border-subtle">
          {/* 001 — Mindfolk, shipped */}
          <li className="border-b border-border-subtle">
            <ScrollReveal>
              <div className="grid gap-6 py-10 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-12">
                <span
                  aria-hidden="true"
                  className="font-mono text-4xl leading-none tracking-tight text-accent sm:text-5xl"
                >
                  001
                </span>

                <div>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-text-primary sm:text-3xl">
                        {t('mindfolk.name')}
                      </h3>
                      <p className="eyebrow mt-2">{t('mindfolk.tag')}</p>
                    </div>
                    <StatusPill label={t('status')} />
                  </div>

                  <div className="overflow-hidden rounded-lg border border-border-subtle font-mono text-sm leading-relaxed">
                    <DiffLine tone="minus" delay={0.15}>
                      {t('mindfolk.problem')}
                    </DiffLine>
                    <DiffLine tone="plus" delay={0.5}>
                      {t('mindfolk.fix')}
                    </DiffLine>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-text-tertiary">
                    {t('mindfolk.outcome')}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </li>

        </ol>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl leading-relaxed text-text-secondary">{t('open.body')}</p>
            <GradientButton href={LINKS.contact} variant="secondary" className="shrink-0 px-5 py-2.5">
              {t('open.cta')} →
            </GradientButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
