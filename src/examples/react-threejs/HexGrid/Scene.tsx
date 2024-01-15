import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./HexTile";

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12.25], fov: 15 }}
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 12.25]} intensity={0.6} />
      <Suspense fallback={null}>
        <Model position={[0, 0, 0]} rotation={[85, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};
