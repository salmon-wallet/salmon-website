import { NextRequest, NextResponse } from 'next/server';
import { acceptsJson } from '@/lib/agent-content.mjs';

const VERSION = '1';

const discovery = {
  name: 'Salmon Wallet',
  description: 'Open-source, self-custodial wallet infrastructure for Solana.',
  version: VERSION,
  website: 'https://salmonwallet.io/',
  agentIndex: 'https://salmonwallet.io/llms.txt',
  openapi: 'https://salmonwallet.io/openapi.json',
  source: 'https://github.com/Salmon-HQ/salmon-wallet-frontend',
  products: {
    webWallet: 'https://v2.salmonwallet.io/',
    browserExtension: 'https://chromewebstore.google.com/detail/salmon-wallet/ejbidfepgijlcgahbmbckmnaljagjoll',
    android: 'https://play.google.com/store/apps/details?id=io.salmonwallet.app',
  },
} as const;

const VERSION_HEADERS = {
  'API-Version': VERSION,
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
  'Vary': 'Accept, Accept-Encoding',
};

export function GET(request: NextRequest) {
  if (!acceptsJson(request.headers.get('accept') ?? '*/*')) {
    return NextResponse.json(
      {
        type: 'https://salmonwallet.io/problems/not-acceptable',
        title: 'Not Acceptable',
        status: 406,
        detail: 'This endpoint is available as application/json.',
        code: 'not_acceptable',
      },
      {
        status: 406,
        headers: {
          ...VERSION_HEADERS,
          'Content-Type': 'application/problem+json',
        },
      },
    );
  }

  return NextResponse.json(discovery, { headers: VERSION_HEADERS });
}
