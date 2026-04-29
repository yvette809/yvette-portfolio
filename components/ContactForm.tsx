"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Reset to idle after 5s so user can send another message
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please email directly.");
    }
  }

  const inputClass =
    "w-full bg-bg2 border border-white/[0.07] rounded-md px-4 py-3 text-white text-sm placeholder:text-muted/60 font-body focus:outline-none focus:border-mint focus:bg-bg3 transition-colors disabled:opacity-50";

  const labelClass = "block font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-white/[0.07] rounded-xl p-8 max-w-2xl mx-auto text-left"
    >
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
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
          Subject <span className="text-muted/60 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="subject"
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
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className={`${inputClass} resize-y min-h-[140px]`}
          placeholder="Tell me about the role, project, or what you're working on..."
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="font-mono text-sm bg-mint text-[#07090F] font-medium px-8 py-3 rounded tracking-[0.05em] disabled:opacity-60 disabled:cursor-not-allowed hover:not(:disabled):-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(95,255,215,0.3)] transition-all flex items-center gap-2"
        >
          {status === "loading" && (
            <span className="inline-block w-3 h-3 border-2 border-[#07090F]/30 border-t-[#07090F] rounded-full animate-spin" />
          )}
          {status === "loading" && "Sending..."}
          {status === "idle" && "Send message →"}
          {status === "success" && "✓ Sent!"}
          {status === "error" && "Try again"}
        </button>

        {status === "success" && (
          <div className="font-mono text-xs text-mint">
            Thanks — I&apos;ll reply soon.
          </div>
        )}

        {status === "error" && (
          <div className="font-mono text-xs text-coral">{errorMsg}</div>
        )}
      </div>
    </form>
  );
}
