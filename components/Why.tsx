'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

const directions = ['right', 'up', 'left'] as const;

export default function Why() {
  const t = useTranslations('why');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="why" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {t('heading')}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
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
      </div>
    </section>
  );
}
