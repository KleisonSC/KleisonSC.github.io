"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { skillGroups, languages } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-mono text-xs text-text-primary">{name}</span>
        <span className="font-mono text-[0.65rem] text-text-muted">{level}%</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-deep to-purple-neon"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* glowing tip */}
          <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-green-acid shadow-[0_0_8px_var(--green-glow-soft)]" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  const t = useTranslations("about.skills");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="mb-8 font-display text-2xl font-semibold text-text-primary">
          <span className="text-purple-neon">#</span> {t("title")}
        </h2>
      </Reveal>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.key} index={i}>
            <div className="rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-green-acid">
                {t(`groups.${group.key}`)}
              </h3>
              {group.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}
            </div>
          </Reveal>
        ))}

        {/* Languages */}
        <Reveal index={skillGroups.length}>
          <div className="rounded-lg border border-purple-neon/15 bg-bg-secondary/40 p-5">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-green-acid">
              {t("languagesTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-primary">{lang.name}</span>
                  <span className="rounded border border-green-acid/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-green-acid">
                    {t(`levels.${lang.levelKey}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
