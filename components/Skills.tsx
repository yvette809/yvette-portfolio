"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  {
    title: "Backend",
    skills: ["Java 21", "Spring Boot", "Node.js", "Express.js", "REST API", "JUnit", "Flyway"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vue.js", "Zustand"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Prisma ORM"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Git", "AWS S3", "JWT / OAuth2", "Agile / Scrum"],
  },
];

const BARS = [
  { name: "React / Next.js", pct: 90 },
  { name: "Java / Spring Boot", pct: 85 },
  { name: "TypeScript", pct: 80 },
  { name: "MySQL / PostgreSQL", pct: 75 },
  { name: "Docker / CI/CD", pct: 70 },
  { name: "Node.js / Express", pct: 65 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [barsActive, setBarsActive] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal")
              .forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.12 }
    );

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setBarsActive(true);
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (visualRef.current) barObserver.observe(visualRef.current);

    return () => {
      sectionObserver.disconnect();
      barObserver.disconnect();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-[5vw] relative z-[2]">
      <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
        What I work with
      </div>
      <h2 className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Skills &amp; tools.
      </h2>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-20 mt-16 items-start">
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.title} className="reveal" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
              <div className="font-mono text-[0.72rem] text-mint uppercase tracking-[0.15em] mb-4">
                {cat.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="skill-pill font-mono text-[0.78rem] text-white bg-surface border border-white/[0.07] px-4 py-2 rounded-full hover:bg-[var(--mint-dim)] hover:border-mint hover:text-mint hover:-translate-y-0.5 transition-all"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={visualRef} className="reveal bg-surface border border-white/[0.07] rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-52 h-52 pointer-events-none"
               style={{ background: "radial-gradient(circle, rgba(95,255,215,0.08), transparent 70%)" }} />
          <div className="font-head text-base font-semibold text-white mb-7 relative">
            Proficiency overview
          </div>
          {BARS.map((bar) => (
            <div key={bar.name} className="mb-5">
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[0.75rem] text-muted">{bar.name}</span>
                <span className="font-mono text-[0.72rem] text-mint">{bar.pct}%</span>
              </div>
              <div className="h-[3px] bg-faint rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-[width] duration-1200 ease-out"
                  style={{
                    width: barsActive ? `${bar.pct}%` : "0%",
                    background: "linear-gradient(90deg, var(--mint), rgba(95,255,215,0.5))",
                    transitionDuration: "1.2s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
