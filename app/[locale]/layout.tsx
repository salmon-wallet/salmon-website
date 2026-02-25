import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/lib/i18n/routing';
import { dmSans, dmMono } from '../layout';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'wallet, crypto, open-source, multi-blockchain, salmon wallet',
    metadataBase: new URL('https://salmonwallet.io'),
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'es': '/es',
        'pt': '/pt',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      images: [{
        url: '/images/sharing-og.png',
        width: 1200,
        height: 630,
        alt: 'Salmon Wallet'
      }],
      type: 'website',
      url: locale === 'en' ? 'https://salmonwallet.io/' : `https://salmonwallet.io/${locale}`,
      siteName: 'Salmon Wallet',
      locale: locale === 'es' ? 'es_AR' : locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: 'summary',
      site: '@salmonwallet',
      creator: '@salmonwallet',
      title: t('title'),
      description: t('ogDescription'),
      images: [{
        url: '/images/sharing-og.png',
        alt: 'Salmon makes crypto easy & safe—store, buy, send, receive, and swap tokens, and manage NFTs.'
      }],
    },
    icons: {
      icon: '/favicon.ico',
    },
    other: {
      'article:author': 'Salmon',
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQYGS0LPNH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YQYGS0LPNH');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Salmon Wallet',
                url: 'https://salmonwallet.io',
                logo: 'https://salmonwallet.io/images/app-icon.png',
                sameAs: [
                  'https://x.com/salmonwallet',
                  'https://github.com/salmon-wallet',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Salmon Wallet',
                url: 'https://salmonwallet.io',
              },
            ]),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
