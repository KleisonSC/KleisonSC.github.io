import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers around Next's navigation primitives. Using <Link> from
// here keeps the active locale prefix on every internal link automatically.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
