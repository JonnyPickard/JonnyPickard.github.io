import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  MapControls,
  PerspectiveCamera,
  Sky,
  Stats,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { useInterval } from "usehooks-ts";
import { CHARACTER_START_CAM_POSITION } from "./constants";
import { HexGridManager } from "./HexGridManager";
import { usePlayerStore } from "./store";

/**
 * LimitFPS
 * Has to be inside canvas hence returning empty JSX
 *
 * @return {*}
 */
const LimitFPS = () => {
  const { invalidate } = useThree();

  useInterval(() => {
    invalidate();
  }, 14);

  return <></>;
};

export const HexGridGameScene = () => {
  const { camX, camZ } = CHARACTER_START_CAM_POSITION;
  const isRunning = usePlayerStore((state) => state.isRunning);

  return (
    <Canvas
      frameloop={isRunning ? "always" : "demand"}
      shadows
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Allow natural rendering during movement as it seemed more janky without */}
      {!isRunning && <LimitFPS />}
      {/* Cool front facing light */}
      <ambientLight intensity={2} position={[0, 5, 10]} color={"#89ceff"} />
      {/* Shadow casting sun type light */}
      <directionalLight
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

      <PerspectiveCamera position={[camX, 20, camZ + 6]} makeDefault />
      <MapControls target={[camX, 0, camZ]} makeDefault />
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
