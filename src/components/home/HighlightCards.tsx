"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

// Simple neon line icons for the three pillars.
function ResearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5L20 20" />
      <path d="M10 7v6M7 10h6" />
    </svg>
  );
}
function EngineeringIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 20h18M6 20V10l6-4 6 4v10" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}
function SimulationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />
      <path d="M3 17h18M3 7h4" />
    </svg>
  );
}

const CARDS = [
  { key: "research", Icon: ResearchIcon },
  { key: "engineering", Icon: EngineeringIcon },
  { key: "simulation", Icon: SimulationIcon },
] as const;

export function HighlightCards() {
  const t = useTranslations("home.highlights");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {CARDS.map(({ key, Icon }, i) => (
          <Reveal key={key} index={i} as="article">
            <div className="group h-full rounded-lg border border-purple-neon/15 bg-bg-secondary/50 p-6 transition-all hover:border-green-acid/40 hover:box-glow-green">
              <div className="mb-4 inline-flex rounded-md border border-purple-neon/30 p-3 text-purple-neon transition-colors group-hover:text-green-acid">
                <Icon />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {t(`${key}.body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
