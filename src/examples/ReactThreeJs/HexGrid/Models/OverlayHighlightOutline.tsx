import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

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
  const { nodes } = useGLTF("/3d-models/HexTilleOutline.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.HexSelectedOutline.geometry}
        material={nodes.HexSelectedOutline.material}
        position={[0, 0.049, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/HexTilleOutline.glb");
