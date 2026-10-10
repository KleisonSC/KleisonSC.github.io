"use client";

import { useLocale } from "next-intl";
import { site } from "@/lib/site";
import { MailIcon, LinkedInIcon, GitHubIcon, KaggleIcon } from "@/components/ui/icons";

const links = [
  { href: site.socials.email, label: "Email", Icon: MailIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.socials.kaggle, label: "Kaggle", Icon: KaggleIcon },
];

export function Footer() {
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-purple-neon/15 bg-bg-secondary/40">
      {/* Decorative neon circuit line */}
      <svg
        className="absolute -top-px left-0 h-px w-full overflow-visible"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1200 2"
      >
        <defs>
          <linearGradient id="circuit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0" />
            <stop offset="35%" stopColor="#a855f7" />
            <stop offset="65%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke="url(#circuit)"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          style={{ animation: "dash-flow 40s linear infinite" }}
        />
      </svg>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted transition-colors hover:text-green-acid hover:drop-shadow-[0_0_6px_var(--green-glow-soft)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 font-mono text-[0.7rem] text-text-muted sm:items-end">
          <span>
            © {year} {site.fullName}
          </span>
          <span className="opacity-70">
            Built with Next.js · R3F · {locale.toUpperCase()}
          </span>
        </div>
      </div>
    </footer>
  );
}
