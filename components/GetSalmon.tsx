'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';
import { WebIcon, ExtensionIcon, AndroidIcon, IosIcon } from './ui/platform-icons';

function QrPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-40 h-40 rounded-xl border border-card-border bg-white flex items-center justify-center">
      <span className="text-bg-primary text-xs font-mono text-center px-2">
        {label} QR
      </span>
    </div>
  );
}

function PlatformCard({
  title,
  description,
  href,
  icon,
  expandable,
  qrLabel,
  downloadLabel,
  showQrLabel,
  hideQrLabel,
  hoverTint,
  comingSoon,
  comingSoonLabel,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  expandable?: boolean;
  qrLabel?: string;
  downloadLabel: string;
  showQrLabel: string;
  hideQrLabel: string;
  hoverTint?: string;
  comingSoon?: boolean;
  comingSoonLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <GlassmorphicCard hoverTint={hoverTint} className="text-center h-full">
      <div className="flex flex-col items-center h-full">
        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-text-secondary mb-4 flex-1">{description}</p>

        {comingSoon ? (
          <span className="text-sm text-text-secondary/60 font-medium py-1">
            {comingSoonLabel}
          </span>
        ) : expandable ? (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-accent hover:text-accent/80 transition-colors cursor-pointer"
            >
              {expanded ? hideQrLabel : showQrLabel}
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }
                  }
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex justify-center">
                    <QrPlaceholder label={qrLabel ?? title} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            {downloadLabel}
          </a>
        )}
      </div>
    </GlassmorphicCard>
  );
}

const cardDirections = ['right', 'left', 'right', 'left'] as const;

const X_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TELEGRAM_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export default function GetSalmon() {
  const t = useTranslations('getSalmon');

  return (
    <section id="get-salmon" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
            {t('heading')}
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          <ScrollReveal direction={cardDirections[0]} delay={0} duration={1.1} className="h-full">
            <PlatformCard
              title={t('web')}
              description={t('webDescription')}
              href={LINKS.webWallet}
              hoverTint="#4FC3F7"
              downloadLabel={t('open')}
              showQrLabel={t('showQr')}
              hideQrLabel={t('hideQr')}
              icon={<WebIcon />}
            />
          </ScrollReveal>

          <ScrollReveal direction={cardDirections[1]} delay={0.12} duration={1.1} className="h-full">
            <PlatformCard
              title={t('extension')}
              description={t('extensionDescription')}
              href={LINKS.chrome}
              hoverTint="#4285F4"
              downloadLabel={t('download')}
              showQrLabel={t('showQr')}
              hideQrLabel={t('hideQr')}
              icon={<ExtensionIcon />}
            />
          </ScrollReveal>

          <ScrollReveal direction={cardDirections[2]} delay={0.24} duration={1.1} className="h-full">
            <PlatformCard
              title={t('android')}
              description={t('androidDescription')}
              href={LINKS.playStore}
              hoverTint="#3DDC84"
              downloadLabel={t('download')}
              showQrLabel={t('showQr')}
              hideQrLabel={t('hideQr')}
              icon={<AndroidIcon />}
            />
          </ScrollReveal>

          <ScrollReveal direction={cardDirections[3]} delay={0.36} duration={1.1} className="h-full">
            <PlatformCard
              title={t('ios')}
              description={t('iosDescription')}
              href={LINKS.appStore}
              hoverTint="#A2AAAD"
              comingSoon
              comingSoonLabel={t('comingSoon')}
              downloadLabel={t('download')}
              showQrLabel={t('showQr')}
              hideQrLabel={t('hideQr')}
              icon={<IosIcon />}
            />
          </ScrollReveal>
        </div>

        {/* Integrate + explore the code: the other two primary CTAs */}
        <ScrollReveal delay={0.2} duration={1.1}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <GlassmorphicCard className="h-full">
              <div className="flex h-full flex-col items-start gap-4">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold">{t('build.heading')}</h3>
                  <p className="text-sm text-text-secondary">{t('build.description')}</p>
                </div>
                <a
                  href={LINKS.contact}
                  className="inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/25"
                >
                  {t('build.cta')} ↗
                </a>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="h-full">
              <div className="flex h-full flex-col items-start gap-4">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold">{t('code.heading')}</h3>
                  <p className="text-sm text-text-secondary">{t('code.description')}</p>
                </div>
                <a
                  href={LINKS.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border-subtle px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/5 hover:border-white/25"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  {t('code.cta')} ↗
                </a>
              </div>
            </GlassmorphicCard>
          </div>
        </ScrollReveal>

        {/* X + Telegram: follow channels, not primary CTAs */}
        <ScrollReveal delay={0.25} duration={1.0}>
          <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-center sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2">{t('followX.heading')}</p>
              <p className="mb-3 text-sm text-text-tertiary">{t('followX.description')}</p>
              <a
                href={LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {X_ICON}
                {t('followX.cta')} ↗
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">{t('community.heading')}</p>
              <p className="mb-3 text-sm text-text-tertiary">{t('community.description')}</p>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {TELEGRAM_ICON}
                {t('community.cta')} ↗
              </a>
            </div>
          </div>

          <p className="mt-16 text-center text-lg text-text-tertiary">
            {t('closing')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
