"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// A template re-mounts on every navigation within the locale, so this plays a
// quick neon sweep that wipes away to reveal the new page. Disabled under
// reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <>
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80]"
          style={{
            background:
              "linear-gradient(90deg, var(--color-purple-deep), var(--color-purple-neon) 55%, var(--color-green-acid))",
            transformOrigin: "right",
          }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {children}
    </>
  );
}
