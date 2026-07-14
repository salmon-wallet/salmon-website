'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LINKS } from '@/lib/constants';

interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tPlatform = useTranslations('getSalmon');

  const columns: { label: string; links: FooterLink[] }[] = [
    {
      label: t('columns.product'),
      links: [
        { label: tPlatform('web'), href: LINKS.webWallet, external: true },
        { label: tPlatform('extension'), href: LINKS.chrome, external: true },
        { label: tPlatform('android'), href: LINKS.playStore, external: true },
        { label: tNav('stake'), href: '/stake', external: false },
      ],
    },
    {
      label: t('columns.developers'),
      links: [
        { label: t('github'), href: LINKS.github, external: true },
        { label: t('contact'), href: LINKS.contact, external: true },
        { label: t('mediaKit'), href: LINKS.mediaKit, external: true },
      ],
    },
    {
      label: t('columns.community'),
      links: [
        { label: t('xTwitter'), href: LINKS.twitter, external: true },
        { label: t('telegram'), href: LINKS.telegram, external: true },
        { label: t('medium'), href: LINKS.medium, external: true },
      ],
    },
  ];

  const legalLinks: FooterLink[] = [
    { label: t('terms'), href: '/terms', external: false },
    { label: t('privacy'), href: '/privacy', external: false },
  ];

  const linkClass =
    'text-sm text-text-secondary transition-colors hover:text-text-primary';

  const renderLink = ({ label, href, external }: FooterLink) =>
    external ? (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {label}
      </a>
    ) : (
      <Link key={label} href={href} className={linkClass}>
        {label}
      </Link>
    );

  return (
    <footer className="relative overflow-hidden border-t border-border-default bg-bg-secondary/50">
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Salmon Wallet"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <Image
                src="/images/app-title.png"
                alt="Salmon"
                width={90}
                height={22}
                className="h-4 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm text-text-tertiary">{t('description')}</p>
          </div>

          {columns.map(({ label, links }) => (
            <nav key={label} aria-label={label} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-text-primary">{label}</h2>
              {links.map(renderLink)}
            </nav>
          ))}
        </div>

        {/* Copyright left, legal right */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border-default/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-tertiary">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">{legalLinks.map(renderLink)}</div>
        </div>
      </div>
    </footer>
  );
}
