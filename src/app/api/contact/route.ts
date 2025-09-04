import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { limitByIp } from "@/lib/rate-limit";
import { stripCRLF, clamp } from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

const BodySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  category: z.enum(["Category", "Work", "Study"]),
  message: z.string().min(10).max(2000),
  phoneE164: z
    .string()
    .regex(/^\+\d{6,15}$/)
    .optional(),
  company: z.string().optional(), // honeypot
  tsToken: z.string().optional(), // Turnstile (optional)
});

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

    // Rate limit
    const rl = await limitByIp(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    // Validate
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const body = parsed.data;

    // Honeypot
    if (body.company && body.company.length > 0) {
      return NextResponse.json({ ok: true }); // silently drop
    }

    // Optional Turnstile verification (only enforced if secret key is set)
    const passed = await verifyTurnstile(body.tsToken, ip);
    if (!passed) {
      return NextResponse.json(
        { ok: false, error: "Bot check failed" },
        { status: 403 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO_EMAIL not set" },
        { status: 500 }
      );
    }

    // Prevent email header injection / overly long subjects
    const safeName = clamp(stripCRLF(body.name), 80);
    const safeCat = clamp(stripCRLF(body.category), 16);

    await resend.emails.send({
      from: "MyFutureLinks <onboarding@resend.dev>",
      to: [to],
      subject: `New ${safeCat} enquiry — ${safeName}`,
      reply_to: body.email,
      text:
        `Name: ${safeName}\n` +
        `Email: ${body.email}\n` +
        (body.phoneE164 ? `Phone: ${body.phoneE164}\n` : "") +
        `Category: ${safeCat}\n\n` +
        clamp(body.message, 2000) +
        "\n",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
