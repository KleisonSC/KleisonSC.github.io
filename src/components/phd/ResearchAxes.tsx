"use client";

import { useTranslations } from "next-intl";
import { researchAxes } from "@/data/phd";
import { Reveal } from "@/components/ui/Reveal";

function Icon({ k }: { k: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;
  switch (k) {
    case "fwd":
      return (
        <svg {...common}>
          <path d="M12 3v7M9 8l3 3 3-3" />
          <path d="M3 15c3 0 4 5 9 5s6-5 9-5" />
        </svg>
      );
    case "cold":
      return (
        <svg {...common}>
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
        </svg>
      );
    case "freeze":
      return (
        <svg {...common}>
          <path d="M10 4v12a3 3 0 1 0 4 0V4a2 2 0 0 0-4 0z" />
          <path d="M8 20h8" />
        </svg>
      );
    case "monitoring":
      return (
        <svg {...common}>
          <path d="M3 18l5-6 4 4 3-5 6 7" />
          <circle cx="8" cy="12" r="1.3" />
          <circle cx="15" cy="11" r="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

export function ResearchAxes() {
  const t = useTranslations("phd.axes");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-8 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {researchAxes.map((axis, i) => (
          <Reveal key={axis.key} index={i} as="article">
            <div className="group h-full rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-6 transition-all hover:border-green-acid/40 hover:box-glow-green">
              <div className="mb-4 inline-flex rounded-md border border-purple-neon/30 p-3 text-purple-neon transition-colors group-hover:text-green-acid">
                <Icon k={axis.key} />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-text-primary">
                {t(`${axis.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {t(`${axis.key}.desc`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
