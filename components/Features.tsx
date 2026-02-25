'use client';

import { useTranslations } from 'next-intl';
import { FEATURE_ICONS } from '@/lib/constants';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';

function FeatureIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    swap: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    clean: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    dapps: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    growth: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  };

  return icons[icon] ?? null;
}

const cardDirections = ['right', 'left', 'right', 'left'] as const;

export default function Features() {
  const t = useTranslations('features');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  const FEATURE_IMAGES = ['swap.jpeg', 'clean.jpeg', 'dapps.jpeg', 'grow.jpeg'] as const;

  return (
    <section id="features" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-center">
            {t('heading')}
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-16">
            {t('subheading')}
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((feature, i) => (
            <ScrollReveal key={i} direction={cardDirections[i]} delay={i * 0.12} duration={1.1}>
              <GlassmorphicCard className="h-full p-0 overflow-hidden">
                {/* Image placeholder area */}
                <div className="relative h-28 sm:h-32 bg-bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={`/images/${FEATURE_IMAGES[i]}`}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                    style={{
                      mixBlendMode: 'lighten',
                      filter: 'saturate(0) contrast(1.4)'
                    }}
                  />
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-text-tertiary/50 uppercase tracking-widest bg-bg-secondary/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {t('preview')}
                  </span>
                </div>
                {/* Text content */}
                <div className="p-6">
                  <h3 className="text-3xl font-semibold mb-2 leading-tight">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassmorphicCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
