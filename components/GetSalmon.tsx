'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LINKS } from '@/lib/constants';
import ScrollReveal from './ui/ScrollReveal';
import GlassmorphicCard from './ui/GlassmorphicCard';

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

export default function GetSalmon() {
  const t = useTranslations('getSalmon');

  return (
    <section id="get-salmon" className="relative py-24 sm:py-32">

      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-center">
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
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              }
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
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
                </svg>
              }
            />
          </ScrollReveal>

          <ScrollReveal direction={cardDirections[2]} delay={0.24} duration={1.1} className="h-full">
            <PlatformCard
              title={t('android')}
              description={t('androidDescription')}
              href={LINKS.playStore}
              hoverTint="#3DDC84"
              comingSoon
              comingSoonLabel={t('comingSoon')}
              downloadLabel={t('download')}
              showQrLabel={t('showQr')}
              hideQrLabel={t('hideQr')}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10l0 6" />
                  <path d="M20 10l0 6" />
                  <path d="M7 9h10v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8a5 5 0 0 1 10 0" />
                  <path d="M8 3l1 2" />
                  <path d="M16 3l-1 2" />
                  <path d="M9 18l0 3" />
                  <path d="M15 18l0 3" />
                </svg>
              }
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
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.286 7.008c-3.216 0-4.286 3.23-4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165-.05 1.799-.538 3.214-.538c1.406 0 1.607.538 3.214.538s4.286-3.229 4.286-5.381c-.03-.011-2.649-.434-2.679-3.23c-.02-2.335 2.589-3.179 2.679-3.228c-1.096-1.606-3.162-2.113-3.75-2.153c-1.535-.12-3.032 1.077-3.75 1.077c-.729 0-2.036-1.077-3.214-1.077" />
                  <path d="M12 4a2 2 0 0 0 2-2a2 2 0 0 0-2 2" />
                </svg>
              }
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
