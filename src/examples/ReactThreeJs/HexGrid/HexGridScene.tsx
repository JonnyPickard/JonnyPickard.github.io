// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z

import { Suspense, useMemo } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
  SoftShadows,
} from "@react-three/drei";
import { HexGridManager } from "./HexGridManager";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

export const HexGridScene = () => {
  // https://github.com/framer/motion/issues/2074#issuecomment-1724813108
  useMemo(() => extend(THREE), []);

  return (
    <MotionCanvas
      dpr={[1, 2]}
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <motion.ambientLight intensity={3.4} position={[0, 30, 10]} />
      <motion.directionalLight
        castShadow
        visible
        position={[5, 5, 40]}
        intensity={1.6}
      />
      <SoftShadows size={50} focus={20} />
      <Suspense fallback={null}>
        <HexGridManager />
      </Suspense>
      <LayoutCamera position={[0, 10, 10]} />
      <OrbitControls makeDefault />
      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
      {/* <motion.axesHelper args={[3]} /> */}
      {/* <motion.gridHelper
        position={[0, 0.2, 0]}
        args={[0.7348821301486452 * 10, 10, "#6f6f6f", "#9d4b4b"]}
      /> */}
      <Stats />
    </MotionCanvas>
  );
};
