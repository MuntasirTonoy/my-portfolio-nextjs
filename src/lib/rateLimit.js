// Fixed-window, in-memory rate limiter.
// On serverless hosts each instance keeps its own counters, so this is a
// best-effort brake against bursts, not a hard guarantee. For stricter limits
// swap the store for Upstash Redis or similar.

const buckets = new Map();

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    pruneExpired(now);
    return { ok: true };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

function pruneExpired(now) {
  if (buckets.size < 1000) return;
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
