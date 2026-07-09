'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

/**
 * Split editorial layout: heading stays sticky on the left while the four
 * numbered security principles scroll by on the right.
 */
export default function Security() {
  const t = useTranslations('security');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ScrollReveal>
              <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('heading')}
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                {t('subheading')}
              </p>
            </ScrollReveal>
          </div>

          <div>
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08} duration={1.0}>
                <div className="flex gap-6 border-t border-border-subtle py-8">
                  <span className="pt-1 font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
