"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
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
    image: "/projects/placeholder.svg",
    githubUrl: "https://github.com/yvette809",
    footer: "Ongoing · Thesis project",
    featured: true,
  },
  {
    number: "02",
    title: "Awareness Statistics Dashboard",
    description:
      "Built independently during internship at Nobicon AB. Hierarchical profile trees with recursive CTE queries, dark-themed UI, and mock-data fallback for demos.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "/projects/placeholder.svg",
    footer: "Nobicon AB · 2025",
  },
  {
    number: "03",
    title: "Airbnb Clone",
    description:
      "Full-featured property rental platform with authentication, Stripe payments, global search, and map integration. Deployed live on Vercel.",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    image: "/projects/placeholder.svg",
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
    image: "/projects/placeholder.svg",
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
    image: "/projects/placeholder.svg",
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
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-28 px-[5vw] bg-bg2 relative z-[2]"
    >
      <div className="flex justify-between items-end mb-10 md:mb-16 flex-wrap gap-4">
        <div>
          <div className="section-label reveal font-mono text-xs text-mint uppercase tracking-[0.2em] mb-3">
            Selected work
          </div>
          <h2
            className="reveal font-head font-extrabold text-white tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
          >
            Things I&apos;ve built.
          </h2>
        </div>
        <a
          href="https://github.com/yvette809"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal font-mono text-xs sm:text-sm border border-faint text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:border-mint hover:bg-[var(--mint-dim)] transition-all tracking-[0.05em]"
        >
          View all on GitHub →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
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
        className={`relative overflow-hidden bg-bg3 ${
          project.featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-4 left-5 font-mono text-[0.7rem] text-mint tracking-[0.1em] z-[2] bg-[rgba(7,9,15,0.7)] backdrop-blur-sm px-2 py-1 rounded-sm">
          {project.number}
        </div>

        {/* Desktop hover buttons */}
        <div className="hidden md:flex absolute top-4 right-5 gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-[2]">
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

        {/* Mobile: always-visible buttons */}
        <div className="md:hidden absolute bottom-3 right-3 flex gap-2 z-[2]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] bg-[rgba(7,9,15,0.9)] text-mint border border-mint/40 px-2 py-1 rounded-sm backdrop-blur-md"
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] bg-[rgba(7,9,15,0.9)] text-mint border border-mint/40 px-2 py-1 rounded-sm backdrop-blur-md"
            >
              Code ↗
            </a>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
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
        <h3
          className={`font-head font-bold text-white mb-2 tracking-[-0.01em] ${
            project.featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-[1.7] flex-1">{project.description}</p>
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.07] font-mono text-[0.7rem] text-muted">
          <span className="truncate">{project.footer}</span>
          <span className="ml-auto text-mint transition-transform group-hover:translate-x-1 flex-shrink-0">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
