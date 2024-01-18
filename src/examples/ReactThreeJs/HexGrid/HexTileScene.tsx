// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z

import { Suspense, useMemo } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
} from "@react-three/drei";
import { HexTileModel } from "./HexTileModel";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  defineHex,
  Grid,
  rectangle,
  Orientation,
  hexToPoint,
} from "honeycomb-grid";

const HexTileGrid = () => {
  // 1. Create a hex class:
  const Tile = defineHex({
    // Hardcoded for now but this comes from:
    // console.log(nodes.Cylinder.geometry.boundingBox.max);
    // const boundingBox = {
    //   z: 0.5553572773933411,
    // };
    dimensions: 0.553572773933411,
    // dimensions: 0.7348821301486452,
    // origin: "topLeft", // default
    // NOTE: This seems to be about the grid offset?
    // but should really work out how to calc the hexs vs grid
    // Probably due to different unit sizes for the grid/ my mesh?
    origin: { x: 4.5, y: 3.7 },
    orientation: Orientation.POINTY,
    // offset every other row by 1/2 hex
    // offset: -1, // default (offsets X right)
    // offset: 1, // (offsets X left)
  });

  // 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
  const grid = new Grid(Tile, rectangle({ width: 10, height: 10 }));

  // 3. Iterate over the grid to render each hex:
  return [...grid].map((hex) => {
    const { q, r } = hex;
    const { x, y } = hexToPoint(hex);

    // Is an offset row
    const isOffset = Boolean(r % 2);

    // Will use as a prop to Hide 3/4's of the tiles
    // To make understanding the 3D geometry easier
    // const hideTile = Boolean(q % 2 && isOffset);
    const hideTile = false;

    return (
      <HexTileModel
        key={`${q}-${r}`}
        q={q}
        r={r}
        position={[x, 0, y]}
        isOffset={isOffset}
        hideTile={hideTile}
      />
    );
  });

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
          labelColor="black"
        />
      </GizmoHelper>
      <motion.axesHelper args={[5]} />
      <motion.gridHelper args={[10, 10, "#6f6f6f", "#9d4b4b"]} />
      <motion.ambientLight intensity={1.25} />
      <motion.directionalLight position={[0, 10, 12.25]} intensity={0.6} />
      <Suspense fallback={null}>
        <HexTileGrid />
      </Suspense>
      <LayoutCamera position={[0, 20, 0]} />
      <OrbitControls makeDefault />
      <Stats />
    </MotionCanvas>
  );
};
