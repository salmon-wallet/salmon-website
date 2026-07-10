'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import StatusPill from '@/components/ui/StatusPill';

const STEP_KEYS = ['create', 'receive', 'send', 'use'] as const;
const SUPPORT_KEYS = ['activation', 'channels', 'live'] as const;

export default function WhatMattersFirst() {
  const t = useTranslations('whatMatters');

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

        {/* Quickstart panel: the one path that has to work */}
        <ScrollReveal direction="up" duration={1.1}>
          <GlassmorphicCard noPadding className="overflow-hidden">
            <ol>
              {STEP_KEYS.map((key, i) => (
                <li
                  key={key}
                  className="flex items-center gap-5 border-border-subtle px-6 py-5 [&:not(:first-child)]:border-t sm:px-8"
                >
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base font-medium text-text-primary sm:text-lg">
                    {t(`steps.${key}`)}
                  </span>
                </li>
              ))}
            </ol>
          </GlassmorphicCard>
        </ScrollReveal>

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
