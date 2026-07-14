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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
          </div>
        </ScrollReveal>

        {/* Numbered rows: five profiles never split evenly into a card grid */}
        <ol className="border-t border-border-subtle">
          {items.map((item, i) => (
            <li
              key={i}
              className="group border-b border-border-subtle transition-colors hover:bg-white/[0.02]"
            >
              <ScrollReveal delay={0.05} duration={1.0}>
                <div className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[auto_1fr] sm:py-10">
                  <span
                    aria-hidden="true"
                    className="font-mono text-2xl leading-none tracking-tight text-text-tertiary transition-colors group-hover:text-accent sm:text-3xl"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="max-w-3xl">
                    <h3 className="mb-2 text-xl font-semibold text-text-primary sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mb-3 leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      <span className="text-accent/70">{t('eg')}</span> {item.example}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
