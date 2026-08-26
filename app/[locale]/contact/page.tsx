import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import InfoPage from '@/components/InfoPage';
import { infoPages } from '@/lib/info-pages';

export const metadata: Metadata = { title: 'Contact Salmon Wallet', description: 'Official contact guidance for Salmon Wallet integrations, product, privacy, and security enquiries.' };
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale); return <InfoPage {...infoPages.contact} />;
}
