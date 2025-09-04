import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, type, role, country, message, honey } =
      data ?? {};

    if (honey) return NextResponse.json({ ok: true }); // bot

    if (!name || !email || !type || !role || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to)
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO_EMAIL not set" },
        { status: 500 }
      );

    await resend.emails.send({
      from: "MyFutureLinks <onboarding@resend.dev>",
      to: [to],
      subject: `New ${type} application — ${name}`,
      reply_to: email,
      text:
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? "-"}\n` +
        `Type: ${type}\nRole/Program: ${role}\nCountry: ${country}\n\n` +
        `${message}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
