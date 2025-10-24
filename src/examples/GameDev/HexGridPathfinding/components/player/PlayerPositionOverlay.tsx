/**
 * Player Position Overlay Component
 *
 * Shows the player's "true" position as a hex overlay.
 * This represents the actual hex tile the player is on,
 * separate from the smoothly animating player cube mesh.
 *
 * Visual distinction:
 * - Blue color (matches player cube)
 * - Lower opacity to not obscure terrain
 * - Slightly elevated to layer on top of ground
 */
import { HEX_RADIUS } from "../../constants";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";

export function PlayerPositionOverlay() {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const chunkSize = useGameStore((state) => state.chunkSize);

  if (!playerPosition) return null;

  // Convert hex coordinate to Three.js position
  const position = worldHexToThreePosition(
    {
      chunkCoord: [0, 0],
      localCoord: playerPosition,
    },
    chunkSize
  );

  return (
    <mesh position={position}>
      <cylinderGeometry args={[HEX_RADIUS * 1.1, HEX_RADIUS * 1.1, 0.15, 6]} />
      <meshBasicMaterial color="#f394ff" transparent opacity={0.6} />
    </mesh>
  );
}
