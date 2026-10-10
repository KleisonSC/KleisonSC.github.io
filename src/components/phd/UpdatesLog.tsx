"use client";

import { useLocale, useTranslations } from "next-intl";
import { updates } from "@/data/phd";
import { Reveal } from "@/components/ui/Reveal";

const TAG_COLOR: Record<string, string> = {
  milestone: "#a3e635",
  reading: "#a855f7",
  experiment: "#bef264",
  writing: "#d946ef",
};

export function UpdatesLog() {
  const t = useTranslations("phd.log");
  const locale = useLocale();

  // Most recent first.
  const sorted = [...updates].sort((a, b) => (a.date < b.date ? 1 : -1));

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "2-digit" }).format(
      new Date(iso),
    );

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-2 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
        <p className="mb-8 font-mono text-[0.7rem] text-text-muted">{t("hint")}</p>
      </Reveal>

      <ul className="space-y-3">
        {sorted.map((u, i) => (
          <Reveal key={`${u.date}-${i}`} index={i} as="li">
            <div className="flex flex-col gap-3 rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-4 sm:flex-row sm:items-start">
              <time className="shrink-0 font-mono text-xs text-green-acid sm:w-28">
                {fmt(u.date)}
              </time>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-text-primary">{u.title}</h3>
                  {u.tag && (
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider"
                      style={{ color: TAG_COLOR[u.tag], border: `1px solid ${TAG_COLOR[u.tag]}55` }}
                    >
                      {t(`tags.${u.tag}`)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{u.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
