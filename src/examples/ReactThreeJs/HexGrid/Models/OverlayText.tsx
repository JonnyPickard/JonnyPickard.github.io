import { Text } from "@react-three/drei";
import * as THREE from "three";

// Rotate flat with tiles
const textRotation = new THREE.Euler(-(Math.PI / 2), 0, 0);

interface OverlayTextProps {
  col: number;
  row: number;
  color?: string;
}

/**
 * OverlayText to overlay tile coordinates on tiles
 *
 * @export
 * @param {OverlayTextProps} { col, row, color = "white" }
 * @return {*}
 */
export function OverlayText({ col, row, color = "white" }: OverlayTextProps) {
  return (
    <Text
      color={color}
      letterSpacing={0.17}
      fontSize={0.22}
      rotation={textRotation}
      position={[0, 0.04, 0]}
    >
      [{col}, {row}]
      <meshLambertMaterial emissive={"white"} emissiveIntensity={10} />
    </Text>
  );
}
