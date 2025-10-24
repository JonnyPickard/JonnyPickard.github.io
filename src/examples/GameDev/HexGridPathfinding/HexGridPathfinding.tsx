/**
 * HexGridPathfinding Example
 *
 * Demonstrates hex grid pathfinding with A* algorithm and cube coordinate system.
 * Pure client-side implementation for experimentation with different pathfinding approaches.
 *
 * Features:
 * - Configurable grid sizes (64×64, 96×96, 128×128)
 * - A* pathfinding with cube coordinate conversion
 * - Obstacle generation and visualization
 * - Tick-based player movement with smooth interpolation
 * - Camera follow system
 * - Chunk-based geometry rendering for performance
 *
 */
import { Canvas } from "@react-three/fiber";
import { HexTerrainScene } from "./components/scene/HexTerrainScene";
import { TickUI } from "./components/ui/TickUI";
import { UIControlPanel } from "./components/ui/UIControlPanel";

export function HexGridPathfinding() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* UI Overlays */}
      <UIControlPanel />
      <TickUI />

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [60, 40, 60],
          fov: 50,
        }}
        shadows
      >
        <HexTerrainScene />
      </Canvas>
    </div>
  );
}
