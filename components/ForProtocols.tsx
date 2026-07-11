'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import GradientButton from './ui/GradientButton';
import { LINKS } from '@/lib/constants';

export default function ForProtocols() {
  const t = useTranslations('protocols');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="protocols" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-14 grid gap-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={(i % 2) * 0.1} duration={1.1}>
              <div className="flex gap-5 border-t border-border-subtle pt-5">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <GradientButton href={LINKS.github} variant="secondary">
            {t('cta')} ↗
          </GradientButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
