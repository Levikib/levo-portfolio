"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function RiverRibbonModel() {
  const groupRef = useRef<THREE.Group>(null);

  let gltf: ReturnType<typeof useGLTF> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    gltf = useGLTF("/models/river-ribbon.glb");
  } catch {
    gltf = null;
  }

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  if (!gltf) {
    // Fallback ribbon mesh if GLB fails to load
    return (
      <group ref={groupRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[Math.sin((i / 6) * Math.PI * 2) * 0.6, (i - 3) * 0.12, Math.cos((i / 6) * Math.PI * 2) * 0.6]}>
            <torusGeometry args={[0.3, 0.04, 8, 24]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.6} roughness={0.2} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function FallbackRibbon() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.06;
  });
  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 0.7;
        return (
          <mesh key={i} position={[Math.sin(angle) * r, (i - 4) * 0.1, Math.cos(angle) * r]}>
            <boxGeometry args={[0.15, 0.04, 0.04]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#06b6d4" : "#0369a1"} metalness={0.8} roughness={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function RiverRibbonScene() {
  return (
    <div style={{ width: "100%", height: "160px", background: "var(--abyss)" }}>
      <Canvas
        camera={{ position: [0, 0.3, 2.8], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} color="#0369a1" />
        <directionalLight position={[2, 3, 2]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[-2, -1, 1]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[0, 2, -1]} intensity={0.4} color="#0ea5e9" />
        <Suspense fallback={<FallbackRibbon />}>
          <RiverRibbonModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
