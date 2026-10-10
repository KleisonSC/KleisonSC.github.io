"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";
import { GlitchText } from "@/components/ui/GlitchText";
import { ArrowRightIcon, DownloadIcon } from "@/components/ui/icons";
import { HeroStatic } from "./HeroStatic";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// The WebGL canvas is client-only and loaded on demand to keep it out of SSR
// and the initial bundle. The static poster covers the loading gap.
const StatueCanvas = dynamic(() => import("./three/StatueCanvas"), {
  ssr: false,
  loading: () => <HeroStatic />,
});

// Deforming space-time grid behind the hero (Home only).
const SpacetimeGrid = dynamic(() => import("./three/SpacetimeGrid"), {
  ssr: false,
});

export function Hero() {
  const t = useTranslations("home");
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Space-time fabric backdrop — deforms toward the pointer. Decorative
          and non-interactive so it never intercepts clicks. */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <SpacetimeGrid />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-24 pb-16 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8">
        {/* 3D / poster column */}
        <div className="order-1 h-[46vh] w-full md:order-none md:h-[72vh]">
          {reduced ? <HeroStatic /> : <StatueCanvas />}
        </div>

        {/* Text column */}
        <div className="order-2 flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-green-acid"
          >
            {"// Portfolio"}
          </motion.p>

          <GlitchText
            as="h1"
            always
            text="KLEISON SILVA"
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-5 max-w-md font-mono text-sm text-green-acid/90"
          >
            {t("tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-2 max-w-md text-sm text-text-muted"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded bg-purple-neon px-5 py-2.5 text-sm font-medium text-bg-primary transition-all hover:bg-purple-neon/90 hover:box-glow-purple"
            >
              {t("viewProjects")}
              <ArrowRightIcon
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href={asset(site.cvPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-green-acid/60 px-5 py-2.5 text-sm font-medium text-green-acid transition-all hover:bg-green-acid/10 hover:box-glow-green"
            >
              <DownloadIcon size={16} />
              {t("downloadCv")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      {!reduced && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] text-text-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL ↓
        </motion.div>
      )}
    </section>
  );
}
