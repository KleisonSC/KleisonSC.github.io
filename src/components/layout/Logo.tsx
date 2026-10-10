"use client";

import { Link } from "@/i18n/navigation";
import { GlitchText } from "@/components/ui/GlitchText";

/** Wordmark in Orbitron that glitches on hover, linking back home. */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Kleison Silva — home"
      className="group inline-flex items-baseline gap-1 font-logo text-sm tracking-[0.25em] text-text-primary"
    >
      <GlitchText
        text="KLEISON"
        onHover
        className="font-logo uppercase transition-colors group-hover:text-purple-neon"
      />
      <span className="text-green-acid">{"//"}</span>
      <GlitchText
        text="SILVA"
        onHover
        className="font-logo uppercase transition-colors group-hover:text-green-acid"
      />
    </Link>
  );
}
