import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-[5vw] bg-bg text-center relative overflow-hidden z-[2]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(95,255,215,0.05), transparent 65%)",
        }}
      />
      <div className="section-label font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3 inline-flex items-center justify-center">
        Let&apos;s work together
      </div>
      <h2
        className="font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-4"
        style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
      >
        Get in touch.
      </h2>
      <p className="text-base text-muted max-w-[500px] mx-auto mb-12 leading-[1.8]">
        I&apos;m actively looking for new opportunities. Whether you have a role, a project, or just want to say hello — drop me a message.
      </p>

      <div className="relative z-[2] mb-16">
        <ContactForm />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em]">
          Or reach out directly
        </div>
        <a
          href="mailto:nchombuayvta@gmail.com"
          className="font-head font-bold text-white tracking-[-0.01em] hover:text-mint transition-colors"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
        >
          nchombuayvta@gmail.com
        </a>

        <div className="flex justify-center gap-4 flex-wrap mt-4">
          {[
            {
              href: "https://www.linkedin.com/in/yvette-tanila-nchombua-a8708b20/",
              label: "LinkedIn",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ),
            },
            {
              href: "https://github.com/yvette809",
              label: "GitHub",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              ),
            },
            {
              href: "tel:+46760726885",
              label: "+46 760 726 885",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              ),
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-muted border border-white/[0.07] px-4 py-2 rounded-md hover:text-mint hover:border-mint hover:bg-[var(--mint-dim)] hover:-translate-y-0.5 transition-all"
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
