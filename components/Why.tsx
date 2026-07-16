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
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Heading holds the left rail while the argument scrolls past it */}
        <div className="lg:col-span-5">
          {/* Sticky lives outside ScrollReveal: its transform/filter would trap the sticky box */}
          <div className="lg:sticky lg:top-28">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="block text-text-tertiary">{t('heading')}</span>
                <span className="block">{t('headingAccent')}</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          {statements.map((s) => {
            return (
              <ScrollReveal
                key={s.lead}
                delay={0.05}
                duration={1.0}
              >
                {/* Accent is a hover state, not a fixed highlight on one statement */}
                <div className="group">
                  <p className="mb-2 text-xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {s.lead}
                  </p>
                  <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
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
