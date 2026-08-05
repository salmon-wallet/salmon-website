'use client';

import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GradientButton from '@/components/ui/GradientButton';

interface ProcessStep {
  title: string;
  description: string;
}

interface SupportLevel {
  title: string;
  description: string;
}

export default function HowIntegrationsWork() {
  const t = useTranslations('integrations');
  const steps = t.raw('steps') as ProcessStep[];
  const criteria = t.raw('criteria') as string[];
  const levels = t.raw('levels') as SupportLevel[];

  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow-pill mb-4">{t('eyebrow')}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {t('intro')}
            </p>
            <div className="mt-7">
              <GradientButton href={LINKS.contact}>{t('apply')} ↗</GradientButton>
            </div>
          </div>
        </ScrollReveal>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-border-subtle bg-border-subtle md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-bg-primary p-6 sm:p-8">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>

        <ScrollReveal>
          <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight">{t('evaluates')}</h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {criteria.map((criterion) => (
                <span key={criterion} className="rounded-full border border-border-subtle bg-white/[0.03] px-4 py-2 text-sm text-text-secondary">
                  {criterion}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold tracking-tight">{t('levelsHeading')}</h3>
          </ScrollReveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {levels.map((level, index) => (
              <ScrollReveal key={level.title} delay={index * 0.08} className="h-full">
                <article className="h-full rounded-2xl border border-border-subtle bg-bg-secondary/35 p-6">
                  <h4 className="text-lg font-semibold text-accent">{level.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{level.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-text-tertiary">{t('disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
