'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatusPill from '@/components/ui/StatusPill';
import BentoCard from '@/components/bento/BentoCard';
import {
  CreateVisual,
  ReceiveVisual,
  SendVisual,
  UseIntegrationVisual,
} from '@/components/bento/StepCards';

const STEPS = [
  { key: 'create', visual: <CreateVisual /> },
  { key: 'receive', visual: <ReceiveVisual /> },
  { key: 'send', visual: <SendVisual /> },
  { key: 'use', visual: <UseIntegrationVisual /> },
] as const;

const SUPPORT_KEYS = ['activation', 'channels', 'live'] as const;

export default function WhatMattersFirst() {
  const t = useTranslations('whatMatters');

  return (
    <section id="start" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow-pill mb-4">{t('eyebrow')}</p>
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

        {/* Quickstart: each step idles, then "executes" on hover (in-view on touch) */}
        <ScrollReveal direction="up" duration={1.1}>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ key, visual }, i) => (
              <li key={key} className="h-full">
                <BentoCard
                  eyebrow={String(i + 1).padStart(2, '0')}
                  title={t(`steps.${key}`)}
                  visual={visual}
                />
              </li>
            ))}
          </ol>
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
