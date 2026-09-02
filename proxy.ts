import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';
import {
    markdownForRoute,
    markdownNotFound,
    prefersMarkdown,
    routeDetails,
    withVary,
} from './lib/agent-content.mjs';

const intlMiddleware = createMiddleware(routing);

const MARKDOWN_HEADERS = {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Vary': 'Accept, Accept-Encoding',
    'Cache-Control': 'public, max-age=0, must-revalidate',
};

export function proxy(request: NextRequest) {
    const route = routeDetails(request.nextUrl.pathname);

    if (prefersMarkdown(request.headers.get('accept') ?? '')) {
        if (!route) {
            return new NextResponse(markdownNotFound(request.nextUrl.pathname), {
                status: 404,
                headers: MARKDOWN_HEADERS,
            });
        }

        return new NextResponse(markdownForRoute(route), {
            status: 200,
            headers: {
                ...MARKDOWN_HEADERS,
                'Content-Language': route.locale,
            },
        });
    }

    const response = intlMiddleware(request);
    response.headers.set('Vary', withVary(response.headers.get('Vary'), 'Accept'));
    return response;
}

export const config = {
    matcher: ['/', '/(en|es|pt)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
