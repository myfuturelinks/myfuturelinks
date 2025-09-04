import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let rl: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute per IP
  });
}

// Memory fallback for local/dev or if Redis not configured
const mem = (global as any).__MEM_RL__ ?? new Map<string, number[]>();
(global as any).__MEM_RL__ = mem;

export async function limitByIp(ip: string) {
  if (rl) {
    const r = await rl.limit(ip);
    return { ok: r.success, remaining: r.remaining };
  }
  const now = Date.now();
  const win = 60_000;
  const key = `ip:${ip}`;
  const arr = (mem.get(key) ?? []).filter((t) => now - t < win);
  arr.push(now);
  mem.set(key, arr);
  return { ok: arr.length <= 5, remaining: Math.max(0, 5 - arr.length) };
}
