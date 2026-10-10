/**
 * Static poster shown instead of the 3D canvas under reduced-motion (and as the
 * dynamic-import fallback). A neon line-art bust over a deflection basin.
 */
export function HeroStatic() {
  return (
    <svg
      viewBox="0 0 320 360"
      className="h-full w-full"
      role="img"
      aria-label="Wireframe classical bust over a pavement deflection basin"
    >
      <defs>
        <linearGradient id="bustStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Deflection basin grid */}
      <g stroke="#a855f7" strokeOpacity="0.3" strokeWidth="0.8" fill="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={`h${i}`}
            d={`M20 ${300 + i * 8} Q160 ${330 + i * 8} 300 ${300 + i * 8}`}
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 30} y1="296" x2={40 + i * 30} y2="336" />
        ))}
      </g>

      {/* Bust silhouette (stylised) */}
      <g stroke="url(#bustStroke)" strokeWidth="1.4" fill="none" opacity="0.9">
        <path d="M130 70 Q160 40 190 70 Q205 100 190 130 Q210 140 215 180 L105 180 Q110 140 130 130 Q115 100 130 70 Z" />
        <ellipse cx="160" cy="100" rx="34" ry="42" />
        <path d="M120 185 L200 185 L212 250 L108 250 Z" />
      </g>

      {/* Cross-section lines */}
      <g strokeWidth="1" fontFamily="monospace" fontSize="7">
        <line x1="95" y1="150" x2="240" y2="150" stroke="#bef264" strokeOpacity="0.6" />
        <line x1="95" y1="190" x2="240" y2="190" stroke="#a3e635" strokeOpacity="0.6" />
        <line x1="95" y1="230" x2="240" y2="230" stroke="#a855f7" strokeOpacity="0.6" />
        <text x="244" y="152" fill="#bef264" opacity="0.7">SURFACE</text>
        <text x="244" y="192" fill="#a3e635" opacity="0.7">BASE</text>
        <text x="244" y="232" fill="#a855f7" opacity="0.7">SUBBASE</text>
      </g>
    </svg>
  );
}
