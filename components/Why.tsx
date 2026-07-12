'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

interface Statement {
  lead: string;
  support: string;
}

/* The argument as a sequence of short stacked statements — typographic, no diagrams. */
export default function Why() {
  const t = useTranslations('why');
  const statements = t.raw('statements') as Statement[];

  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h2 className="mb-16 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl sm:mb-20">
            <span className="block text-text-tertiary">{t('heading')}</span>
            <span className="block">{t('headingAccent')}</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-12 sm:space-y-16">
          {statements.map((s, i) => {
            const isTurn = i === statements.length - 2; // "Salmon creates a more open path."
            return (
              <ScrollReveal key={s.lead} delay={0.05} duration={1.0}>
                <div className={isTurn ? 'border-l-2 border-accent pl-5 sm:pl-7' : undefined}>
                  <p
                    className={`mb-2 text-2xl font-semibold tracking-tight sm:text-3xl ${
                      isTurn ? 'text-accent' : 'text-text-primary'
                    }`}
                  >
                    {s.lead}
                  </p>
                  <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
                    {s.support}
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
