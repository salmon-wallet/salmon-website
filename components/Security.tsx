'use client';

import { useTranslations } from 'next-intl';
import { SECURITY_ICONS } from '@/lib/constants';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';

function SecurityIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    keys: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    privacy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    audit: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    review: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  return icons[icon] ?? null;
}

const cardDirections = ['right', 'left', 'right', 'left'] as const;

export default function Security() {
  const t = useTranslations('security');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  const SECURITY_IMAGES = ['keys.jpeg', 'privacy.jpeg', 'openmodel.jpeg', 'review.jpeg'] as const;

  return (
    <section id="security" className="relative py-24 sm:py-32">

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
          {items.map((item, i) => (
            <ScrollReveal key={i} direction={cardDirections[i]} delay={i * 0.12} duration={1.1}>
              <GlassmorphicCard className="h-full p-0 overflow-hidden">
                {/* Image placeholder area */}
                <div className="relative h-28 sm:h-32 bg-bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={`/images/${SECURITY_IMAGES[i]}`}
                    alt={item.title}
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
                  <h3 className="text-3xl font-semibold mb-2 leading-tight">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
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
