/**
 * Themed neon SVG visual per project (no raster assets needed). Each evokes the
 * project's core idea: deflection basin, S–N curve, wave propagation, creep
 * curve, thermal gradient, outreach network. Falls back to a generic grid.
 */

type Props = { slug: string; className?: string };

const frame = "0 0 400 300";

function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox={frame} className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pvGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="#12121a" />
      <g opacity="0.12" stroke="#a855f7" strokeWidth="0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`gx${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`gy${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>
      {children}
    </svg>
  );
}

function DeflectionBasin() {
  return (
    <>
      {/* FWD load arrow */}
      <g stroke="#bef264" strokeWidth="2" fill="none">
        <line x1="200" y1="40" x2="200" y2="110" />
        <path d="M190 95 L200 110 L210 95" />
      </g>
      {/* basin */}
      <path
        d="M30 120 C120 120 160 230 200 230 C240 230 280 120 370 120"
        stroke="url(#pvGrad)"
        strokeWidth="3"
        fill="none"
      />
      {[60, 110, 160, 200, 240, 290, 340].map((x, i) => {
        const y = 120 + 110 * Math.exp(-Math.pow((x - 200) / 70, 2));
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#a3e635" />;
      })}
      <line x1="30" y1="120" x2="370" y2="120" stroke="#71717a" strokeWidth="1" strokeDasharray="4 4" />
    </>
  );
}

function SNCurve() {
  return (
    <>
      <line x1="50" y1="250" x2="360" y2="250" stroke="#71717a" strokeWidth="1" />
      <line x1="50" y1="50" x2="50" y2="250" stroke="#71717a" strokeWidth="1" />
      <path d="M60 80 C150 95 250 190 350 210" stroke="url(#pvGrad)" strokeWidth="3" fill="none" />
      {[
        [80, 90],
        [140, 120],
        [210, 165],
        [280, 195],
        [330, 208],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="#a3e635" strokeWidth="1.5" />
      ))}
      <text x="340" y="268" fill="#71717a" fontFamily="monospace" fontSize="11">log N</text>
      <text x="20" y="60" fill="#71717a" fontFamily="monospace" fontSize="11">σ</text>
    </>
  );
}

function WaveProp() {
  const path = (phase: number, amp: number, color: string) => {
    let d = "M20 150";
    for (let x = 20; x <= 380; x += 4) {
      const y = 150 + amp * Math.sin((x - 20) / 24 + phase) * Math.exp(-(x - 20) / 420);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return <path d={d} stroke={color} strokeWidth="2" fill="none" />;
  };
  return (
    <>
      {path(0, 60, "url(#pvGrad)")}
      {path(1, 40, "#a855f7")}
      {path(2, 24, "#bef264")}
      <circle cx="20" cy="150" r="6" fill="#bef264" />
    </>
  );
}

function CreepCurve() {
  return (
    <>
      <line x1="50" y1="250" x2="360" y2="250" stroke="#71717a" strokeWidth="1" />
      <line x1="50" y1="50" x2="50" y2="250" stroke="#71717a" strokeWidth="1" />
      {/* instantaneous jump + primary + secondary creep */}
      <path d="M50 220 L80 160 C140 120 180 110 230 100 L350 70" stroke="url(#pvGrad)" strokeWidth="3" fill="none" />
      <text x="330" y="268" fill="#71717a" fontFamily="monospace" fontSize="11">t</text>
      <text x="18" y="60" fill="#71717a" fontFamily="monospace" fontSize="11">ε</text>
    </>
  );
}

function HeatMap() {
  const colors = ["#1e3a8a", "#6d28d9", "#a855f7", "#d946ef", "#f59e0b", "#a3e635"];
  return (
    <>
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c) => {
          const dx = c - 3.5;
          const dy = r - 2.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const idx = Math.max(0, Math.min(colors.length - 1, Math.round(colors.length - 1 - dist)));
          return (
            <rect
              key={`${r}-${c}`}
              x={50 + c * 38}
              y={40 + r * 36}
              width="38"
              height="36"
              fill={colors[idx]}
              opacity="0.8"
            />
          );
        }),
      )}
      <circle cx="202" cy="130" r="10" fill="none" stroke="#f4f4f5" strokeWidth="1.5" />
    </>
  );
}

function OutreachNet() {
  const nodes = [
    [200, 150],
    [110, 90],
    [300, 90],
    [90, 210],
    [310, 210],
    [200, 60],
    [200, 240],
  ];
  return (
    <>
      <g stroke="url(#pvGrad)" strokeWidth="1.2" opacity="0.7">
        {nodes.slice(1).map(([x, y], i) => (
          <line key={i} x1="200" y1="150" x2={x} y2={y} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 8 : 5} fill={i === 0 ? "#a3e635" : "#a855f7"} />
      ))}
    </>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  "pavement-monitoring": DeflectionBasin,
  "fatigue-cementitious": SNCurve,
  "ultrasonic-characterization": WaveProp,
  "rheology-aam": CreepCurve,
  "thermomechanical-foundations": HeatMap,
  "scientific-events": OutreachNet,
};

export function ProjectVisual({ slug, className }: Props) {
  const Visual = VISUALS[slug];
  return <Wrapper className={className}>{Visual ? <Visual /> : null}</Wrapper>;
}
