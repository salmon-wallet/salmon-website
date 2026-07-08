'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import GradientButton from './ui/GradientButton';
import { LINKS } from '@/lib/constants';

const directions = ['right', 'up', 'left'] as const;

export default function ForProtocols() {
  const t = useTranslations('protocols');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="protocols" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {t('heading')}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3 mb-14">
          {items.map((item, i) => (
            <ScrollReveal key={i} direction={directions[i]} delay={i * 0.15} duration={1.1}>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
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
