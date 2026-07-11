'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

/**
 * The thesis as a stacked, typographic contrast: the closed layer (muted)
 * answered by the open layer (lit). No diagram — the difference is carried by
 * hierarchy, colour and rhythm.
 */
export default function Why() {
  const t = useTranslations('why');
  const closedItems = t.raw('closed.items') as string[];
  const openItems = t.raw('open.items') as string[];

  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <p className="eyebrow mb-5">{t('eyebrow')}</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {t('subheading')}
          </p>
        </ScrollReveal>

        {/* Closed vs open — felt through type and colour, not a diagram */}
        <div className="mt-16 grid gap-12 sm:mt-20 md:grid-cols-2 md:gap-16">
          <ScrollReveal direction="right" duration={1.1}>
            <div>
              <p className="eyebrow mb-3">{t('closed.label')}</p>
              <p className="mb-8 font-mono text-xs text-text-tertiary">
                {t('closed.status')}
              </p>
              <ul className="space-y-6">
                {closedItems.map((item, i) => (
                  <li key={i} className="text-lg leading-snug text-text-tertiary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1} duration={1.1}>
            <div className="md:border-l md:border-accent/25 md:pl-16">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t('open.label')}
              </p>
              <p className="mb-8 font-mono text-xs text-accent/80">
                {t('open.status')}
              </p>
              <ul className="space-y-6">
                {openItems.map((item, i) => (
                  <li key={i} className="text-lg leading-snug text-text-primary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="mt-16 max-w-3xl border-l-2 border-accent/40 pl-6 text-xl font-medium leading-relaxed text-text-secondary sm:mt-24 sm:text-2xl">
            {t('kicker')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
