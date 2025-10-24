/**
 * Obstacles Component
 *
 * Renders red cylinders at blocked hex positions using instanced rendering.
 *
 * **Performance Optimization:**
 * - Uses Drei's <Instances> for single draw call
 * - Can handle 10,000+ obstacles at 60fps
 * - Dynamically updates when obstacles added/removed
 *
 * Principle: SRP - Only renders obstacle cylinders
 */

import { Instances, Instance } from "@react-three/drei";
import { OBSTACLE_HEIGHT, OBSTACLE_RADIUS } from "../../constants";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";
import type { OffsetCoord } from "../../types";

const RADIAL_SEGMENTS = 16;

export function Obstacles() {
  const obstacles = useGameStore((state) => state.obstacles);
  const chunkSize = useGameStore((state) => state.chunkSize);

  // Convert Set<string> to array of OffsetCoord
  const blockedHexes: OffsetCoord[] = Array.from(obstacles).map((key) => {
    const [col, row] = key.split(",").map(Number);
    return [col, row] as OffsetCoord;
  });

  return (
    <Instances limit={16384}>
      {/* Shared geometry and material (rendered once for all instances) */}
      <cylinderGeometry
        args={[OBSTACLE_RADIUS, OBSTACLE_RADIUS, OBSTACLE_HEIGHT, RADIAL_SEGMENTS]}
      />
      <meshStandardMaterial color="#F44336" />

      {/* Individual instances (position-only, no geometry duplication) */}
      {blockedHexes.map((hex) => {
        const position = worldHexToThreePosition(
          {
            chunkCoord: [0, 0],
            localCoord: hex,
          },
          chunkSize
        );

        // Lift by half height to sit on terrain
        const liftedPosition: [number, number, number] = [
          position[0],
          position[1] + OBSTACLE_HEIGHT / 2,
          position[2],
        ];

        return <Instance key={`${hex[0]},${hex[1]}`} position={liftedPosition} />;
      })}
    </Instances>
  );
}
