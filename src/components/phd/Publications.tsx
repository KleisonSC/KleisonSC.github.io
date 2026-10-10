"use client";

import { useTranslations } from "next-intl";
import { publications } from "@/data/phd";
import { Reveal } from "@/components/ui/Reveal";

export function Publications() {
  const t = useTranslations("phd.publications");

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-8 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
      </Reveal>

      {publications.length === 0 ? (
        <Reveal index={1}>
          <div className="relative overflow-hidden rounded-lg border border-dashed border-purple-neon/30 bg-bg-secondary/30 p-10 text-center">
            {/* HUD scanline sweep */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.25) 4px)",
              }}
            />
            <p className="relative font-mono text-sm uppercase tracking-[0.3em] text-green-acid">
              {t("comingSoon")}
            </p>
            <p className="relative mt-2 font-mono text-xs text-text-muted">
              {t("comingSoonHint")}
            </p>
          </div>
        </Reveal>
      ) : (
        <ul className="space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={i} index={i} as="li">
              <div className="rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-5">
                <div className="mb-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-purple-neon">
                  <span>{t(`types.${pub.type}`)}</span>
                  <span className="text-text-muted">· {pub.year}</span>
                </div>
                <h3 className="font-display text-base font-semibold text-text-primary">
                  {pub.url ? (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-acid">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>
                <p className="mt-1 text-sm italic text-text-muted">{pub.venue}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
