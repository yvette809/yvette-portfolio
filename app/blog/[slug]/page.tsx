import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Yvette Tanila Nchombua`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <CustomCursor />
      <Nav />

      <article className="pt-32 sm:pt-40 pb-20 px-[5vw] relative z-[2] max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="font-mono text-xs text-muted hover:text-mint transition-colors mb-8 inline-flex items-center gap-2"
        >
          ← Back to blog
        </Link>

        <div className="flex items-center gap-3 mb-6 font-mono text-[0.72rem] text-muted">
          <span>{formatDate(post.date)}</span>
          <span className="w-1 h-1 rounded-full bg-faint" />
          <span>{post.readTime}</span>
        </div>

        <h1
          className="font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
        >
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-10 sm:mb-12">
          {post.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[0.7rem] text-mint bg-[var(--mint-dim)] px-2.5 py-1 rounded-sm tracking-[0.04em]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="prose-content text-muted text-base sm:text-[1.05rem] leading-[1.9]">
          {renderContent(post.content)}
        </div>

        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.07] flex justify-between items-center flex-wrap gap-4">
          <Link
            href="/blog"
            className="font-mono text-sm text-muted hover:text-mint transition-colors"
          >
            ← All posts
          </Link>
          <a
            href="mailto:nchombuayvta@gmail.com"
            className="font-mono text-sm text-mint border border-mint/30 px-5 py-2 rounded-sm hover:bg-[var(--mint-dim)] transition-all"
          >
            Reach out →
          </a>
        </div>
      </article>

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

function renderContent(content: string) {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-head text-xl sm:text-2xl font-bold text-white mt-10 sm:mt-12 mb-4 tracking-[-0.01em]"
        >
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("```")) {
      const code = block.replace(/^```\w*\n?/, "").replace(/```$/, "");
      return (
        <pre
          key={i}
          className="bg-bg2 border border-white/[0.07] rounded-lg p-4 sm:p-5 overflow-x-auto my-6 font-mono text-xs sm:text-[0.85rem] text-mint"
        >
          <code>{code}</code>
        </pre>
      );
    }
    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").filter(Boolean);
      return (
        <ol key={i} className="list-decimal pl-6 my-5 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="leading-[1.8]">
              {renderInline(item.replace(/^\d+\.\s/, ""))}
            </li>
          ))}
        </ol>
      );
    }
    if (/^-\s/.test(block)) {
      const items = block.split("\n").filter(Boolean);
      return (
        <ul key={i} className="list-disc pl-6 my-5 space-y-2 marker:text-mint">
          {items.map((item, j) => (
            <li key={j} className="leading-[1.8]">
              {renderInline(item.replace(/^-\s/, ""))}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="my-5 leading-[1.9]">
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    const matches = [
      codeMatch ? { match: codeMatch, type: "code", index: codeMatch.index! } : null,
      boldMatch ? { match: boldMatch, type: "bold", index: boldMatch.index! } : null,
    ].filter(Boolean) as { match: RegExpMatchArray; type: string; index: number }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    matches.sort((a, b) => a.index - b.index);
    const first = matches[0];

    if (first.index > 0) parts.push(remaining.slice(0, first.index));

    if (first.type === "code") {
      parts.push(
        <code
          key={key++}
          className="font-mono text-[0.9em] bg-bg2 border border-white/[0.07] px-1.5 py-0.5 rounded text-mint"
        >
          {first.match[1]}
        </code>
      );
    } else if (first.type === "bold") {
      parts.push(
        <strong key={key++} className="text-white font-semibold">
          {first.match[1]}
        </strong>
      );
    }

    remaining = remaining.slice(first.index + first.match[0].length);
  }

  return parts;
}
