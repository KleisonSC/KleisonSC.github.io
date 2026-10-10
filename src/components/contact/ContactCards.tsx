"use client";

import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/ui/Reveal";
import {
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  KaggleIcon,
  DownloadIcon,
} from "@/components/ui/icons";

const CARDS = [
  { key: "email", href: site.socials.email, Icon: MailIcon, value: site.email },
  { key: "linkedin", href: site.socials.linkedin, Icon: LinkedInIcon, value: "in/kleisonsilvaengenheiro" },
  { key: "github", href: site.socials.github, Icon: GitHubIcon, value: "github.com/kleisonsilva" },
  { key: "kaggle", href: site.socials.kaggle, Icon: KaggleIcon, value: "kaggle.com/kleisonsilva" },
];

export function ContactCards() {
  const t = useTranslations("contact");

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.key} index={i}>
            <a
              href={card.href}
              target={card.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group flex h-full items-center gap-5 rounded-xl border border-purple-neon/15 bg-bg-secondary/40 p-7 transition-all hover:border-green-acid/50 hover:box-glow-green"
            >
              <span className="shrink-0 rounded-lg border border-purple-neon/30 p-4 text-purple-neon transition-all duration-300 group-hover:scale-110 group-hover:text-green-acid group-hover:drop-shadow-[0_0_8px_var(--green-glow-soft)]">
                <card.Icon size={28} />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  {t(`cards.${card.key}`)}
                </h2>
                <p className="truncate font-mono text-xs text-text-muted transition-colors group-hover:text-green-acid">
                  {card.value}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Download CV */}
      <Reveal index={4}>
        <div className="mt-10 flex justify-center">
          <a
            href={asset(site.cvPath)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-green-acid/60 px-6 py-3 font-mono text-sm text-green-acid transition-all hover:bg-green-acid/10 hover:box-glow-green"
          >
            <DownloadIcon size={18} />
            {t("downloadCv")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
