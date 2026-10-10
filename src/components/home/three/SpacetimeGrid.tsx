"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/* -------------------------------------------------------------------------- */
/*  Spacetime fabric — a large wireframe sheet that sags into a central gravity
    well (a wormhole in the fabric of space-time) and dimples toward the
    pointer as it moves across the hero. Home background only.                 */
/* -------------------------------------------------------------------------- */

const SIZE = 34;
const SEG = 52;

function Fabric() {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  const geometry = useMemo(() => new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG), []);

  // Cache the flat XY of every vertex so each frame only rewrites Z.
  const base = useMemo(() => {
    const pos = geometry.attributes.position;
    const arr: [number, number][] = [];
    for (let i = 0; i < pos.count; i++) arr.push([pos.getX(i), pos.getY(i)]);
    return arr;
  }, [geometry]);

  // Pointer position mapped into plane space, with a smoothed follow value.
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * SIZE;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * SIZE;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    cur.current.x += (target.current.x - cur.current.x) * 0.06;
    cur.current.y += (target.current.y - cur.current.y) * 0.06;

    const pos = geometry.attributes.position;
    const mx = cur.current.x;
    const my = cur.current.y;
    for (let i = 0; i < pos.count; i++) {
      const [x, y] = base[i];
      // Static central well.
      let z = -3.5 * Math.exp(-(x * x + y * y) / (2 * 5 * 5));
      // Local dimple following the pointer (skipped under reduced-motion).
      if (!reduced) {
        const dx = x - mx;
        const dy = y - my;
        z += -2.4 * Math.exp(-(dx * dx + dy * dy) / (2 * 2.4 * 2.4));
      }
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -1.5, 0]}
    >
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export default function SpacetimeGrid() {
  return (
    <Canvas
      camera={{ position: [0, 6, 13], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Fabric />
    </Canvas>
  );
}
