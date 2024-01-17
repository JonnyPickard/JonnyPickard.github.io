import { Suspense, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { HexTileModel } from "./HexTileModel";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import { useMotionValue, useTransform } from "framer-motion";
import * as THREE from "three";

export const HexTileScene = () => {
  // https://github.com/framer/motion/issues/2074#issuecomment-1724813108
  useMemo(() => extend(THREE), []);

  return (
    <MotionCanvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [10, 10, 0] }}
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <motion.ambientLight intensity={1.25} />
      <motion.ambientLight intensity={0.1} />
      <motion.directionalLight position={[0, 10, 12.25]} intensity={0.6} />
      <Suspense fallback={null}>
        <HexTileModel position={[0, 0, 0]} rotation={[0, 0, 85]} />
      </Suspense>
      <LayoutCamera position={[0, 0, 5]} />
      <OrbitControls />
    </MotionCanvas>
  );
};
