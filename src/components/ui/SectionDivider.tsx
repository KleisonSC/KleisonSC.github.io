"use client";

/**
 * Decorative divider between sections: a road silhouette with animated
 * stress-wave lines (dashed strokes flowing), gradient purple → acid green.
 */
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="pointer-events-none relative h-16 w-full overflow-hidden"
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="divGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6d28d9" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>

        {/* Road surface line */}
        <path d="M0 40 H1200" stroke="url(#divGrad)" strokeWidth="1.5" opacity="0.6" />

        {/* Stress / deformation waves */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M0 ${44 + i * 3} q 150 ${-10 - i * 4} 300 0 t 300 0 t 300 0 t 300 0`}
            stroke="url(#divGrad)"
            strokeWidth="1"
            strokeDasharray="6 10"
            opacity={0.5 - i * 0.12}
            style={{ animation: `dash-flow ${24 + i * 8}s linear infinite` }}
          />
        ))}

        {/* Lane dashes */}
        <line
          x1="0"
          y1="40"
          x2="1200"
          y2="40"
          stroke="#a3e635"
          strokeWidth="2"
          strokeDasharray="24 28"
          opacity="0.4"
          style={{ animation: "dash-flow 30s linear infinite reverse" }}
        />
      </svg>
    </div>
  );
}
