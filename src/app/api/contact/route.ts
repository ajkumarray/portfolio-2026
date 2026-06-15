import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // Placeholder-friendly: if Resend isn't configured yet, log and succeed so the
  // form is demoable. Set RESEND_API_KEY (+ CONTACT_TO_EMAIL) to send for real.
  if (!apiKey) {
    console.info("[contact] (not configured) message received:", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Please email me directly." },
      { status: 502 }
    );
  }
}
