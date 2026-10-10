"use client";

import { useTranslations } from "next-intl";
import { phdTimeline } from "@/data/phd";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

const DOT: Record<string, string> = {
  done: "bg-green-acid border-green-acid",
  current: "bg-purple-neon border-purple-neon",
  upcoming: "bg-transparent border-text-muted",
};

export function PhdTimeline() {
  const t = useTranslations("phd.timeline");

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-8 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
      </Reveal>

      <ol className="relative ml-3 border-l border-purple-neon/25">
        {phdTimeline.map((phase, i) => (
          <Reveal key={phase.id} index={i} as="li">
            <div className="relative pb-10 pl-8">
              {/* node */}
              <span
                className={clsx(
                  "absolute -left-[0.47rem] top-1 h-3.5 w-3.5 rounded-full border-2",
                  DOT[phase.status],
                  phase.status === "current" && "shadow-[0_0_10px_var(--purple-glow)]",
                )}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-green-acid">
                  {t(`${phase.id}.period`)}
                </span>
                {phase.status === "current" && (
                  <span className="rounded bg-purple-neon/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-purple-neon">
                    {t("current")}
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-base font-semibold text-text-primary">
                {t(`${phase.id}.title`)}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-muted">
                {t(`${phase.id}.desc`)}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
