'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import StatusPill from '@/components/ui/StatusPill';

const STEP_KEYS = ['create', 'receive', 'send', 'use'] as const;
const SUPPORT_KEYS = ['activation', 'channels', 'live'] as const;

const stepVariants = {
  hidden: { opacity: 0, x: -28, filter: 'blur(4px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)' },
};

export default function WhatMattersFirst() {
  const t = useTranslations('whatMatters');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="start" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('heading')}
              </h2>
              <StatusPill label={t('live')} />
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        {/* Quickstart panel: each step slides in on its own */}
        <GlassmorphicCard noPadding className="overflow-hidden">
          <motion.ol
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'show'}
            viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.13 } } }}
          >
            {STEP_KEYS.map((key, i) => (
              <motion.li
                key={key}
                variants={stepVariants}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-5 border-border-subtle px-6 py-5 [&:not(:first-child)]:border-t sm:px-8"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base font-medium text-text-primary sm:text-lg">
                  {t(`steps.${key}`)}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </GlassmorphicCard>

        {/* Supporting frame: why the path matters */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {SUPPORT_KEYS.map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1} duration={1.0}>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`support.${key}.title`)}
                </h3>
                <p className="leading-relaxed text-text-secondary">
                  {t(`support.${key}.description`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
