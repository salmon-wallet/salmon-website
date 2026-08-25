'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PowerupIcon } from '@/components/ui/powerup-icons';

const POWERUPS = [
  { key: 'swap', labels: ['comingSoon'] },
  { key: 'bridge', labels: ['comingSoon'] },
  { key: 'explore', labels: ['comingSoon'] },
  { key: 'portfolio', labels: ['comingSoon'] },
  { key: 'stake', labels: ['comingSoon'] },
  { key: 'onRamp', labels: ['comingSoon'] },
  { key: 'news', labels: ['comingSoon'] },
  { key: 'chat', labels: ['comingSoon'] },
  { key: 'privateSend', labels: ['comingSoon'] },
] as const;

export default function Powerups() {
  const t = useTranslations('powerups');
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="powerups" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <p className="eyebrow-pill">{t('eyebrow')}</p>
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subheading')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={1.1}>
          <div className="relative grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[20%] top-1/2 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-[0.045] blur-[80px] lg:block"
            />

            <div className="relative z-20 flex min-h-[420px] w-full flex-col items-start justify-center rounded-[2rem] border border-accent/35 bg-bg-secondary/35 px-7 py-10 shadow-[0_20px_70px_rgba(0,0,0,0.28),0_0_45px_rgba(255,92,69,0.07)] sm:px-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                  <Image src="/images/logo.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
                </div>
                <p className="eyebrow mb-3 text-accent">{t('core.eyebrow')}</p>
                <h3 className="text-3xl font-bold tracking-tight">{t('core.title')}</h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-text-tertiary">
                  {t('core.description')}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {(['balance', 'send', 'receive', 'connect', 'nfts'] as const).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border-subtle bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
                    >
                      {t(`core.${item}`)}
                    </span>
                  ))}
                </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {POWERUPS.map(({ key, labels }) => {
                const isEnabled = false;
                return (
                <button
                  key={key}
                  type="button"
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(key)}
                  onBlur={() => setActive(null)}
                  className={`group relative z-10 flex min-h-36 cursor-default flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isEnabled && active === key
                      ? 'border-accent/60 bg-accent/[0.09] shadow-[0_16px_44px_rgba(255,92,69,0.12)]'
                      : isEnabled
                        ? 'border-accent/35 bg-accent/[0.05] hover:border-accent/55 hover:bg-accent/[0.08]'
                        : 'border-border-subtle bg-bg-secondary/20 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`shrink-0 ${isEnabled ? 'text-accent' : 'text-text-tertiary'}`}>
                      <PowerupIcon type={key} className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
                    </span>
                    <h3 className="text-base font-semibold text-text-primary xl:text-lg">
                      {t(`items.${key}.title`)}
                    </h3>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {labels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-text-tertiary"
                      >
                        {t(`labels.${label}`)}
                      </span>
                    ))}
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
