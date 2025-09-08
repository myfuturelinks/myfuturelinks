// src/app/api/contact/route.ts
// Provider: Resend (requires RESEND_API_KEY and a VERIFIED MAIL_FROM domain)

import { NextResponse } from "next/server";
import { z } from "zod";
import { stripCRLF, clamp } from "@/lib/sanitize";
import { limitByIp, cooldownByEmail } from "@/lib/rate-limit";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---- Validation schema for incoming body ----
const BodySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  category: z.enum(["Category", "Work", "Study"]),
  message: z.string().min(10).max(2000),
  phoneE164: z
    .string()
    .regex(/^\+\d{6,15}$/)
    .optional(),
  company: z.string().optional(), // honeypot (should be empty)
  tsToken: z.string().optional(), // optional Turnstile token
});

// ---- Optional Turnstile verification (only enforced if secret key is set) ----
async function verifyTurnstile(token?: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not enabled
  if (!token) return false;

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const r = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
    }
  );
  const j = await r.json();
  return j.success === true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      (req as any).ip ||
      "0.0.0.0";

    // 1) Per-IP rate limit (5/min from our helper)
    const rl = await limitByIp(ip);
    if (!rl.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please try again in a minute.",
        },
        { status: 429 }
      );
    }

    // 2) Validate payload
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const body = parsed.data;

    // 3) Honeypot (bots fill hidden field)
    if (body.company && body.company.length > 0) {
      return NextResponse.json({ ok: true }); // silently accept
    }

    // 4) Optional captcha
    const passed = await verifyTurnstile(body.tsToken, ip);
    if (!passed) {
      return NextResponse.json(
        { ok: false, error: "Bot check failed" },
        { status: 403 }
      );
    }

    // 5) Per-email cooldown (default 60s)
    const cool = await cooldownByEmail(body.email);
    if (!cool.ok) {
      // return a machine-friendly code + seconds so the UI can show a nice message
      return NextResponse.json(
        { ok: false, code: "COOLDOWN", retryAfter: cool.retryAfter },
        { status: 429 }
      );
    }

    // 6) Prepare email
    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO_EMAIL not set" },
        { status: 500 }
      );
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY not set" },
        { status: 500 }
      );
    }

    // Sender must be on your VERIFIED Resend domain
    const from =
      process.env.MAIL_FROM || "MyFutureLinks <onboarding@resend.dev>";

    const safeName = clamp(stripCRLF(body.name), 80);
    const safeCat = clamp(stripCRLF(body.category), 16);

    const text =
      `Name: ${safeName}\n` +
      `Email: ${body.email}\n` +
      (body.phoneE164 ? `Phone: ${body.phoneE164}\n` : "") +
      `Category: ${safeCat}\n\n` +
      clamp(body.message, 2000) +
      "\n";

    // 7) Send with Resend
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `New ${safeCat} enquiry — ${safeName}`,
      reply_to: body.email, // camelCase for Resend SDK
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
