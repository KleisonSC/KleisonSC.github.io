"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { clsx } from "@/lib/clsx";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Solidify the bar once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[60] transition-colors duration-300",
        scrolled
          ? "border-b border-purple-neon/15 bg-bg-primary/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative font-mono text-xs uppercase tracking-widest transition-colors",
                isActive(item.href)
                  ? "text-green-acid"
                  : "text-text-muted hover:text-text-primary",
              )}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-green-acid shadow-[0_0_8px_var(--green-glow-soft)]"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-purple-neon/30 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="relative h-3 w-5">
              <span
                className={clsx(
                  "absolute left-0 h-px w-full bg-text-primary transition-all",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-px w-full bg-text-primary transition-all",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-px w-full bg-text-primary transition-all",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile"
            className="absolute inset-x-0 top-full border-b border-purple-neon/15 bg-bg-primary/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "block py-3 font-mono text-sm uppercase tracking-widest",
                      isActive(item.href) ? "text-green-acid" : "text-text-muted",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
