import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { Player } from ".";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const AnimatedLight = () => {
  const lightRef = useRef<THREE.AmbientLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 3 + Math.sin(clock.elapsedTime) * 0.5;
    }
  });

  return <ambientLight ref={lightRef} intensity={3.4} position={[0, 30, 10]} />;
};

export const PlayerScene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Suspense fallback={null}>
        <Player />
      </Suspense>
      <AnimatedLight />
      <PerspectiveCamera position={[0, 2, 4]} />
      <OrbitControls makeDefault />

      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
      <gridHelper position={[0, 0, 0]} args={[10, 20, "#6f6f6f", "#9d4b4b"]} />
      <Stats />
    </Canvas>
  );
};
