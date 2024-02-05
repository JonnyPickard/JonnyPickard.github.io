// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z

import { Suspense, useMemo } from "react";
import {
  MapControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
  Environment,
  Sky,
} from "@react-three/drei";
import { HexGridManager } from "./HexGridManager";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { CHARACTER_START_CAM_POSITION } from "./constants";

export const HexGridScene = () => {
  // https://github.com/framer/motion/issues/2074#issuecomment-1724813108
  useMemo(() => extend(THREE), []);
  const { camX, camZ } = CHARACTER_START_CAM_POSITION;

  return (
    <MotionCanvas
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Cool front facing light */}
      <motion.ambientLight
        intensity={2}
        position={[0, 5, 10]}
        color={"#fdfefe5"}
      />
      {/* Shadow casting sun type light */}
      <motion.directionalLight
        color={"#b5a92a"}
        /* Trying to position inline with sun */
        position={[camX * 2, 5, camZ * 2]}
        intensity={10}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        castShadow
      />
      {/* Sun/ Atmosphere shader */}
      <Sky
        sunPosition={[10, 0.01, -10]}
        distance={3000}
        turbidity={8}
        rayleigh={8}
        mieCoefficient={0.0}
        mieDirectionalG={0.8}
        inclination={0.49}
        azimuth={0.25}
      />
      <Environment preset="forest" />

      <Suspense fallback={null}>
        <HexGridManager />
      </Suspense>

      <LayoutCamera position={[camX, 20, camZ + 6]} makeDefault />
      <MapControls target={[camX, 0, camZ]} makeDefault />
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
//
