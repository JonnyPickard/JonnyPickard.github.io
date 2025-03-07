import { useGLTF } from "@react-three/drei";
import type { Color } from "@react-three/fiber";
import { JSX } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    HexHighlightTile: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

export function HighlightTile(
  props: JSX.IntrinsicElements["mesh"] & {
    tileOverlayColor: Color;
  },
) {
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
        color={props.tileOverlayColor}
        toneMapped={false}
        emissiveIntensity={0.6}
        emissive={props.tileOverlayColor}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexTileHighlight.glb");
