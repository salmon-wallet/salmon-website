'use client';

import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';

export default function Blog() {
  const t = useTranslations('blog');
  const prefersReducedMotion = useReducedMotion();
  const items = t.raw('items') as Array<{
    title: string;
    excerpt: string;
    url: string;
  }>;

  // Duplicate for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <section id="blog" className="relative py-24 overflow-hidden">

      <div className="relative mx-auto max-w-6xl px-6 mb-12">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('heading')}</h2>
          <p className="text-text-secondary max-w-2xl">{t('subheading')}</p>
        </ScrollReveal>
      </div>

      {/* Infinite marquee — contained */}
      <div className="relative mx-auto max-w-6xl px-6">
        {prefersReducedMotion ? (
          /* Static grid for reduced motion */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 6).map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <BlogCard item={item} readMore={t('readMore')} />
              </a>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden group/marquee py-4">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none z-10" />

            <div className="flex w-max animate-marquee-blog group-hover/marquee:[animation-play-state:paused] py-4">
              {doubled.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[280px] sm:w-[320px] shrink-0 mx-3"
                >
                  <BlogCard item={item} readMore={t('readMore')} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ item, readMore }: { item: { title: string; excerpt: string }; readMore: string }) {
  return (
    <GlassmorphicCard className="h-full flex flex-col group/card">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 shrink-0">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
          <path d="M4 3h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v10h12V5H4zm2 2h8v2H6V7zm0 4h5v2H6v-2z" fill="currentColor" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover/card:text-accent transition-colors line-clamp-2">
        {item.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
        {item.excerpt}
      </p>

      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
        {readMore}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover/card:translate-x-1 transition-transform">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </GlassmorphicCard>
  );
}
