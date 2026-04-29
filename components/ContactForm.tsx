"use client";

import { useState, FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "loading" | "success" | "error";

// ── EmailJS config ────────────────────────────────────────────────
// Get these from https://dashboard.emailjs.com after signup:
// 1. Create a service (Gmail, Outlook, etc.)
// 2. Create an email template with variables: {{name}}, {{email}}, {{subject}}, {{message}}
// 3. Find your public key under Account → API Keys
// 4. Add allowed origin (your domain) under Account → Security
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (message.length < 10) {
      setStatus("error");
      setErrorMsg("Message is too short — say a bit more!");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "EmailJS is not configured. Add your keys to .env.local — see README."
      );
      return;
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, {
        publicKey: PUBLIC_KEY,
      });

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Scroll the success banner into view on mobile
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `Failed to send: ${err.message}`
          : "Failed to send. Please email me directly."
      );
    }
  }

  const inputClass =
    "w-full bg-bg2 border border-white/[0.07] rounded-md px-4 py-3 text-white text-sm placeholder:text-white/40 font-body focus:outline-none focus:border-mint focus:bg-bg3 transition-colors disabled:opacity-50";

  const labelClass =
    "block font-mono text-[0.72rem] text-white/70 uppercase tracking-[0.1em] mb-2";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-surface border border-white/[0.07] rounded-xl p-6 sm:p-8 max-w-2xl mx-auto text-left"
    >
      {/* ── Success banner at TOP ─────────────────────────────── */}
      {status === "success" && (
        <div
          className="mb-6 p-4 bg-mint/10 border border-mint/30 rounded-md flex items-center gap-3"
          style={{ animation: "fadeUp 0.4s ease forwards" }}
        >
          <span className="w-7 h-7 rounded-full bg-mint flex items-center justify-center text-[#07090F] font-bold text-sm flex-shrink-0">
            ✓
          </span>
          <div>
            <div className="font-mono text-sm text-mint font-medium">
              Message sent successfully!
            </div>
            <div className="font-body text-xs text-white/80 mt-0.5">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </div>
          </div>
        </div>
      )}

      {/* ── Error banner at TOP ───────────────────────────────── */}
      {status === "error" && (
        <div className="mb-6 p-4 bg-coral/10 border border-coral/30 rounded-md flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-coral flex items-center justify-center text-[#07090F] font-bold text-sm flex-shrink-0">
            !
          </span>
          <div>
            <div className="font-mono text-sm text-coral font-medium">
              Could not send message
            </div>
            <div className="font-body text-xs text-white/80 mt-0.5">{errorMsg}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className={labelClass}>
          Subject{" "}
          <span className="text-white/50 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={status === "loading"}
          className={inputClass}
          placeholder="Job opportunity, project, or just hello"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className={`${inputClass} resize-y min-h-[140px]`}
          placeholder="Tell me about the role, project, or what you're working on..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="font-mono text-sm bg-mint text-[#07090F] font-medium px-6 sm:px-8 py-3 rounded tracking-[0.05em] disabled:opacity-60 disabled:cursor-not-allowed hover:not(:disabled):-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(95,255,215,0.3)] transition-all flex items-center gap-2"
      >
        {status === "loading" && (
          <span className="inline-block w-3 h-3 border-2 border-[#07090F]/30 border-t-[#07090F] rounded-full animate-spin" />
        )}
        {status === "loading" ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
