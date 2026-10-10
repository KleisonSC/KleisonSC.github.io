"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { clsx } from "@/lib/clsx";

const LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  pt: "PT",
  es: "ES",
};

const NAMES: Record<string, string> = {
  en: "English",
  fr: "Français",
  pt: "Português",
  es: "Español",
};

/**
 * Discreet locale dropdown. Switching keeps the current route (next-intl
 * pathname is locale-agnostic) and remembers the choice for the root redirect.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: string) => {
    try {
      window.localStorage.setItem("preferred-locale", next);
    } catch {
      /* private mode — ignore */
    }
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1 rounded border border-purple-neon/30 px-2 py-1 font-mono text-xs text-text-primary transition-colors hover:border-green-acid/60 hover:text-green-acid"
      >
        {LABELS[locale]}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={clsx("transition-transform", open && "rotate-180")}
          aria-hidden="true"
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded border border-purple-neon/30 bg-bg-elevated/95 py-1 backdrop-blur"
          >
            {routing.locales.map((l) => (
              <li key={l} role="option" aria-selected={l === locale}>
                <button
                  type="button"
                  onClick={() => choose(l)}
                  className={clsx(
                    "flex w-full items-center justify-between px-3 py-1.5 text-left font-mono text-xs transition-colors hover:bg-purple-neon/10",
                    l === locale ? "text-green-acid" : "text-text-muted hover:text-text-primary",
                  )}
                >
                  <span>{NAMES[l]}</span>
                  <span className="opacity-60">{LABELS[l]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
