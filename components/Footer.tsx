export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-[5vw] border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-3 relative z-[2]">
      <div className="font-mono text-[0.7rem] sm:text-[0.72rem] text-muted tracking-[0.05em] text-center sm:text-left">
        © {new Date().getFullYear()} Yvette Tanila Nchombua. All rights reserved.
      </div>
      <div className="font-mono text-[0.7rem] sm:text-[0.72rem] text-muted text-center sm:text-right">
        Built with <span className="text-mint">♥</span> using Next.js &amp; Tailwind.
      </div>
    </footer>
  );
}
