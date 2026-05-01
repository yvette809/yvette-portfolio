"use client";

import { useEffect, useState } from "react";
import CVButton from "./CVButton";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] transition-all duration-400 ${
          scrolled || open
            ? "bg-[rgba(7,9,15,0.92)] backdrop-blur-xl py-4 border-b border-white/[0.07]"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <a
          href="/"
          className="font-mono text-[0.85rem] text-mint tracking-[0.05em] z-[110]"
        >
          YTN.dev
        </a>

        <ul className="hidden md:flex gap-8 lg:gap-10 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs text-muted uppercase tracking-[0.08em] hover:text-mint transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <CVButton variant="compact" />
          <a
            href="mailto:nchombuayvta@gmail.com"
            className="font-mono text-xs border border-mint text-mint px-5 py-2 rounded-sm hover:bg-[var(--mint-dim)] transition-colors tracking-[0.05em]"
          >
            Hire me
          </a>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[110]"
        >
          <span
            className={`block w-6 h-[2px] bg-mint transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-mint transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-mint transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[105] bg-[rgba(7,9,15,0.98)] backdrop-blur-2xl transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center px-[5vw]">
          <ul className="flex flex-col gap-6 items-center mb-10">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-head text-3xl sm:text-4xl font-bold text-white hover:text-mint transition-all block ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDuration: "500ms",
                    transitionDelay: open ? `${i * 60 + 100}ms` : "0ms",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 items-center">
            <div
              className={`transition-all ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDuration: "500ms",
                transitionDelay: open ? `${links.length * 60 + 150}ms` : "0ms",
              }}
            >
              <CVButton variant="ghost" onClick={() => setOpen(false)} />
            </div>
            <a
              href="mailto:nchombuayvta@gmail.com"
              onClick={() => setOpen(false)}
              className={`font-mono text-sm border border-mint text-mint px-8 py-3 rounded-sm hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em] ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDuration: "500ms",
                transitionDelay: open ? `${links.length * 60 + 200}ms` : "0ms",
              }}
            >
              Hire me →
            </a>
          </div>

          <div
            className={`absolute bottom-12 left-0 right-0 text-center font-mono text-[0.7rem] text-muted tracking-[0.1em] uppercase transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            Umeå, Sweden · Available for hire
          </div>
        </div>
      </div>
    </>
  );
}
