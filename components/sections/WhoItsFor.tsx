'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import BentoCard from '@/components/bento/BentoCard';
import {
  ProtocolsVisual,
  NftCommunitiesVisual,
  SecurityToolsVisual,
  BuildersVisual,
  AlignedVisual,
} from './AudienceVisuals';

interface Audience {
  title: string;
  description: string;
}

const VISUALS: ReactNode[] = [
  <ProtocolsVisual key="protocols" />,
  <NftCommunitiesVisual key="nft" />,
  <SecurityToolsVisual key="security" />,
  <BuildersVisual key="builders" />,
  <AlignedVisual key="aligned" />,
];

const SPANS = ['lg:col-span-2', '', '', '', ''];

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

        <ScrollReveal delay={0.1} duration={1.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <BentoCard
                key={i}
                title={item.title}
                description={item.description}
                visual={VISUALS[i]}
                className={SPANS[i]}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
