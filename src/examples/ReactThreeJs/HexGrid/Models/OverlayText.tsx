import { Text } from "@react-three/drei";
import * as THREE from "three";

// Rotate flat with tiles
const textRotation = new THREE.Euler(-(Math.PI / 2), 0, 0);

interface OverlayTextProps {
  col: number;
  row: number;
  color?: string;
  isTerrainTile?: boolean;
  isHoveredTile?: boolean;
}

/**
 * OverlayText to overlay tile coordinates on tiles
 *
 * @export
 * @param {OverlayTextProps} { col, row, color = "white" }
 * @return {*}
 */
export function OverlayText({
  col,
  row,
  color = "white",
  isTerrainTile = false,
  isHoveredTile = false,
}: OverlayTextProps) {
  const textVerticalPosition = isTerrainTile ? 0.4 : 0.1;
  const fontSize = isHoveredTile ? 0.24 : 0.22;
  const fontGlowStrength = isHoveredTile ? 20 : 5;

  return (
    <Text
      color={color}
      letterSpacing={0.17}
      fontSize={fontSize}
      rotation={textRotation}
      position={[0, textVerticalPosition, 0]}
    >
      [{col}, {row}]
      <meshLambertMaterial
        emissive={"white"}
        emissiveIntensity={fontGlowStrength}
      />
    </Text>
  );
}
