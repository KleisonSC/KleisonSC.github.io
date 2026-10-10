"use client";

import { useEffect } from "react";
import { routing } from "@/i18n/routing";

// The site is fully static (GitHub Pages), so there is no middleware to pick a
// locale. This root page is the landing at "/": it detects the browser's
// preferred language on the client and redirects to the matching locale.
export default function RootRedirect() {
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("preferred-locale")
        : null;

    const fromBrowser = navigator.languages
      .map((l) => l.split("-")[0].toLowerCase())
      .find((l) => (routing.locales as readonly string[]).includes(l));

    const locale =
      (stored && (routing.locales as readonly string[]).includes(stored)
        ? stored
        : fromBrowser) ?? routing.defaultLocale;

    // basePath is injected at build time; keep it on the redirect target.
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    window.location.replace(`${basePath}/${locale}/`);
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "#0a0a0f",
        color: "#71717a",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
      }}
    >
      <noscript>
        {/* Plain anchor is intentional: this is the no-JavaScript fallback,
            so next/link (which needs the client runtime) would not help.
            Relative href keeps it valid under the GitHub Pages basePath. */}
        <a href="./en/" style={{ color: "#a3e635" }}>
          Enter site →
        </a>
      </noscript>
      <span>INITIALIZING…</span>
    </main>
  );
}
