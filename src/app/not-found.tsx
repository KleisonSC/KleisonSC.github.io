import Link from "next/link";

// Root 404 — exported as /404.html, which GitHub Pages serves for any unknown
// path. Lives outside the [locale] layout, so it carries its own minimal shell.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-green-acid">
        error // 404
      </p>
      <h1
        className="glitch mt-4 font-display text-7xl font-bold text-purple-neon text-glow-purple sm:text-8xl"
        data-text="404"
      >
        404
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm text-text-muted">
        This route deflected off the pavement. The page you are looking for does
        not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded border border-green-acid/60 px-5 py-2.5 font-mono text-sm text-green-acid transition-all hover:bg-green-acid/10"
      >
        ← Return home
      </Link>
    </main>
  );
}
