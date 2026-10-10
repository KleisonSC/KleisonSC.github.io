import { defineRouting } from "next-intl/routing";

// Single source of truth for which locales exist and how URLs are prefixed.
// `localePrefix: "always"` gives us /en/..., /fr/..., etc. — required for a
// fully static site where there is no middleware to infer the locale.
export const routing = defineRouting({
  locales: ["en", "fr", "pt", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
