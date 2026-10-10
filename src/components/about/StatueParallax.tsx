"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative classical bust in neon line-art that drifts vertically with scroll
 * (parallax). Purely ornamental, hidden from assistive tech.
 */
export function StatueParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <div ref={ref} className="pointer-events-none relative h-full w-full" aria-hidden="true">
      <motion.div style={{ y, rotate }} className="h-full w-full">
        <svg viewBox="0 0 240 340" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="statueG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="55%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>

          <g stroke="url(#statueG)" strokeWidth="1.3" strokeLinejoin="round" opacity="0.85">
            {/* Head / profile */}
            <path d="M150 40 q 24 6 26 42 q 2 26 -10 44 q 10 6 8 20 l -4 18" />
            <path d="M150 40 q -28 -6 -44 18 q -14 20 -8 44 q 3 16 16 24" />
            <path d="M114 126 q 18 16 44 10" />
            {/* Nose / brow suggestion */}
            <path d="M108 96 q 10 4 14 14 q -6 6 -12 4" />
            <path d="M120 72 q 12 -4 22 2" />
            {/* Neck */}
            <path d="M118 150 l -4 26 M168 148 l 6 26" />
            {/* Shoulders / chest (bust) */}
            <path d="M92 190 q 58 -30 120 4 l 10 70 q -70 22 -140 2 Z" />
            {/* Drapery lines */}
            <path d="M110 196 q 20 50 10 66" opacity="0.5" />
            <path d="M150 192 q 6 54 22 72" opacity="0.5" />
            <path d="M190 198 q -4 40 -16 60" opacity="0.5" />
            {/* Pedestal */}
            <path d="M96 268 l 110 0 l 8 40 l -126 0 Z" />
            <path d="M84 308 l 140 0" />
          </g>

          {/* scan line accents */}
          <g stroke="#a3e635" strokeWidth="0.7" opacity="0.35">
            <line x1="70" y1="120" x2="210" y2="120" strokeDasharray="3 6" />
            <line x1="70" y1="210" x2="220" y2="210" strokeDasharray="3 6" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
