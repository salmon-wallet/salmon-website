'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function DistributionPath() {
  const t = useTranslations('distribution');
  const steps = t.raw('steps') as string[];

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-r from-accent/[0.10] via-bg-secondary/70 to-accent/[0.04] px-6 py-10 sm:px-10">
            <p className="eyebrow text-accent">{t('eyebrow')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {steps.map((step, index) => (
                <span key={step} className="contents">
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-primary sm:text-sm">{step}</span>
                  {index < steps.length - 1 && <span className="text-accent" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
            <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t('heading')}</h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-text-secondary">{t('description')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
