import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LegalBody, legalLastUpdated, termsBlocks, type Locale } from '@/lib/legal-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? '/terms' : `/${locale}/terms`,
      languages: { 'en': '/terms', 'es': '/es/terms', 'pt': '/pt/terms' },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });
  const loc = (locale as Locale) in termsBlocks ? (locale as Locale) : 'en';

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold mb-8">{t('title').split(' — ')[0]}</h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">Last updated:</strong> {legalLastUpdated[loc]}
            </p>
            <LegalBody blocks={termsBlocks[loc]} locale={loc} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
