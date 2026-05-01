"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "sv";
const STORAGE_KEY = "preferredCvLang";

interface Props {
  variant?: "primary" | "ghost" | "compact";
  onClick?: () => void;
}

export default function CVButton({ variant = "ghost", onClick }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const [showToggle, setShowToggle] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check localStorage for saved preference
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "sv") {
      setLang(saved);
      return;
    }
    // 2. Otherwise auto-detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage || "en";
    setLang(browserLang.toLowerCase().startsWith("sv") ? "sv" : "en");
  }, []);

  function selectLang(newLang: Lang, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    setShowToggle(false);
  }

  // Hide on initial render to avoid hydration mismatch
  if (!mounted) {
    return <CVButtonShell variant={variant} lang="en" />;
  }

  const cvPath = lang === "sv" ? "/cv-sv.pdf" : "/cv-en.pdf";
  const flag = lang === "sv" ? "🇸🇪" : "🇬🇧";

  // ─── PRIMARY (hero button — solid mint) ─────────────────────
  if (variant === "primary") {
    return (
      <div className="relative inline-flex items-stretch">
        <a
          href={cvPath}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={onClick}
          className="font-mono text-xs sm:text-sm border border-mint/30 text-mint pl-6 pr-4 sm:pl-8 sm:pr-5 py-3 rounded-l hover:bg-[var(--mint-dim)] hover:border-mint transition-all tracking-[0.05em] flex items-center gap-2"
        >
          <DownloadIcon />
          Download CV
          <span className="ml-1 opacity-70">{flag}</span>
        </a>
        <button
          type="button"
          aria-label="Switch CV language"
          onClick={(e) => {
            e.preventDefault();
            setShowToggle(!showToggle);
          }}
          className="font-mono text-xs border border-l-0 border-mint/30 text-mint px-2.5 rounded-r hover:bg-[var(--mint-dim)] hover:border-mint transition-all flex items-center"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <LangPopover
          show={showToggle}
          current={lang}
          onSelect={selectLang}
          onClose={() => setShowToggle(false)}
        />
      </div>
    );
  }

  // ─── COMPACT (desktop nav — minimal) ────────────────────────
  if (variant === "compact") {
    return (
      <div className="relative inline-flex items-center">
        <a
          href={cvPath}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={onClick}
          className="font-mono text-xs text-muted hover:text-mint transition-colors tracking-[0.05em] flex items-center gap-1.5"
          title={`Download CV (${lang === "sv" ? "Swedish" : "English"})`}
        >
          <DownloadIcon size={13} />
          CV <span className="opacity-70 text-[0.85em]">{flag}</span>
        </a>
        <button
          type="button"
          aria-label="Switch CV language"
          onClick={(e) => {
            e.preventDefault();
            setShowToggle(!showToggle);
          }}
          className="ml-1 text-muted hover:text-mint transition-colors"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <LangPopover
          show={showToggle}
          current={lang}
          onSelect={selectLang}
          onClose={() => setShowToggle(false)}
        />
      </div>
    );
  }

  // ─── GHOST (mobile menu — bordered) ─────────────────────────
  return (
    <div className="relative inline-flex items-stretch">
      <a
        href={cvPath}
        target="_blank"
        rel="noopener noreferrer"
        download
        onClick={onClick}
        className="font-mono text-sm border border-mint/30 text-mint pl-6 pr-4 py-3 rounded-l-sm hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em] flex items-center gap-2"
      >
        <DownloadIcon />
        Download CV
        <span className="ml-1 opacity-70">{flag}</span>
      </a>
      <button
        type="button"
        aria-label="Switch CV language"
        onClick={(e) => {
          e.preventDefault();
          setShowToggle(!showToggle);
        }}
        className="font-mono text-xs border border-l-0 border-mint/30 text-mint px-2.5 rounded-r-sm hover:bg-[var(--mint-dim)] transition-all flex items-center"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <LangPopover
        show={showToggle}
        current={lang}
        onSelect={selectLang}
        onClose={() => setShowToggle(false)}
      />
    </div>
  );
}

/* ─── Tiny language popover ─────────────────────────────────── */
function LangPopover({
  show,
  current,
  onSelect,
  onClose,
}: {
  show: boolean;
  current: Lang;
  onSelect: (l: Lang, e: React.MouseEvent) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!show) return;
    const handler = () => onClose();
    setTimeout(() => document.addEventListener("click", handler), 0);
    return () => document.removeEventListener("click", handler);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="absolute top-full right-0 mt-2 bg-surface border border-white/[0.07] rounded-md shadow-2xl py-1.5 min-w-[160px] z-[200]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => onSelect("en", e)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left font-mono text-xs transition-colors ${
          current === "en" ? "text-mint bg-[var(--mint-dim)]" : "text-white/80 hover:bg-bg2"
        }`}
      >
        <span className="text-base leading-none">🇬🇧</span>
        <span>English</span>
        {current === "en" && <span className="ml-auto text-mint">✓</span>}
      </button>
      <button
        type="button"
        onClick={(e) => onSelect("sv", e)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left font-mono text-xs transition-colors ${
          current === "sv" ? "text-mint bg-[var(--mint-dim)]" : "text-white/80 hover:bg-bg2"
        }`}
      >
        <span className="text-base leading-none">🇸🇪</span>
        <span>Svenska</span>
        {current === "sv" && <span className="ml-auto text-mint">✓</span>}
      </button>
    </div>
  );
}

/* ─── Shell shown during SSR (prevents hydration mismatch) ──── */
function CVButtonShell({ variant, lang }: { variant: string; lang: Lang }) {
  if (variant === "compact") {
    return (
      <span className="font-mono text-xs text-muted flex items-center gap-1.5">
        <DownloadIcon size={13} />
        CV
      </span>
    );
  }
  return (
    <span className="font-mono text-xs sm:text-sm border border-mint/30 text-mint px-6 sm:px-8 py-3 rounded flex items-center gap-2 opacity-50">
      <DownloadIcon />
      Download CV
    </span>
  );
}

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
