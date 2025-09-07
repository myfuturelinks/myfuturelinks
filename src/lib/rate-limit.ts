// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

// Change if you want a different lockout window
const COOLDOWN_SECONDS = Number(process.env.CONTACT_COOLDOWN_SECONDS || 60);

// --- Shared Redis clients/limiters (use if Upstash is configured) ---
let redis: Redis | null = null;
let rlIp: Ratelimit | null = null;
let rlEmail: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  // 5 requests per minute per IP
  rlIp = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    prefix: "rl:ip",
  });

  // 1 request per COOLDOWN_SECONDS per email (cooldown)
  rlEmail = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(1, `${COOLDOWN_SECONDS} s` as any),
    prefix: "rl:email",
  });
}

// --- Memory fallbacks (for local dev or no Upstash) ---
const memIp = (global as any).__MEM_RL_IP__ ?? new Map<string, number[]>();
(global as any).__MEM_RL_IP__ = memIp;

const memEmail = (global as any).__MEM_RL_EMAIL__ ?? new Map<string, number>();
(global as any).__MEM_RL_EMAIL__ = memEmail;

function hashEmail(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function limitByIp(ip: string) {
  if (rlIp) {
    const r = await rlIp.limit(ip);
    return { ok: r.success, remaining: r.remaining };
  }
  const now = Date.now();
  const win = 60_000;
  const key = `ip:${ip}`;
  const arr = (memIp.get(key) ?? []).filter((t) => now - t < win);
  arr.push(now);
  memIp.set(key, arr);
  return { ok: arr.length <= 5, remaining: Math.max(0, 5 - arr.length) };
}

export async function cooldownByEmail(email: string) {
  const key = hashEmail(email);
  if (rlEmail) {
    const r = await rlEmail.limit(key);
    // r.reset is ms timestamp; compute seconds remaining (best-effort)
    const retryAfter =
      typeof (r as any).reset === "number"
        ? Math.max(0, Math.ceil(((r as any).reset - Date.now()) / 1000))
        : COOLDOWN_SECONDS;
    return { ok: r.success, retryAfter };
  }

  // memory fallback
  const now = Date.now();
  const k = `em:${key}`;
  const last = memEmail.get(k) ?? 0;
  const diff = now - last;
  if (diff < COOLDOWN_SECONDS * 1000) {
    const retryAfter = Math.ceil((COOLDOWN_SECONDS * 1000 - diff) / 1000);
    return { ok: false, retryAfter };
  }
  memEmail.set(k, now);
  return { ok: true, retryAfter: COOLDOWN_SECONDS };
}
