import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Icosphere: THREE.Mesh;
    Icosphere_1: THREE.Mesh;
  };
  materials: {
    Boulder: THREE.MeshStandardMaterial;
    ["Boulder 2"]: THREE.MeshStandardMaterial;
  };
};

export function Terrain(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3d-models/hex-grid/Boulder.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.Boulder}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere_1.geometry}
        material={materials["Boulder 2"]}
      />
    </group>
  );
}

useGLTF.preload("/3d-models/hex-grid/Boulder.glb");
