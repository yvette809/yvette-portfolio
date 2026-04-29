"use client";

import { useEffect, useRef } from "react";

const EDU = [
  { year: "2024 — Ongoing", degree: "Java Systems Developer (YH)", school: "YH YrkesAkademin" },
  { year: "2024", degree: "DevOps Developer", school: "IT-högskolan" },
  { year: "2022 — 2024", degree: "Fullstack Developer (YH)", school: "Lernia Yrkeshögskolan" },
  { year: "2010 — 2012", degree: "MSc Business Administration", school: "Umeå University" },
  { year: "2020", degree: "Fullstack Web Development", school: "Strive School" },
  { year: "2004 — 2007", degree: "BSc Accounting", school: "University of Buea" },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} className="py-28 px-[5vw] relative z-[2]">
      <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
        Academic background
      </div>
      <h2 className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
        Education.
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mt-16">
        {EDU.map((e, i) => (
          <div
            key={i}
            className="reveal group bg-surface border border-white/[0.07] rounded-xl px-7 py-6 hover:border-mint/20 hover:bg-bg3 transition-all relative overflow-hidden"
            style={{ transitionDelay: `${(i + 1) * 80}ms` }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-mint scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-400" />
            <div className="font-mono text-[0.7rem] text-mint tracking-[0.1em] mb-2">{e.year}</div>
            <div className="font-head text-base font-bold text-white mb-1">{e.degree}</div>
            <div className="text-sm text-muted">{e.school}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
