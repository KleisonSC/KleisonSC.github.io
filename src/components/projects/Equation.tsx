import "katex/dist/katex.min.css";
import katex from "katex";

/**
 * Renders a LaTeX string to HTML with KaTeX at build time (server component —
 * runs during static export, no client JS needed). Display mode, errors shown
 * inline rather than thrown so a bad formula never breaks the build.
 */
export function Equation({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
    errorColor: "#ff5f56",
  });

  return (
    <div
      className="my-2 overflow-x-auto rounded-md border border-purple-neon/20 bg-bg-secondary/50 px-4 py-3 text-text-primary"
      // KaTeX output is trusted, generated from our own LaTeX constants.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
