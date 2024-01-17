import { Suspense, useMemo, useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
} from "@react-three/drei";
import { HexTileModel } from "./HexTileModel";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
// import { useMotionValue, useTransform } from "framer-motion";
import * as THREE from "three";
import { defineHex, Grid, rectangle } from "honeycomb-grid";

const HexTileGrid = () => {
  // 1. Create a hex class:
  const Tile = defineHex({ dimensions: 30 });

  // 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
  const grid = new Grid(Tile, rectangle({ width: 10, height: 10 }));

  // 3. Iterate over the grid to log each hex:
  // grid.forEach(console.log);
  // { q: number (column), r: number (row) }

  // https://www.redblobgames.com/grids/hexagons/#coordinates-offset
};

export const HexTileScene = () => {
  // https://github.com/framer/motion/issues/2074#issuecomment-1724813108
  useMemo(() => extend(THREE), []);

  HexTileGrid();

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
      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="white"
        />
      </GizmoHelper>
      <motion.axesHelper args={[5]} />
      <motion.gridHelper args={[20, 40, "#6f6f6f", "#9d4b4b"]} />
      <motion.ambientLight intensity={1.25} />
      <motion.ambientLight intensity={0.1} />
      <motion.directionalLight position={[0, 10, 12.25]} intensity={0.6} />
      <Suspense fallback={null}>
        <HexTileModel position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </Suspense>
      <LayoutCamera position={[10, 10, 0]} />
      <OrbitControls makeDefault />
      <Stats />
    </MotionCanvas>
  );
};
