"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/lib/hooks/useIsTouch";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Custom cursor: a minimalist macOS-style arrow, rendered white so it reads
 * cleanly over the dark UI. It tracks the pointer precisely (tip anchored to
 * the real click point). Disabled on touch devices and under reduced-motion,
 * where the native cursor is kept.
 */
export function CursorFX() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Decide once mounted; both hooks resolve on the client.
    setEnabled(!isTouch && !reduced);
  }, [isTouch, reduced]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={arrowRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden="true"
    >
      {/* macOS-style pointer; the tip sits at the SVG origin so it aligns with
          the real cursor position. White fill, hairline dark edge + soft drop
          shadow to keep it legible on light and dark areas alike. */}
      <svg
        width="16"
        height="23"
        viewBox="0 0 16 23"
        fill="none"
        style={{ filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,0.45))" }}
      >
        <path
          d="M1 1 L1 17.8 L5.2 13.7 L8 20 L10.6 18.9 L7.8 12.8 L13.5 12.8 Z"
          fill="#ffffff"
          stroke="#0a0a0f"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
