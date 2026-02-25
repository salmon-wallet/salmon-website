'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LINKS } from '@/lib/constants';
import ScrollReveal from './ui/ScrollReveal';

export default function Footer() {
  const t = useTranslations('footer');

  const footerLinks = [
    { label: t('xTwitter'), href: LINKS.twitter, external: true },
    { label: t('github'), href: LINKS.github, external: true },
    { label: t('medium'), href: LINKS.medium, external: true },
    { label: t('discord'), href: LINKS.discord, external: true },
    { label: t('telegram'), href: LINKS.telegram, external: true },
    { label: t('terms'), href: '/terms', external: false },
    { label: t('privacy'), href: '/privacy', external: false },
    { label: t('mediaKit'), href: LINKS.mediaKit, external: true },
  ];

  return (
    <footer className="relative border-t border-border-default bg-bg-secondary/50 overflow-hidden">

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10">
          {/* Top row: logo + description + status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Salmon Wallet"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <Image
                  src="/images/app-title.png"
                  alt="Salmon"
                  width={90}
                  height={22}
                  className="h-4 w-auto"
                />
              </Link>
              <p className="text-sm text-text-tertiary max-w-xs">
                {t('description')}
              </p>
            </div>

            {/* Status indicator */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  {t('status')}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Links row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border-default/50">
            <p className="text-sm text-text-tertiary">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
