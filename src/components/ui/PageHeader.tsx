"use client";

import { motion } from "framer-motion";
import { GlitchText } from "./GlitchText";

/**
 * Consistent header block for inner pages: a mono kicker, a large display
 * title and an optional subtitle, with top padding that clears the fixed site
 * header.
 */
export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-[calc(var(--header-h)+3rem)] sm:px-6 lg:px-8">
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-green-acid"
      >
        {kicker}
      </motion.p>
      <GlitchText
        as="h1"
        text={title}
        onHover
        className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 max-w-2xl text-text-muted"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-purple-neon/60 via-purple-neon/10 to-transparent" />
    </header>
  );
}
