/**
 * Obstacle Renderer Component
 *
 * Renders obstacles as cylinders on the hex grid
 * Principle: SRP - Single responsibility for rendering obstacles
 */
import { useMemo } from "react";
import { OBSTACLE_HEIGHT, OBSTACLE_RADIUS } from "../../constants";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";
import type { OffsetCoord } from "../../types";

export function ObstacleRenderer() {
  const obstacles = useGameStore((state) => state.obstacles);
  const chunkSize = useGameStore((state) => state.chunkSize);

  // Convert obstacle Set to array of coordinates
  const obstacleCoords = useMemo(() => {
    const coords: OffsetCoord[] = [];
    for (const key of obstacles) {
      const [col, row] = key.split(",").map(Number);
      coords.push([col, row]);
    }
    return coords;
  }, [obstacles]);

  // Render individual obstacle cylinders
  return (
    <>
      {obstacleCoords.map((coord) => {
        // Convert to Three.js position
        const worldPos = worldHexToThreePosition(
          {
            chunkCoord: [0, 0],
            localCoord: coord,
          },
          chunkSize
        );
        const key = `${coord[0]},${coord[1]}`;

        return (
          <mesh key={key} position={[worldPos[0], OBSTACLE_HEIGHT / 2, worldPos[2]]}>
            <cylinderGeometry args={[OBSTACLE_RADIUS, OBSTACLE_RADIUS, OBSTACLE_HEIGHT, 6]} />
            <meshStandardMaterial
              color="#cc0000" // Red color for obstacles
              flatShading
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </>
  );
}
