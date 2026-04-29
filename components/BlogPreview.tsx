"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { posts } from "@/lib/posts";

export default function BlogPreview() {
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

  const recentPosts = posts.slice(0, 3);

  return (
    <section id="blog" ref={ref} className="py-20 md:py-28 px-[5vw] relative z-[2]">
      <div className="flex justify-between items-end mb-10 md:mb-16 flex-wrap gap-4">
        <div>
          <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
            Writing
          </div>
          <h2
            className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
          >
            From the blog.
          </h2>
        </div>
        <Link
          href="/blog"
          className="reveal font-mono text-xs sm:text-sm border border-faint text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:border-mint hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em]"
        >
          All posts →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {recentPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="reveal project-card group bg-surface border border-white/[0.07] rounded-xl p-6 sm:p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(95,255,215,0.1)] flex flex-col"
            style={{ transitionDelay: `${(i + 1) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-5 font-mono text-[0.7rem] text-muted">
              <span>{formatDate(post.date)}</span>
              <span className="w-1 h-1 rounded-full bg-faint" />
              <span>{post.readTime}</span>
            </div>

            <h3 className="font-head text-lg sm:text-xl font-bold text-white mb-3 leading-tight tracking-[-0.01em] group-hover:text-mint transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-muted leading-[1.7] flex-1 mb-5">{post.excerpt}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.65rem] text-mint bg-[var(--mint-dim)] px-2.5 py-0.5 rounded-sm tracking-[0.04em]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.07] font-mono text-[0.72rem] text-muted">
              <span>Read article</span>
              <span className="ml-auto text-mint transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
