import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API route.
 *
 * To wire this up to a real email service, add ONE of the following:
 *
 * 1. RESEND (recommended — clean, fast, free tier)
 *    npm install resend
 *    Add RESEND_API_KEY to .env.local
 *    Uncomment the Resend block below.
 *
 * 2. WEB3FORMS (no signup, just an access key from web3forms.com)
 *    Add WEB3FORMS_KEY to .env.local
 *    Uncomment the Web3Forms block below.
 *
 * 3. FORMSPREE (paid for forms, easy)
 *    Replace this whole route with a direct form post to formspree.
 *
 * Out of the box, this route validates and logs the message to the server
 * console — perfect for testing the UI before wiring delivery.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // ── Validation ────────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message is too short — say a bit more!" },
        { status: 400 }
      );
    }

    // ── 1. RESEND ─────────────────────────────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Portfolio Contact <onboarding@resend.dev>",
    //   to: "nchombuayvta@gmail.com",
    //   subject: `[Portfolio] ${subject || "New message from " + name}`,
    //   replyTo: email,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // });

    // ── 2. WEB3FORMS ──────────────────────────────────────────────
    // await fetch("https://api.web3forms.com/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     access_key: process.env.WEB3FORMS_KEY,
    //     name, email, subject, message,
    //   }),
    // });

    // ── Default: log to server console ────────────────────────────
    console.log("─── New contact form submission ───");
    console.log("From:", name, `<${email}>`);
    console.log("Subject:", subject || "(no subject)");
    console.log("Message:", message);
    console.log("───────────────────────────────────");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly." },
      { status: 500 }
    );
  }
}
