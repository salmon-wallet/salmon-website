'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Audience {
  title: string;
  description: string;
  example: string;
}

export default function WhoItsFor() {
  const t = useTranslations('audience');
  const items = t.raw('items') as Audience[];

  return (
    <section id="who" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? 'right' : 'left'}
                delay={(i % 2) * 0.08}
                duration={1.0}
                className={isLast ? 'sm:col-span-2' : undefined}
              >
                <div className="h-full rounded-xl border border-border-subtle bg-card-bg/30 p-6 transition-colors hover:border-white/20">
                  <span className="mb-3 block font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mb-3 leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  <p className="text-sm text-text-tertiary">
                    <span className="text-accent/70">{t('eg')}</span> {item.example}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
