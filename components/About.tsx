const STACK = [
  "Java 21", "Spring Boot", "React.js", "Next.js",
  "TypeScript", "MySQL", "Docker", "GitHub Actions",
  "Tailwind CSS", "MongoDB", "Node.js", "JWT / OAuth2",
];

export default function About() {
  return (
    <section id="about" className="py-28 px-[5vw] relative z-[2]">
      <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
        About me
      </div>
      <h2 className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Developer with a<br />business edge.
      </h2>

      <div className="grid md:grid-cols-2 gap-20 items-center mt-16">
        <div className="reveal">
          <p className="text-base text-muted leading-[1.9] mb-4">
            I&apos;m a <strong className="text-white font-medium">fullstack developer</strong> with a passion for
            building things that are both technically robust and genuinely useful. I specialise in{" "}
            <span className="text-mint">Java/Spring Boot</span> on the backend and{" "}
            <span className="text-mint">React/Next.js</span> on the frontend.
          </p>
          <p className="text-base text-muted leading-[1.9] mb-4">
            What sets me apart: an <strong className="text-white font-medium">MSc in Business Administration</strong>{" "}
            from Umeå University means I understand the business context behind the code — I don&apos;t just build
            features, I understand <em>why</em> they matter.
          </p>
          <p className="text-base text-muted leading-[1.9] mb-4">
            Currently completing my <strong className="text-white font-medium">Java Systems Developer YH degree</strong>{" "}
            and an internship at <strong className="text-white font-medium">Nobicon AB</strong>, where I independently
            built a fullstack statistics platform for their Awareness product. Open to new opportunities in agile teams.
          </p>

          <div className="flex gap-3 flex-wrap mt-8">
            {[
              { href: "https://github.com/yvette809", label: "↗ GitHub" },
              { href: "https://www.linkedin.com/in/yvette-tanila-nchombua-a8708b20/", label: "↗ LinkedIn" },
              { href: "mailto:nchombuayvta@gmail.com", label: "✉ Email me" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-mono text-xs text-mint border border-mint/25 px-4 py-2 rounded-sm tracking-[0.06em] hover:bg-[var(--mint-dim)] hover:border-mint transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div className="bg-surface border border-white/[0.07] rounded-xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px]"
                 style={{ background: "linear-gradient(90deg, transparent, var(--mint), transparent)" }} />
            <div className="grid grid-cols-2 gap-3">
              {STACK.map((item) => (
                <div
                  key={item}
                  className="stack-item font-mono text-[0.78rem] text-muted py-2.5 px-3 border border-white/[0.07] rounded bg-bg2 flex items-center gap-2 hover:border-mint hover:text-mint hover:bg-[var(--mint-dim)] transition-all"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-mint flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
