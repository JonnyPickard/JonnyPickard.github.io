import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TILE_COLORS } from ".";

type GLTFResult = GLTF & {
  nodes: {
    HexHighlightTile: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

export function OverlayHighlight(props: JSX.IntrinsicElements["mesh"]) {
  const { nodes } = useGLTF(
    "/3d-models/hex-grid/HexTileHighlight.glb",
  ) as GLTFResult;
  return (
    <mesh
      {...props}
      dispose={null}
      geometry={nodes.HexHighlightTile.geometry}
      material={nodes.HexHighlightTile.material}
      position={[0, 0.049, 0]}
    >
      <meshLambertMaterial
        color={TILE_COLORS.PLAYER}
        toneMapped={false}
        emissiveIntensity={0.6}
        emissive={TILE_COLORS.HOVERED_EMISSIVE_LIGHT}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexTileHighlight.glb");
