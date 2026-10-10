"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { GlitchText } from "@/components/ui/GlitchText";
import { ArrowRightIcon } from "@/components/ui/icons";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const title = t(`items.${project.slug}.title`);

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="hover"
      className="group relative flex flex-col overflow-hidden rounded-lg border border-purple-neon/15 bg-bg-secondary/40 transition-all hover:border-green-acid/40 hover:box-glow-green"
    >
      {/* Visual with neon overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectVisual
          slug={project.slug}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
        <div className="absolute inset-0 bg-purple-neon/0 mix-blend-overlay transition-colors duration-300 group-hover:bg-purple-neon/20" />

        {/* category + status badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded bg-bg-primary/70 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-purple-neon backdrop-blur">
            {t(`categories.${project.category}`)}
          </span>
          {project.status === "ongoing" && (
            <span className="rounded bg-green-acid/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-green-acid backdrop-blur">
              {t("ongoing")}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 font-mono text-[0.65rem] text-text-muted">
          {project.period} · {project.location}
        </div>
        <GlitchText
          as="h3"
          text={title}
          onHover
          className="font-display text-lg font-semibold leading-snug text-text-primary"
        />
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-text-muted">
          {t(`items.${project.slug}.summary`)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-purple-neon/25 px-2 py-0.5 font-mono text-[0.6rem] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-green-acid opacity-0 transition-opacity group-hover:opacity-100">
          {t("viewProject")}
          <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
