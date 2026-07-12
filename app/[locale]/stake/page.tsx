import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import ValidatorStats from '@/components/sections/ValidatorStats';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.stake' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? '/stake' : `/${locale}/stake`,
      languages: { 'en': '/stake', 'es': '/es/stake', 'pt': '/pt/stake' },
    },
  };
}

export default async function StakePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ValidatorStats />
      </main>
      <Footer />
    </>
  );
}
