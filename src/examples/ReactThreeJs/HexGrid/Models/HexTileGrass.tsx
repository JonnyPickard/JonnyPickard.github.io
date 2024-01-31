import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    HexGrass: THREE.Mesh;
  };
  materials: {
    M_HexGrass: THREE.MeshStandardMaterial;
  };
};
export function HexTileGrass(
  props: JSX.IntrinsicElements["mesh"] & {
    textureSeed: number;
    rotation: THREE.Euler;
  },
) {
  const { nodes, materials } = useGLTF(
    "/3d-models/hex-grid/HexGrass.glb",
  ) as GLTFResult;

  return (
    <mesh
      {...props}
      dispose={null}
      receiveShadow
      geometry={nodes.HexGrass.geometry}
      material={materials.M_HexGrass}
    />
  );
}

useGLTF.preload("/3d-models/hex-grid/HexGrass.glb");
