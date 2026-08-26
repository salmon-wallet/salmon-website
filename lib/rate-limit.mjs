export const RATE_LIMIT = Object.freeze({ limit: 60, windowSeconds: 60 });

const windows = new Map();

export function consumeRateLimit(key, now = Date.now()) {
  const windowMs = RATE_LIMIT.windowSeconds * 1000;
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const existing = windows.get(key);
  const count = existing?.windowStart === windowStart ? existing.count + 1 : 1;
  windows.set(key, { windowStart, count });

  const resetSeconds = Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000));
  return {
    allowed: count <= RATE_LIMIT.limit,
    limit: RATE_LIMIT.limit,
    remaining: Math.max(0, RATE_LIMIT.limit - count),
    resetSeconds,
  };
}

export function rateLimitHeaders(result) {
  return {
    'RateLimit-Policy': `\"default\";q=${result.limit};w=${RATE_LIMIT.windowSeconds}`,
    'RateLimit': `\"default\";r=${result.remaining};t=${result.resetSeconds}`,
  };
}

export function clearRateLimits() {
  windows.clear();
}
