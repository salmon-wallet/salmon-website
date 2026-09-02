import { NextRequest, NextResponse } from 'next/server';
import { acceptsJson } from '@/lib/agent-content.mjs';
import { consumeRateLimit, rateLimitHeaders } from '@/lib/rate-limit.mjs';

const VERSION = '1';

const discovery = {
  name: 'Salmon Wallet',
  description: 'Open-source, self-custodial wallet infrastructure for Solana.',
  version: VERSION,
  website: 'https://salmonwallet.io/',
  agentIndex: 'https://salmonwallet.io/llms.txt',
  openapi: 'https://salmonwallet.io/openapi.json',
  developerDocs: 'https://salmonwallet.io/developers',
  about: 'https://salmonwallet.io/about',
  contact: 'https://salmonwallet.io/contact',
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
  const client = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'anonymous';
  const rateLimit = consumeRateLimit(client);
  const limitHeaders = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        type: 'https://salmonwallet.io/problems/rate-limit-exceeded',
        title: 'Too Many Requests',
        status: 429,
        detail: 'The discovery API allows 60 requests per minute per client.',
        code: 'rate_limit_exceeded',
      },
      {
        status: 429,
        headers: {
          ...VERSION_HEADERS,
          ...limitHeaders,
          'Content-Type': 'application/problem+json',
          'Retry-After': String(rateLimit.resetSeconds),
        },
      },
    );
  }

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
          ...limitHeaders,
          'Content-Type': 'application/problem+json',
        },
      },
    );
  }

  return NextResponse.json(discovery, { headers: { ...VERSION_HEADERS, ...limitHeaders } });
}
