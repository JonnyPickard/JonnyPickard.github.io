import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TILE_COLORS } from ".";

type GLTFResult = GLTF & {
  nodes: {
    HexSelectedOutline: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

interface OverlayHighlightOutlineProps {}

/**
 * Helper show the bounding HighlightOutline around a mesh instance
 *
 * @export
 * @param {OverlayHighlightOutlineProps} { tileSize }
 * @return {*}
 */
export function OverlayHighlightOutline(
  props: JSX.IntrinsicElements["group"] & OverlayHighlightOutlineProps,
) {
  const { nodes } = useGLTF(
    "/3d-models/HexTilleHighlightOutline.glb",
  ) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.HexSelectedOutline.geometry}
        material={nodes.HexSelectedOutline.material}
        position={[0, 0.049, 0]}
      >
        <meshLambertMaterial
          color={TILE_COLORS.HOVERED}
          toneMapped={false}
          emissiveIntensity={0.6}
          emissive={TILE_COLORS.HOVERED_EMISSIVE_LIGHT}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/3d-models/HexTilleHighlightOutline.glb");
