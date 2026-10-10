"use client";

import { useEffect } from "react";

// The single <html> lives in the root layout (lang="en" baked in at export).
// This keeps document.documentElement.lang correct per locale on the client,
// which matters for accessibility and screen readers.
export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
