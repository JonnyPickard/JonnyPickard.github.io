/**
 * Hex Selector Component
 *
 * Visual feedback for selected hex (yellow highlight)
 */
import { HEX_SELECTOR_HEIGHT, HEX_RADIUS } from "../../constants";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";

export function HexSelector() {
  const selectedHex = useGameStore((state) => state.selectedHex);
  const chunkSize = useGameStore((state) => state.chunkSize);

  if (!selectedHex) return null;

  // Convert hex coordinate to Three.js position
  const position = worldHexToThreePosition(
    {
      chunkCoord: [0, 0],
      localCoord: selectedHex,
    },
    chunkSize
  );

  return (
    <mesh position={position}>
      <cylinderGeometry
        args={[HEX_RADIUS * 1.1, HEX_RADIUS * 1.1, HEX_SELECTOR_HEIGHT, 6]}
      />
      <meshBasicMaterial color="yellow" transparent opacity={0.5} />
    </mesh>
  );
}
