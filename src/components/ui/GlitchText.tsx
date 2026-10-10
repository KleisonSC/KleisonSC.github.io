"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";

type GlitchTextProps = {
  text: string;
  className?: string;
  /** Continuously glitch (hero use). Default: only a rare ambient flicker. */
  always?: boolean;
  /** Intensify the glitch while hovered (card / logo use). */
  onHover?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "div";
};

/**
 * Chromatic-split glitch text. The CSS (globals.css) draws two offset copies
 * from the `data-text` attribute; this component just toggles the intensity
 * classes. Reduced-motion hides the copies entirely (handled in CSS).
 */
export function GlitchText({
  text,
  className,
  always = false,
  onHover = false,
  as: Tag = "span",
}: GlitchTextProps) {
  const [hovered, setHovered] = useState(false);
  const active = always || (onHover && hovered);

  return (
    <Tag
      className={clsx("glitch", active && "glitch-active", className)}
      data-text={text}
      onMouseEnter={onHover ? () => setHovered(true) : undefined}
      onMouseLeave={onHover ? () => setHovered(false) : undefined}
    >
      {text}
    </Tag>
  );
}
