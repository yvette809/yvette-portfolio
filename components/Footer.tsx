export default function Footer() {
  return (
    <footer className="py-8 px-[5vw] border-t border-white/[0.07] flex justify-between items-center relative z-[2] flex-wrap gap-4">
      <div className="font-mono text-[0.72rem] text-muted tracking-[0.05em]">
        © {new Date().getFullYear()} Yvette Tanila Nchombua. All rights reserved.
      </div>
      <div className="font-mono text-[0.72rem] text-muted">
        Built with <span className="text-mint">♥</span> using Next.js &amp; Tailwind.
      </div>
    </footer>
  );
}
