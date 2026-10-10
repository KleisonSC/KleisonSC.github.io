"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { StatueParallax } from "./StatueParallax";

export function Bio() {
  const t = useTranslations("about.bio");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-text-primary">{t("p1")}</p>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 leading-relaxed text-text-muted">{t("p2")}</p>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 leading-relaxed text-text-muted">{t("p3")}</p>
          </Reveal>
        </div>

        {/* Parallax statue — decorative, sits to the side on desktop */}
        <div className="mx-auto hidden h-80 w-56 md:block">
          <StatueParallax />
        </div>
      </div>
    </section>
  );
}
