/**
 * Full-viewport animated film grain. Pure CSS (see .noise-overlay in
 * globals.css); the grain animation is disabled under reduced-motion there.
 * Rendered once, high in the layout, above page content but below modals.
 */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}
