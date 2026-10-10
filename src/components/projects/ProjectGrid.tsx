"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { clsx } from "@/lib/clsx";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "research", "internship", "academic"];

export function ProjectGrid() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "rounded border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
              filter === f
                ? "border-green-acid/60 bg-green-acid/10 text-green-acid"
                : "border-purple-neon/20 text-text-muted hover:border-purple-neon/50 hover:text-text-primary",
            )}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
