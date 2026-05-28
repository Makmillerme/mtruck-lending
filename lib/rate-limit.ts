type RateLimitEntry = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const store = new Map<string, RateLimitEntry>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

interface ConsumeOptions {
  key: string;
  maxAttempts: number;
  windowMs: number;
  blockMs?: number;
}

export function consumeRateLimit({
  key,
  maxAttempts,
  windowMs,
  blockMs = 0,
}: ConsumeOptions): RateLimitResult {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, maxAttempts - 1),
      retryAfterSeconds: 0,
    };
  }

  if (current.blockedUntil && now < current.blockedUntil) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((current.blockedUntil - now) / 1000),
    };
  }

  current.count += 1;

  if (current.count > maxAttempts) {
    current.blockedUntil = now + blockMs;
    store.set(key, current);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((current.blockedUntil - now) / 1000),
    };
  }

  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(0, maxAttempts - current.count),
    retryAfterSeconds: 0,
  };
}
