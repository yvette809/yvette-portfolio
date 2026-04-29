import Link from "next/link";
import { posts } from "@/lib/posts";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — Yvette Tanila Nchombua",
  description: "Writing on software architecture, career, and engineering practice.",
};

export default function BlogPage() {
  return (
    <>
      <CustomCursor />
      <Nav />

      <section className="pt-40 pb-20 px-[5vw] relative z-[2]">
        <Link
          href="/"
          className="font-mono text-xs text-muted hover:text-mint transition-colors mb-8 inline-flex items-center gap-2"
        >
          ← Back to home
        </Link>

        <div className="font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3 section-label">
          Writing
        </div>
        <h1
          className="font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)" }}
        >
          The Blog.
        </h1>
        <p className="text-base text-muted max-w-[600px] leading-[1.8] mb-16">
          Notes from my work as a developer — architecture decisions, career reflections, and technical deep-dives.
        </p>

        <div className="flex flex-col gap-6 max-w-4xl">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface border border-white/[0.07] rounded-xl p-8 hover:border-mint/30 hover:bg-bg3 transition-all"
            >
              <div className="flex items-center gap-3 mb-4 font-mono text-[0.72rem] text-muted">
                <span>{formatDate(post.date)}</span>
                <span className="w-1 h-1 rounded-full bg-faint" />
                <span>{post.readTime}</span>
              </div>

              <h2 className="font-head text-2xl font-bold text-white mb-3 leading-tight tracking-[-0.01em] group-hover:text-mint transition-colors">
                {post.title}
              </h2>

              <p className="text-base text-muted leading-[1.7] mb-5">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 items-center">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] text-mint bg-[var(--mint-dim)] px-2.5 py-1 rounded-sm tracking-[0.04em]"
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto font-mono text-[0.72rem] text-mint group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
