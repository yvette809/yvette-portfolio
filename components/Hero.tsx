"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Fullstack Developer",
  "Java Engineer",
  "React Developer",
  "Systems Builder",
];

export default function Hero() {
  const [text, setText] = useState("Fullstack Developer");

  useEffect(() => {
    let ri = 0,
      ci = ROLES[0].length,
      deleting = false;
    const tick = () => {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
        }
      }
      setTimeout(tick, deleting ? 50 : 90);
    };

    const start = setTimeout(tick, 2500);
    return () => clearTimeout(start);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-[5vw] overflow-hidden pt-20"
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(var(--faint) 1px, transparent 1px), linear-gradient(90deg, var(--faint) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div
        className="absolute -top-[20%] -left-[10%] pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(95,255,215,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[5%] pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(255,123,107,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-[2] max-w-[900px]">
        <div className="hero-tag font-mono text-[0.7rem] sm:text-xs text-mint uppercase tracking-[0.15em] mb-6 fade-up delay-200">
          Available for new opportunities
        </div>

        <h1
          className="font-head font-extrabold leading-[1.0] tracking-[-0.03em] text-white mb-2 fade-up delay-300"
          style={{ fontSize: "clamp(2.6rem, 8vw, 7rem)" }}
        >
          Yvette
          <br />
          <span className="text-mint">Tanila</span>
        </h1>

        <p
          className="font-head font-medium text-muted mb-6 sm:mb-8 fade-up delay-500"
          style={{ fontSize: "clamp(1.3rem, 4vw, 3rem)" }}
        >
          {text}
          <span className="inline-block w-[3px] h-[1em] bg-mint align-middle ml-1 animate-pulse" />
        </p>

        <p className="text-sm sm:text-base text-muted max-w-[560px] leading-[1.8] mb-10 sm:mb-12 fade-up delay-600">
          I build fast, scalable, and beautiful web applications — from Java backends to React
          frontends. Based in Umeå, Sweden. Currently completing my Java Systems Developer degree.
        </p>

        <div className="flex gap-3 sm:gap-5 flex-wrap fade-up delay-800">
          <a
            href="#projects"
            className="font-mono text-xs sm:text-sm bg-mint text-[#07090F] font-medium px-6 sm:px-8 py-3 rounded transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(95,255,215,0.3)] tracking-[0.05em]"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="font-mono text-xs sm:text-sm border border-faint text-white px-6 sm:px-8 py-3 rounded hover:border-mint hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em]"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator (desktop only) */}
      <div className="hidden md:flex absolute bottom-12 left-[5vw] items-center gap-3 font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] fade-up delay-1200">
        <div className="scroll-line" />
        Scroll to explore
      </div>

      {/* Stats */}
      <div className="hidden sm:flex absolute bottom-8 md:bottom-12 right-[5vw] gap-6 md:gap-12 fade-up delay-1000">
        <div className="text-right">
          <div className="font-head font-extrabold text-white text-2xl md:text-[2.2rem] leading-none">
            3<span className="text-mint">+</span>
          </div>
          <div className="font-mono text-[0.65rem] md:text-[0.7rem] text-muted uppercase tracking-[0.1em] mt-1">
            Years
          </div>
        </div>
        <div className="text-right">
          <div className="font-head font-extrabold text-white text-2xl md:text-[2.2rem] leading-none">
            10<span className="text-mint">+</span>
          </div>
          <div className="font-mono text-[0.65rem] md:text-[0.7rem] text-muted uppercase tracking-[0.1em] mt-1">
            Projects
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="font-head font-extrabold text-white text-2xl md:text-[2.2rem] leading-none">
            8<span className="text-mint">+</span>
          </div>
          <div className="font-mono text-[0.7rem] text-muted uppercase tracking-[0.1em] mt-1">
            Technologies
          </div>
        </div>
      </div>
    </section>
  );
}
