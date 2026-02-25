import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Salmon Wallet',
    short_name: 'Salmon',
    description: 'The open-source, multi-chain crypto wallet.',
    start_url: '/',
    display: 'standalone',
    background_color: '#10131c',
    theme_color: '#10131c',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/images/app-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
