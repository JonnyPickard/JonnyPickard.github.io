import { Suspense, useMemo } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
} from "@react-three/drei";
import { Player } from ".";
// NOTE: https://www.framer.com/motion/layoutcamera/ = perspective camera
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

export const PlayerScene = () => {
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
      <Suspense fallback={null}>
        <Player />
      </Suspense>
      <motion.ambientLight intensity={3.4} position={[0, 30, 10]} />
      <LayoutCamera position={[0, 2, 4]} />
      <OrbitControls makeDefault />

      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
      <motion.gridHelper
        position={[0, 0, 0]}
        args={[10, 20, "#6f6f6f", "#9d4b4b"]}
      />
      <Stats />
    </MotionCanvas>
  );
};
