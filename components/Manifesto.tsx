'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';

export default function Manifesto() {
  const t = useTranslations('manifesto');
  const principles = t.raw('principles') as Array<{ title: string; description: string }>;

  return (
    <section id="manifesto" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="eyebrow-pill mb-4">{t('eyebrow')}</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
          <p className="text-lg leading-[1.9] text-text-secondary sm:text-xl">
            {principles.map((principle, index) => (
              <span key={principle.title}>
                {index > 0 && ' '}
                <strong className="font-bold text-text-primary transition-colors duration-300 hover:text-accent">
                  {principle.title}
                </strong>{' '}
                {principle.description}
              </span>
            ))}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
