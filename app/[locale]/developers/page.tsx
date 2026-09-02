import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import InfoPage from '@/components/InfoPage';
import { infoPages } from '@/lib/info-pages';

export const metadata: Metadata = { title: 'Salmon Wallet API Docs & Developer Resources', description: 'OpenAPI, discovery API, rate limits, CLI, authentication status, and agent guidance for Salmon Wallet.' };
export default async function DevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale); return <InfoPage {...infoPages.developers} />;
}
