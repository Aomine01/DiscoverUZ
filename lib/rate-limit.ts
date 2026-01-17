/**
 * Production-hardened rate limiting: Redis-first with bounded in-memory fallback
 * 
 * SECURITY ENHANCEMENTS:
 * - HMAC-based email hashing (prevents rainbow table attacks)
 * - Memory-bounded with FIFO eviction
 * - Observable fallback metrics for production monitoring
 * - Always-on enforcement (fail-secure)
 */

import crypto from "crypto";

export interface RateLimitResult {
    allowed: boolean;
    ttl?: number;
}

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 6;
const MAX_ENTRIES = 10000;

// 🔐 SECURITY: HMAC secret for email hashing (prevents precomputation attacks)
// Fail-secure: throw error if missing in production
if (!process.env.EMAIL_HMAC_KEY && process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: EMAIL_HMAC_KEY environment variable is required in production. Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
}
const EMAIL_HMAC_KEY = process.env.EMAIL_HMAC_KEY || "dev-only-key-not-for-production";

const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

// Tracking for observability
let fallbackStartTime: number | null = null;
let lastMetricsReport = Date.now();

export async function checkRateLimit(
    clientId: string,
    email?: string
): Promise<RateLimitResult> {
    const rateLimitKey = email
        ? `${clientId}:${hashEmail(email)}`
        : clientId;

    if (process.env.REDIS_URL) {
        try {
            // Use ioredis directly
            const Redis = (await import('ioredis')).default;
            const redis = new Redis(process.env.REDIS_URL);

            const key = `rl:contact:${rateLimitKey}`;
            const count = await redis.incr(key);

            if (count === 1) {
                await redis.expire(key, 60);
            }

            const ttl = await redis.ttl(key);

            // Disconnect after use (serverless-friendly)
            redis.disconnect();

            const result = {
                allowed: count <= MAX_REQUESTS,
                ttl: ttl > 0 ? ttl : undefined,
            };

            // ✅ Redis working - clear fallback state
            if (fallbackStartTime !== null) {
                const fallbackDuration = Date.now() - fallbackStartTime;
                console.warn(`[Rate Limit] Redis recovered after ${Math.round(fallbackDuration / 1000)}s`);
                fallbackStartTime = null;
            }

            // Track denied requests for observability
            if (!result.allowed) {
                trackMetric('rate_limit_denied', 1);
            }

            return result;
        } catch (error) {
            // ⚠️ Redis failure - track fallback
            if (fallbackStartTime === null) {
                fallbackStartTime = Date.now();
                console.error('[Rate Limit] Redis unavailable, using in-memory fallback:', error);
            }

            // Alert if fallback sustained > 5 minutes
            const fallbackDuration = Date.now() - fallbackStartTime;
            if (fallbackDuration > 5 * 60 * 1000) {
                trackMetric('rate_limit_fallback_sustained', 1, {
                    durationMinutes: Math.round(fallbackDuration / 60000)
                });
            } else {
                trackMetric('rate_limit_fallback_active', 1);
            }
        }
    }

    return checkInMemoryRateLimit(rateLimitKey);
}

function checkInMemoryRateLimit(clientId: string): RateLimitResult {
    const now = Date.now();
    const record = ipRequestMap.get(clientId);

    // Track memory usage for observability
    reportMetricsIfNeeded();

    // Memory cap with FIFO eviction
    if (!record && ipRequestMap.size >= MAX_ENTRIES) {
        const oldestKey = ipRequestMap.keys().next().value;
        if (oldestKey) {
            ipRequestMap.delete(oldestKey);
            console.warn(`[Rate Limit] Memory cap reached (${MAX_ENTRIES}), evicted oldest entry`);
            trackMetric('rate_limit_memory_eviction', 1);
        }
    }

    if (!record || now > record.resetTime) {
        ipRequestMap.set(clientId, {
            count: 1,
            resetTime: now + WINDOW_MS,
        });
        return { allowed: true };
    }

    record.count++;
    ipRequestMap.set(clientId, record);

    if (record.count > MAX_REQUESTS) {
        const ttl = Math.ceil((record.resetTime - now) / 1000);
        trackMetric('rate_limit_denied', 1);
        return { allowed: false, ttl };
    }

    return { allowed: true };
}

/**
 * 🔐 HMAC-based email hashing (prevents rainbow table attacks)
 * 
 * WHY HMAC:
 * - Prevents offline precomputation of email → hash mappings
 * - Requires server-side secret to verify
 * - Changes with EMAIL_HMAC_KEY rotation
 * 
 * PRODUCTION: Set EMAIL_HMAC_KEY environment variable
 */
function hashEmail(email: string): string {
    return crypto
        .createHmac('sha256', EMAIL_HMAC_KEY)
        .update(email.toLowerCase().trim())
        .digest('hex')
        .substring(0, 8);
}

/**
 * Report metrics periodically (not on every request)
 */
function reportMetricsIfNeeded() {
    const now = Date.now();
    if (now - lastMetricsReport > 60 * 1000) { // Every 60 seconds
        const memorySize = ipRequestMap.size;
        const memoryPercent = (memorySize / MAX_ENTRIES) * 100;

        trackMetric('rate_limit_memory_size', memorySize);

        // Alert at 80% capacity
        if (memoryPercent >= 80) {
            trackMetric('rate_limit_memory_high', 1, {
                size: memorySize,
                percent: Math.round(memoryPercent)
            });
        }

        lastMetricsReport = now;
    }
}

/**
 * Metrics tracking hook (implement with your monitoring system)
 * 
 * EXAMPLES:
 * - Datadog: statsd.increment('rate_limit_denied')
 * - Prometheus: rateLimitDenied.inc()
 * - CloudWatch: putMetricData(...)
 */
function trackMetric(name: string, value: number, tags?: Record<string, any>) {
    // TODO: Wire to your monitoring system
    // console.log(`[Metric] ${name}=${value}`, tags);

    // PLACEHOLDER - Replace with actual implementation:
    /*
    if (typeof window === 'undefined') {
        // Datadog example
        const StatsD = require('hot-shots');
        const statsd = new StatsD();
        statsd.increment(name, value, tags);
        
        // Or Prometheus example
        // prometheusClient.counter({ name }).inc(value);
    }
    */
}

// Cleanup interval (prevent memory leaks)
if (typeof window === 'undefined') {
    setInterval(() => {
        const now = Date.now();
        let cleanedCount = 0;

        for (const [key, value] of ipRequestMap.entries()) {
            if (now > value.resetTime) {
                ipRequestMap.delete(key);
                cleanedCount++;
            }
        }

        if (cleanedCount > 0) {
            console.log(`[Rate Limit] Cleaned ${cleanedCount} expired entries`);
        }
    }, 5 * 60 * 1000);
}
