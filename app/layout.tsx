import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  // 300/600 are used by the hero phone mock (token change text, balance/labels)
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateViewport() {
  return { colorScheme: 'dark' as const, themeColor: '#ff7e6d' };
}

// Make font CSS variables available to locale layout
export { dmSans, dmMono };
