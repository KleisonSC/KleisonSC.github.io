/**
 * Prefixes a public-asset path with the configured basePath so links to files
 * in /public (CV, images, 3D models) resolve correctly both locally and under
 * GitHub Pages' /<repo> subpath. next/link and next/image handle basePath
 * automatically, but raw <a href>, <img src>, fetch() and such do not.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
