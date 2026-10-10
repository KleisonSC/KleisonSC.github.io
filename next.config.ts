import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// basePath/assetPrefix are read from an env var so the same build works both
// locally (empty) and on GitHub Pages under /<repo> (set in the CI workflow).
// Example (project page): NEXT_PUBLIC_BASE_PATH=/portfolio
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node server at runtime).
  output: "export",
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // Emit /about/index.html instead of /about.html so routes resolve on Pages.
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

// Point next-intl at the request-config module so server components can read
// the active locale's messages during static generation.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
