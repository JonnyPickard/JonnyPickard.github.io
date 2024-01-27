import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mountain: THREE.Mesh;
  };
  materials: {
    ["Mountain Mat"]: THREE.MeshStandardMaterial;
  };
};

export function HexMountainModel(props: JSX.IntrinsicElements["mesh"]) {
  // TODO: Terrain model variations
  const { nodes, materials } = useGLTF(
    "/3d-models/hex-grid/HexMountainModel.glb",
  ) as GLTFResult;
  return (
    <mesh
      {...props}
      dispose={null}
      geometry={nodes.Mountain.geometry}
      material={materials["Mountain Mat"]}
      scale={0.8}
    />
  );
}

useGLTF.preload("/3d-models/hex-grid/HexMountainModel.glb");
