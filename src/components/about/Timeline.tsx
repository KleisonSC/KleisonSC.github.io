"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { timeline, type TimelineType } from "@/data/timeline";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

const TYPE_COLOR: Record<TimelineType, string> = {
  education: "#a855f7",
  research: "#a3e635",
  experience: "#bef264",
};

export function Timeline() {
  const t = useTranslations("about.timeline");
  const [selected, setSelected] = useState(timeline[timeline.length - 1].id);
  const active = timeline.find((n) => n.id === selected)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            <span className="text-purple-neon">#</span> {t("title")}
          </h2>
          {/* Legend */}
          <div className="flex gap-4">
            {(["education", "research", "experience"] as TimelineType[]).map((type) => (
              <span key={type} className="flex items-center gap-1.5 font-mono text-[0.65rem] text-text-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: TYPE_COLOR[type] }}
                />
                {t(`types.${type}`)}
              </span>
            ))}
          </div>
        </div>
        <p className="mb-6 font-mono text-[0.7rem] text-text-muted">{t("hint")}</p>
      </Reveal>

      {/* Horizontal HUD track */}
      <div className="relative overflow-x-auto pb-4">
        <div className="relative flex min-w-max items-start gap-2 pt-8">
          {/* baseline */}
          <div className="absolute left-0 top-[2.35rem] h-px w-full bg-gradient-to-r from-purple-neon/50 via-purple-neon/30 to-transparent shadow-[0_0_8px_var(--purple-glow)]" />

          {timeline.map((node) => {
            const color = TYPE_COLOR[node.type];
            const isActive = node.id === selected;
            return (
              <button
                key={node.id}
                onClick={() => setSelected(node.id)}
                className="group relative flex w-28 flex-col items-center text-center"
              >
                {/* node dot */}
                <span
                  className={clsx(
                    "relative z-10 mb-3 h-3.5 w-3.5 rounded-full border-2 transition-transform",
                    isActive ? "scale-125" : "group-hover:scale-110",
                  )}
                  style={{
                    borderColor: color,
                    background: isActive ? color : "var(--color-bg-primary)",
                    boxShadow: isActive ? `0 0 10px ${color}` : "none",
                  }}
                >
                  {!isActive && (
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-40"
                      style={{ background: color }}
                    />
                  )}
                </span>
                <span
                  className={clsx(
                    "font-mono text-xs transition-colors",
                    isActive ? "text-text-primary" : "text-text-muted",
                  )}
                >
                  {node.year}
                </span>
                <span
                  className={clsx(
                    "mt-1 text-[0.65rem] leading-tight transition-colors",
                    isActive ? "text-green-acid" : "text-text-muted/70 group-hover:text-text-muted",
                  )}
                >
                  {t(`${node.id}.title`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded detail card */}
      <div className="mt-6 min-h-[8rem]">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-lg border p-6"
            style={{
              borderColor: `${TYPE_COLOR[active.type]}44`,
              background: "color-mix(in srgb, var(--color-bg-secondary) 60%, transparent)",
            }}
          >
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span
                className="rounded px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider"
                style={{ color: TYPE_COLOR[active.type], border: `1px solid ${TYPE_COLOR[active.type]}66` }}
              >
                {t(`types.${active.type}`)}
              </span>
              <span className="font-mono text-xs text-text-muted">{active.year}</span>
              {active.status && (
                <span className="rounded bg-green-acid/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-green-acid">
                  {t(`status.${active.status}`)}
                </span>
              )}
            </div>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {t(`${active.id}.title`)}
            </h3>
            <p className="font-mono text-xs text-green-acid/80">{t(`${active.id}.org`)}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted">
              {t(`${active.id}.desc`)}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
