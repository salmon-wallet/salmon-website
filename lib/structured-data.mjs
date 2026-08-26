const BASE_URL = 'https://salmonwallet.io';

export function structuredData(locale = 'en') {
  const pageUrl = locale === 'en' ? `${BASE_URL}/` : `${BASE_URL}/${locale}`;
  const organizationId = `${BASE_URL}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Salmon Wallet',
        description: 'Open-source, self-custodial wallet infrastructure for Solana.',
        url: `${BASE_URL}/`,
        logo: `${BASE_URL}/images/app-icon.png`,
        email: 'integrations@salmonwallet.io',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'integrations@salmonwallet.io',
          contactType: 'integrations and product enquiries',
          availableLanguage: ['English', 'Spanish', 'Portuguese'],
        },
        sameAs: ['https://x.com/salmonwallet', 'https://github.com/Salmon-HQ'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${BASE_URL}/#software`,
        name: 'Salmon Wallet',
        description: 'An open-source, self-custodial Solana wallet available on the web, Android, and as a browser extension.',
        url: pageUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web, Android, Chrome',
        isAccessibleForFree: true,
        publisher: { '@id': organizationId },
        downloadUrl: [
          'https://v2.salmonwallet.io/',
          'https://chromewebstore.google.com/detail/salmon-wallet/ejbidfepgijlcgahbmbckmnaljagjoll',
          'https://play.google.com/store/apps/details?id=io.salmonwallet.app',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Salmon Wallet',
        description: 'Official website for Salmon Wallet and its open Solana wallet infrastructure.',
        url: pageUrl,
        publisher: { '@id': organizationId },
        inLanguage: locale,
      },
    ],
  };
}
