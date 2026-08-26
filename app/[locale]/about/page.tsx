import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import InfoPage from '@/components/InfoPage';
import { infoPages } from '@/lib/info-pages';

export const metadata: Metadata = { title: 'About Salmon Wallet', description: 'Learn what Salmon Wallet builds, how integrations are reviewed, and how the open-source self-custodial project works.' };
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale); return <InfoPage {...infoPages.about} />;
}
