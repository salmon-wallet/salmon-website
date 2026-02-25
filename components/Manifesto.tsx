'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

export default function Manifesto() {
  const t = useTranslations('manifesto');
  const principles = t.raw('principles') as Array<{ title: string; description: string }>;

  return (
    <section id="manifesto" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {t('heading')}
          </h2>
          <p className="text-lg text-text-secondary mb-16">
            {t('subheading')}
          </p>
        </ScrollReveal>

        <div className="space-y-10">
          {principles.map((p, i) => (
            <ScrollReveal
              key={i}
              direction={i % 2 === 0 ? 'right' : 'left'}
              delay={i * 0.12}
              duration={1.1}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {p.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
