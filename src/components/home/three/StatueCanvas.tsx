"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/* -------------------------------------------------------------------------- */
/*  Möbius strip — a single-sided revolved surface (sacred geometry of the
    infinite / optical illusion). Built as an indexed parametric mesh and shown
    as a neon wireframe. The visitor can click-and-drag to rotate it freely.    */
/* -------------------------------------------------------------------------- */

// Classic Möbius parametrisation:
//   x = (R + v·cos(u/2))·cos(u)
//   y = (R + v·cos(u/2))·sin(u)
//   z =  v·sin(u/2)
// u sweeps the loop (0→2π), v runs across the band half-width.
function makeMobius(R = 2, width = 0.95, segU = 180, segV = 18) {
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segU; i++) {
    const u = (i / segU) * Math.PI * 2;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const ch = Math.cos(u / 2);
    const sh = Math.sin(u / 2);
    for (let j = 0; j <= segV; j++) {
      const v = (j / segV - 0.5) * 2 * width; // -width … +width
      const r = R + v * ch;
      positions.push(r * cu, r * su, v * sh);
    }
  }

  const row = segV + 1;
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * row + j;
      const b = (i + 1) * row + j;
      const c = (i + 1) * row + (j + 1);
      const d = i * row + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setIndex(indices);
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

function Mobius() {
  const geometry = useMemo(() => makeMobius(), []);

  return (
    // A slight tilt so the band reads as a 3D ribbon at rest.
    <group rotation={[Math.PI / 3.2, 0, Math.PI / 6]}>
      {/* Core purple wireframe */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.85} />
      </mesh>
      {/* Faint green glow shell, barely larger */}
      <mesh geometry={geometry} scale={1.02}>
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function StatueCanvas() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <Mobius />
      {/* Drag to rotate; zoom/pan disabled so it stays framed. Idle auto-spin
          is suppressed under reduced-motion. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        rotateSpeed={0.75}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
