'use client';

import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import GradientButton from '@/components/ui/GradientButton';
import StatusPill from '@/components/ui/StatusPill';
import FlowStrip from '@/components/ui/FlowStrip';

const X_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TELEGRAM_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export default function Ecosystem() {
  const t = useTranslations('ecosystem');

  return (
    <section id="ecosystem" className="relative py-24 sm:py-32">
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

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          {/* Mindfolk spotlight */}
          <ScrollReveal direction="right" duration={1.1}>
            <GlassmorphicCard className="h-full">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <StatusPill label={t('status')} />
                  <span className="eyebrow">{t('mindfolk.tag')}</span>
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-text-primary sm:text-3xl">
                  {t('mindfolk.name')}
                </h3>
                <p className="mb-6 leading-relaxed text-text-secondary">
                  {t('mindfolk.body')}
                </p>

                <div className="mb-6">
                  <FlowStrip
                    nodes={[t('flow.before'), t('flow.action'), t('flow.after')]}
                    accentIndex={1}
                  />
                </div>

                <p className="mt-auto border-t border-border-subtle pt-5 text-sm leading-relaxed text-text-tertiary">
                  {t('mindfolk.outcome')}
                </p>
              </div>
            </GlassmorphicCard>
          </ScrollReveal>

          {/* More in progress + follow */}
          <ScrollReveal direction="left" delay={0.12} duration={1.1}>
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="eyebrow mb-4">{t('progress.eyebrow')}</p>
                <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                  {t('progress.body')}
                </p>
                <p className="text-sm text-text-tertiary">{t('progress.follow')}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <GradientButton href={LINKS.repo} variant="secondary">
                    {t('cta.github')} ↗
                  </GradientButton>
                  <GradientButton href={LINKS.contact} variant="secondary">
                    {t('cta.integrate')} ↗
                  </GradientButton>
                </div>
                <div className="flex items-center gap-5 text-text-secondary">
                  <a
                    href={LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="transition-colors hover:text-text-primary"
                  >
                    {X_ICON}
                  </a>
                  <a
                    href={LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="transition-colors hover:text-text-primary"
                  >
                    {TELEGRAM_ICON}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
