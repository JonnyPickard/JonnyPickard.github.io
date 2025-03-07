import { Text } from "@react-three/drei";
import * as THREE from "three";

// Rotate flat with tiles
const textRotation = new THREE.Euler(-(Math.PI / 2), 0, 0);

interface OverlayTextProps {
  coordinates: {
    q: number;
    r: number;
    s: number | null;
  };
  color?: string;
  isTerrainTile?: boolean;
  isHoveredTile?: boolean;
}

/**
 * OverlayText to overlay tile coordinates on tiles
 *
 * @export
 * @param {OverlayTextProps}
 * @return {*}
 */
export function OverlayText({
  coordinates: { q, r, s },
  color = "#ffffff",
  isTerrainTile = false,
  isHoveredTile = false,
}: OverlayTextProps) {
  const textVerticalPosition = isTerrainTile ? 0.8 : 0.1;
  const fontSize = isHoveredTile ? 0.24 : 0.22;
  const fontGlowStrength = isHoveredTile ? 20 : 5;

  return (
    <Text
      letterSpacing={0.1}
      color={color}
      fontSize={fontSize}
      rotation={textRotation}
      position={[0, textVerticalPosition, 0]}
    >
      [{q}, {r}
      {s ? `, ${s}` : null}]
      <meshLambertMaterial
        emissive={color}
        emissiveIntensity={fontGlowStrength}
      />
    </Text>
  );
}
