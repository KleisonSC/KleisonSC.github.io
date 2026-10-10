"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Pavement cross-section, bottom (subgrade) to top (surface course).
const LAYERS = [
  { key: "subgrade", label: "SUBGRADE", color: "#2a2a35", width: "100%" },
  { key: "subbase", label: "SUBBASE", color: "#3b2d55", width: "92%" },
  { key: "base", label: "BASE", color: "#5b3ca0", width: "84%" },
  { key: "surface", label: "SURFACE COURSE", color: "#1a1a24", width: "76%" },
];

const SESSION_KEY = "intro-seen";
const TOTAL_MS = 2400;

export function Loader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }

    if (seen || reduced) {
      setVisible(false);
      return;
    }

    const markAndHide = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setFlash(true);
      // Let the flash play briefly, then remove the overlay.
      window.setTimeout(() => setVisible(false), 350);
    };

    const timer = window.setTimeout(markAndHide, TOTAL_MS);
    const skip = () => {
      window.clearTimeout(timer);
      markAndHide();
    };
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [reduced]);

  return (
    <>
      {/* No-JS fallback: never trap content behind the overlay. */}
      <noscript>
        <style>{`.intro-overlay{display:none !important}`}</style>
      </noscript>

      <AnimatePresence>
        {visible && (
          <motion.div
            className="intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative flex w-[min(70vw,420px)] flex-col-reverse items-center gap-1">
              {LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.key}
                  className="relative flex h-6 items-center justify-center rounded-sm"
                  style={{ background: layer.color, width: layer.width }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.4, duration: 0.45, ease: "easeOut" }}
                >
                  <motion.span
                    className="absolute left-full ml-3 whitespace-nowrap font-mono text-[0.6rem] tracking-widest text-green-acid"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.4, duration: 0.3 }}
                  >
                    {layer.label}
                  </motion.span>
                </motion.div>
              ))}

              {/* Load label / progress line */}
              <motion.div
                className="mb-4 font-mono text-[0.65rem] tracking-[0.3em] text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                CONSTRUCTING PAVEMENT…
              </motion.div>
            </div>

            {/* Neon flash on completion */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-green-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.35 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
