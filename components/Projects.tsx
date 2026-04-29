"use client";

import { useEffect, useRef } from "react";

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  bg: string;
  liveUrl?: string;
  githubUrl?: string;
  footer: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    number: "01 — Featured",
    title: "AI Movie Studio",
    description:
      "Full-stack SaaS platform for AI-driven film production. 6-step pipeline wizard — Characters → Script → Scenes → Storyboard → Video → Final Movie. Storyboard-first architecture keeps costs low during iteration. JWT auth, Flyway migrations, FFmpeg assembly. Thesis project with commercial potential.",
    tags: ["Java 21", "Spring Boot", "Next.js", "OpenAI API", "AWS S3", "MySQL"],
    icon: "🎬",
    bg: "linear-gradient(135deg,#0D1117 0%,#1a0a2e 60%,#0D1117 100%)",
    githubUrl: "https://github.com/yvette809",
    footer: "Ongoing · Thesis project",
    featured: true,
  },
  {
    number: "02",
    title: "Awareness Statistics Dashboard",
    description:
      "Built independently during internship at Nobicon AB. Hierarchical profile trees with recursive CTE queries, dark-themed UI, and mock-data fallback for seamless demos.",
    tags: ["React", "Spring Boot", "MySQL"],
    icon: "📊",
    bg: "linear-gradient(135deg,#071210 0%,#062a1f 100%)",
    footer: "Nobicon AB · 2025",
  },
  {
    number: "03",
    title: "Airbnb Clone",
    description:
      "Full-featured property rental platform with authentication, Stripe payments, global search, and map integration. Deployed live on Vercel.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    icon: "🏡",
    bg: "linear-gradient(135deg,#150a07 0%,#2a1508 100%)",
    liveUrl: "https://airbnb-arnl.vercel.app",
    githubUrl: "https://github.com/yvette809/airbnbActivity",
    footer: "airbnb-arnl.vercel.app",
  },
  {
    number: "04",
    title: "Activity Finder",
    description:
      "Platform for discovering and booking local activities. Integrated payment flow, responsive design, and clean UX.",
    tags: ["Next.js", "MongoDB", "Stripe"],
    icon: "🗺️",
    bg: "linear-gradient(135deg,#070d15 0%,#0a1a2e 100%)",
    liveUrl: "https://activity-finder-one.vercel.app",
    githubUrl: "https://github.com/yvette809/activity-finder",
    footer: "activity-finder-one.vercel.app",
  },
  {
    number: "05",
    title: "Beach Resort",
    description:
      "Property showcase website with room browsing, availability checking, and content management API integration.",
    tags: ["React", "Content API"],
    icon: "🏖️",
    bg: "linear-gradient(135deg,#070f15 0%,#082030 100%)",
    liveUrl: "https://beach4-resort1.netlify.app",
    githubUrl: "https://github.com/yvette809/Resort",
    footer: "beach4-resort1.netlify.app",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

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
    <section id="projects" ref={ref} className="py-28 px-[5vw] bg-bg2 relative z-[2]">
      <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
        <div>
          <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
            Selected work
          </div>
          <h2 className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
            Things I&apos;ve built.
          </h2>
        </div>
        <a
          href="https://github.com/yvette809"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal font-mono text-sm border border-faint text-white px-8 py-3 rounded hover:border-mint hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em]"
        >
          View all on GitHub →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.number} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`project-card reveal bg-surface border border-white/[0.07] rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(95,255,215,0.1)] flex flex-col group ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-bg3 flex items-center justify-center ${
          project.featured ? "h-60" : "h-48"
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-600 group-hover:scale-105"
          style={{ background: project.bg }}
        />
        <div className="absolute top-4 left-5 font-mono text-[0.7rem] text-mint/50 tracking-[0.1em] z-[2]">
          {project.number}
        </div>
        <div className="absolute top-4 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-[2]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] bg-[rgba(7,9,15,0.85)] text-mint border border-mint/30 px-2.5 py-1.5 rounded-sm backdrop-blur-md hover:bg-[var(--mint-dim)]"
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] bg-[rgba(7,9,15,0.85)] text-mint border border-mint/30 px-2.5 py-1.5 rounded-sm backdrop-blur-md hover:bg-[var(--mint-dim)]"
            >
              GitHub ↗
            </a>
          )}
        </div>
        <div className="text-5xl opacity-15 select-none relative z-[1]">{project.icon}</div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-1.5 flex-wrap mb-4">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[0.65rem] text-mint bg-[var(--mint-dim)] px-2.5 py-0.5 rounded-sm tracking-[0.04em]"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className={`font-head font-bold text-white mb-2 tracking-[-0.01em] ${project.featured ? "text-2xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-[1.7] flex-1">{project.description}</p>
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.07] font-mono text-[0.7rem] text-muted">
          <span>{project.footer}</span>
          <span className="ml-auto text-mint transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  );
}
