export const RATE_LIMIT: Readonly<{ limit: number; windowSeconds: number }>;
export type RateLimitResult = { allowed: boolean; limit: number; remaining: number; resetSeconds: number };
export function consumeRateLimit(key: string, now?: number): RateLimitResult;
export function rateLimitHeaders(result: RateLimitResult): Record<string, string>;
export function clearRateLimits(): void;
