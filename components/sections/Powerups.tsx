'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

const POWERUPS = [
  { key: 'swap', labels: ['official'] },
  { key: 'bridge', labels: ['official'] },
  { key: 'explore', labels: ['official'] },
  { key: 'portfolio', labels: ['community', 'comingSoon'] },
  { key: 'stake', labels: ['comingSoon'] },
  { key: 'onRamp', labels: ['community', 'comingSoon'] },
  { key: 'news', labels: ['community', 'comingSoon'] },
  { key: 'chat', labels: ['community', 'comingSoon'] },
  { key: 'privateSend', labels: ['community', 'comingSoon'] },
] as const;

function PowerupIcon({ type }: { type: (typeof POWERUPS)[number]['key'] }) {
  const common =
    'h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110';

  if (type === 'swap') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 7h11l-3-3" />
        <path d="m18 7-3 3" />
        <path d="M17 17H6l3 3" />
        <path d="m6 17 3-3" />
      </svg>
    );
  }

  if (type === 'bridge') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 18V8" />
        <path d="M20 18V8" />
        <path d="M4 12c4-5 12-5 16 0" />
        <path d="M8 18v-3" />
        <path d="M16 18v-3" />
        <path d="M2 18h20" />
      </svg>
    );
  }

  if (type === 'portfolio') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </svg>
    );
  }

  if (type === 'explore') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
      </svg>
    );
  }

  if (type === 'onRamp') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 7h13" />
        <path d="m14 4 3 3-3 3" />
        <path d="M20 17H7" />
        <path d="m10 14-3 3 3 3" />
      </svg>
    );
  }

  if (type === 'news') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 4h12v16H5z" />
        <path d="M9 8h4" />
        <path d="M9 12h4" />
        <path d="M9 16h4" />
        <path d="M17 8h2v10a2 2 0 0 1-2 2" />
      </svg>
    );
  }

  if (type === 'chat') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 5h14v11H9l-4 4V5Z" />
        <path d="M9 9h6" />
        <path d="M9 12h4" />
      </svg>
    );
  }

  if (type === 'privateSend') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m4 12 16-7-7 16-2-7-7-2Z" />
        <path d="m11 14 4-4" />
        <path d="M18 16a4 4 0 0 1-4 4" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 15h14" />
      <path d="M7 19h10" />
    </svg>
  );
}

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
              <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                {t('comingSoon')}
              </span>
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
              {POWERUPS.map(({ key, labels }) => (
                <button
                  key={key}
                  type="button"
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(key)}
                  onBlur={() => setActive(null)}
                  className={`group relative z-10 flex min-h-36 cursor-default flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active === key
                      ? 'border-accent/60 bg-accent/[0.09] shadow-[0_16px_44px_rgba(255,92,69,0.12)]'
                      : 'border-border-subtle bg-bg-secondary/35 hover:border-accent/40 hover:bg-accent/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 text-accent">
                      <PowerupIcon type={key} />
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
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
