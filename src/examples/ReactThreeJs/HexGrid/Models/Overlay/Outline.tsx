import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TILE_COLORS } from "../..";

type GLTFResult = GLTF & {
  nodes: {
    HexSelectedOutline: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

interface OutlineProps {
  tileOverlayColor: TILE_COLORS;
}

/**
 * Helper show the bounding HighlightOutline around a mesh instance
 *
 * @export
 * @param {OutlineProps} { tileSize }
 * @return {*}
 */
export function Outline({
  tileOverlayColor,
  ...props
}: JSX.IntrinsicElements["mesh"] & OutlineProps) {
  const { nodes } = useGLTF(
    "/3d-models/hex-grid/HexTilleHighlightOutline.glb",
  ) as GLTFResult;

  return (
    <mesh
      {...props}
      dispose={null}
      geometry={nodes.HexSelectedOutline.geometry}
      material={nodes.HexSelectedOutline.material}
      position={[0, 0.049, 0]}
    >
      <meshLambertMaterial
        color={tileOverlayColor}
        toneMapped={false}
        emissiveIntensity={0.5}
        emissive={TILE_COLORS.HOVERED_EMISSIVE_LIGHT}
      />
    </mesh>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexTilleHighlightOutline.glb");
