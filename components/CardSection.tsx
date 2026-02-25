'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';

/* ── Icon sets ────────────────────────────────────────────── */

const featureIcons: Record<string, React.ReactNode> = {
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

const securityIcons: Record<string, React.ReactNode> = {
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

/* ── Config per section ───────────────────────────────────── */

const SECTION_CONFIG = {
  features: {
    images: ['swap.jpeg', 'clean.jpeg', 'dapps.jpeg', 'grow.jpeg'] as const,
    iconSet: featureIcons,
    iconKeys: ['swap', 'clean', 'dapps', 'growth'] as const,
    glowClassName: '',
    /** Rich 3D renders — cover the area fully */
    imageClassName: 'object-cover opacity-80',
    /** Hover tint: accent orange */
    hoverTint: '#ff5c45',
  },
  security: {
    images: ['keys.jpeg', 'privacy.jpeg', 'openmodel.jpeg', 'review.jpeg'] as const,
    iconSet: securityIcons,
    iconKeys: ['keys', 'privacy', 'audit', 'review'] as const,
    glowClassName: '',
    /** Rich 3D renders — cover the area fully */
    imageClassName: 'object-cover opacity-80',
    /** Hover tint: clean white for trust/security feel */
    hoverTint: '#ffffff',
  },
} as const;

type SectionId = keyof typeof SECTION_CONFIG;

const cardDirections = ['right', 'left', 'right', 'left'] as const;

/* ── Component ────────────────────────────────────────────── */

interface CardSectionProps {
  id: SectionId;
}

export default function CardSection({ id }: CardSectionProps) {
  const t = useTranslations(id);
  const items = t.raw('items') as Array<{ title: string; description: string }>;
  const { images, glowClassName, imageClassName, hoverTint } = SECTION_CONFIG[id];

  return (
    <section id={id} className="relative py-24 sm:py-32">
      {/* Decorative glow */}
      <div className={glowClassName} />

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
              <GlassmorphicCard noPadding hoverTint={hoverTint} className="h-full overflow-hidden">
                {/* Image area */}
                <div className="relative h-40 sm:h-48 bg-bg-secondary overflow-hidden">
                  <Image
                    src={`/images/${images[i]}`}
                    alt={item.title}
                    fill
                    className={imageClassName}
                  />
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-text-tertiary/50 uppercase tracking-widest bg-bg-secondary/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {t('preview')}
                  </span>
                </div>
                {/* Text content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 leading-tight">{item.title}</h3>
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
