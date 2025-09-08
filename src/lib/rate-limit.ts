// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

const COOLDOWN_SECONDS = Number(process.env.CONTACT_COOLDOWN_SECONDS ?? 60);

// ---------- Optional Redis-backed rate limiters ----------
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

// ---------- Strongly-typed in-memory fallbacks ----------
type GlobalWithRL = typeof global & {
  __MEM_RL_IP__?: Map<string, number[]>;
  __MEM_RL_EMAIL__?: Map<string, number>;
};

const g = global as GlobalWithRL;

const memIp: Map<string, number[]> =
  g.__MEM_RL_IP__ ?? new Map<string, number[]>();
g.__MEM_RL_IP__ = memIp;

const memEmail: Map<string, number> =
  g.__MEM_RL_EMAIL__ ?? new Map<string, number>();
g.__MEM_RL_EMAIL__ = memEmail;

// ---------- Helpers ----------
function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

// ---------- Public API ----------
export async function limitByIp(ip: string) {
  if (rlIp) {
    const r = await rlIp.limit(ip);
    return { ok: r.success, remaining: r.remaining };
  }

  const now = Date.now();
  const win = 60_000; // 1 minute window
  const key = `ip:${ip}`;

  const arr: number[] = memIp.get(key) ?? [];
  const recent: number[] = arr.filter((t: number) => now - t < win);
  recent.push(now);
  memIp.set(key, recent);

  return { ok: recent.length <= 5, remaining: Math.max(0, 5 - recent.length) };
}

export async function cooldownByEmail(email: string) {
  const key = hashEmail(email);

  if (rlEmail) {
    const r = await rlEmail.limit(key);
    const resetMs = (r as any).reset as number | undefined;
    const retryAfter =
      typeof resetMs === "number"
        ? Math.max(0, Math.ceil((resetMs - Date.now()) / 1000))
        : COOLDOWN_SECONDS;
    return { ok: r.success, retryAfter };
  }

  // Memory fallback
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
