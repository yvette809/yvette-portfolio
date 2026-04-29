"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(7,9,15,0.85)] backdrop-blur-xl py-4 border-b border-white/[0.07]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="font-mono text-[0.85rem] text-mint tracking-[0.05em]">YTN.dev</div>
      <ul className="hidden md:flex gap-10 list-none">
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
      <a
        href="mailto:nchombuayvta@gmail.com"
        className="font-mono text-xs border border-mint text-mint px-5 py-2 rounded-sm hover:bg-[var(--mint-dim)] transition-colors tracking-[0.05em]"
      >
        Hire me
      </a>
    </nav>
  );
}
