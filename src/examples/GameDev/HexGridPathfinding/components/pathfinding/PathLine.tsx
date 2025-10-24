/**
 * PathLine Component
 *
 * Visualizes the computed path as a cyan line using drei's Line component.
 * Shows the path the player will follow when moving to a clicked hex.
 *
 * Principle: SRP - Only renders the path line
 */

import { Line } from "@react-three/drei";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";

export function PathLine() {
  const currentPath = useGameStore((state) => state.currentPath);
  const chunkSize = useGameStore((state) => state.chunkSize);

  // Don't render if no path exists
  if (!currentPath || currentPath.length === 0) {
    return null;
  }

  // Convert path hex coordinates to Three.js world positions
  const points = currentPath.map((hex) =>
    worldHexToThreePosition({ chunkCoord: [0, 0], localCoord: hex }, chunkSize)
  );

  return (
    <Line
      points={points}
      color="#00ffff" // Cyan - high visibility against green terrain
      lineWidth={3}
      // Slightly elevated to render above terrain
      position={[0, 0.05, 0]}
    />
  );
}
