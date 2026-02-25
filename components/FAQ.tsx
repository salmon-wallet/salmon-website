'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import AccordionItem from './ui/AccordionItem';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ question: string; answer: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-16 text-center">
            {t('heading')}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-t border-border-default">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
