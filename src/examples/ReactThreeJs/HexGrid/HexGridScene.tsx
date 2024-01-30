// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z

import { Suspense, useMemo } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
  SoftShadows,
  Environment,
  MeshReflectorMaterial,
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
      gl={{ alpha: false }}
      dpr={[1, 2]}
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <motion.ambientLight
        intensity={2.6}
        position={[0, 30, 10]}
        color={"#ffecad"}
      />
      <motion.ambientLight
        intensity={1}
        position={[0, 30, 4]}
        color={"#695c91"}
      />
      <motion.directionalLight
        castShadow
        visible
        position={[0.2, 6, 0]}
        intensity={1}
        color={"violet"}
      />
      <SoftShadows size={50} focus={20} />
      <motion.fog attach="fog" args={["#111a21", 30, 40]} />
      <Environment preset="night" />

      <Suspense fallback={null}>
        <HexGridManager />
      </Suspense>
      <motion.mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <motion.planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          mirror={0}
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#151515"
          metalness={0.6}
          roughness={1}
        />
      </motion.mesh>
      <LayoutCamera position={[0, 6, 10]} />
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
