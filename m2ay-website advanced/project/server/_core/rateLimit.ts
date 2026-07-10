const attempts = new Map<string, { count: number; resetAt: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Basic brute-force protection for the single admin login endpoint.
 * Keyed by IP address, in-memory (fine for a single-instance free-tier deployment).
 */
export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000) };
  }

  record.count += 1;
  return { allowed: true };
}

export function resetLoginRateLimit(ip: string) {
  attempts.delete(ip);
}

// Periodically clear stale entries so this Map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of Array.from(attempts.entries())) {
    if (now > record.resetAt) attempts.delete(ip);
  }
}, WINDOW_MS).unref();
