"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  {
    period: "2025 — Present",
    role: "Backend / Fullstack Developer (LIA Internship)",
    company: "Nobicon AB · Umeå, Sweden",
    points: [
      "Built a complete fullstack statistics platform for the Awareness product independently.",
      "Stack: React, Spring Boot, MySQL — delivered end-to-end with no supervision.",
      "Hierarchical profile trees using recursive CTE queries; dark-themed dashboard with mock-data fallback.",
    ],
  },
  {
    period: "2021 — 2024",
    role: "Full-Stack Developer",
    company: "Swedcon 18 AB · Sweden",
    points: [
      "Designed and maintained RESTful APIs with Spring Boot and Node.js in production.",
      "Built responsive UIs with React.js, Next.js, and Tailwind CSS.",
      "Implemented OAuth2 and JWT-based authentication systems.",
      "Automated deployment pipelines with GitHub Actions and CI/CD.",
    ],
  },
  {
    period: "2014 — 2020",
    role: "Accounting Economist",
    company: "NXT Accounting & Tax Services · Sweden",
    points: [
      "Managed bookkeeping, VAT, and tax declarations for multiple clients.",
      "Reduced reconciliation time by 30% through process optimisation.",
      "Deep understanding of business processes — directly applicable to software architecture decisions.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".timeline-item, .reveal")
              .forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-28 px-[5vw] bg-bg2 relative z-[2]">
      <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
        Career
      </div>
      <h2 className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Experience.
      </h2>

      <div className="mt-16 relative pl-8 max-w-4xl">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-faint" />
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="timeline-item relative mb-14 pl-10 opacity-0 -translate-x-5 [&.visible]:opacity-100 [&.visible]:translate-x-0 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="absolute -left-[35px] top-1.5 w-2.5 h-2.5 rounded-full bg-bg border-2 border-mint" />
            <div className="font-mono text-[0.72rem] text-mint tracking-[0.1em] uppercase mb-1.5">
              {item.period}
            </div>
            <h3 className="font-head text-xl font-bold text-white mb-1 tracking-[-0.01em]">
              {item.role}
            </h3>
            <div className="text-sm text-muted mb-4">{item.company}</div>
            <ul className="flex flex-col gap-1.5 list-none">
              {item.points.map((p, j) => (
                <li
                  key={j}
                  className="text-sm text-muted pl-5 relative leading-[1.6] before:content-['▸'] before:absolute before:left-0 before:text-mint before:text-xs before:top-[0.15em]"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
