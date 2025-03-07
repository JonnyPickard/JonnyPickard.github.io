import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  MapControls,
  PerspectiveCamera,
  Sky,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Grid,
  Hex,
  Orientation,
  hexToOffset,
  hexToPoint,
  rectangle,
} from "honeycomb-grid";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  HEX_ORIGIN,
  TILE_MESH_DIMENSIONS,
} from "./constants";
import { defineCustomHex } from "./CustomHex";
import { HexTile } from "./Models";
import { getRandomInt } from "./utils";

/**
 * A simple component to display a hexagonal grid without player or pathfinding features
 */
export const HexGridDisplayScene = () => {
  const [grid, setGrid] = useState<Grid<Hex>>();

  // Create the grid on component mount
  useEffect(() => {
    // Create a hex class
    const Hex = defineCustomHex({
      dimensions: TILE_MESH_DIMENSIONS,
      origin: HEX_ORIGIN,
      orientation: Orientation.POINTY,
    });

    // Create a grid
    const hexGrid = new Grid(
      Hex,
      rectangle({
        width: GRID_WIDTH,
        height: GRID_HEIGHT,
      }),
    );

    setGrid(hexGrid);
  }, []);

  // Calculate the center of the grid in world coordinates
  const gridCenter = useMemo(() => {
    if (!grid) return { x: 0, y: 0, z: 0 };

    // Rather than converting from offset to cube, directly calculate center point
    // by getting the middle hex from the grid
    const gridArray = grid.toArray();
    if (gridArray.length === 0) return { x: 0, y: 0, z: 0 };

    // Find the center hex - if the grid has an odd number of hexes, there's a clear center
    // If it has an even number, we'll take one of the middle ones
    const centerHexIndex = Math.floor(gridArray.length / 2);
    const centerHex = gridArray[centerHexIndex];

    // Convert the center hex to world coordinates
    const centerPoint = hexToPoint(centerHex);

    return {
      x: centerPoint.x,
      y: 20, // Camera height above the grid
      z: centerPoint.y + 6, // Add some offset in the z direction for better viewing angle
    };
  }, [grid]);

  return (
    <Canvas
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={2} position={[0, 5, 10]} color={"#89ceff"} />
      <directionalLight
        color={"#b5a92a"}
        position={[gridCenter.x, 5, gridCenter.z - 5]} // Position light relative to grid center
        intensity={10}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        castShadow
      />

      {/* Environment */}
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
        {/* Render the hex grid tiles */}
        {grid?.toArray().map((hex) => {
          const { x, y } = hexToPoint(hex);
          const { col, row } = hexToOffset(hex);
          const [textureSeed, rotationSeed] = hex.randomSeeds;

          return (
            <HexTile
              key={`${col}-${row}`}
              hex={hex}
              position={[x, 0, y]}
              textureSeed={textureSeed}
              rotationSeed={rotationSeed}
              isTerrainTile={getRandomInt(10) > 7} // Random terrain for display
              showCoordinatesAs="AXIAL"
            />
          );
        })}
      </Suspense>

      {/* Camera and Controls */}
      <PerspectiveCamera
        position={[gridCenter.x, gridCenter.y, gridCenter.z]}
        makeDefault
      />
      <MapControls
        target={[gridCenter.x, 0, gridCenter.z - 6]} // Target looking at the grid center
        makeDefault
      />
      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
      <Stats />
    </Canvas>
  );
};
