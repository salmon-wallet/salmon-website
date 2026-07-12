'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import AccordionItem from './ui/AccordionItem';

interface FaqGroup {
  label: string;
  items: Array<{ question: string; answer: string }>;
}

export default function FAQ() {
  const t = useTranslations('faq');
  const groups = t.raw('groups') as FaqGroup[];
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-16 text-center">
            {t('heading')}
          </h2>
        </ScrollReveal>

        <div className="space-y-14">
          {groups.map((group, gi) => (
            <ScrollReveal key={group.label}>
              <div>
                <p className="eyebrow mb-4">{group.label}</p>
                <div className="border-t border-border-default">
                  {group.items.map((item, i) => {
                    const key = `${gi}-${i}`;
                    return (
                      <AccordionItem
                        key={key}
                        index={gi * 100 + i}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openKey === key}
                        onToggle={() => setOpenKey(openKey === key ? null : key)}
                      />
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
