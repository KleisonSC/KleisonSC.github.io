/** Minimal className joiner — truthy strings only. Avoids an extra dependency. */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
