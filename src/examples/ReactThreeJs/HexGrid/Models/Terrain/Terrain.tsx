import * as THREE from "three";
import { useGLTF, Merged } from "@react-three/drei";
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
  const { nodes } = useGLTF("/3d-models/hex-grid/Boulder.glb") as GLTFResult;

  return (
    <Merged meshes={[nodes.Icosphere, nodes.Icosphere_1]}>
      {
        // eslint-disable-next-line
        // @ts-ignore
        // Works but cant work out how to type it ATM
        (Boulder, Boulder2) => (
          <group {...props} dispose={null}>
            <Boulder
              castShadow
              receiveShadow
              geometry={Boulder.geometry}
              material={Boulder.Materials}
            />
            <Boulder2
              castShadow
              receiveShadow
              geometry={Boulder2.geometry}
              material={Boulder2.materials}
            />
          </group>
        )
      }
    </Merged>
  );
}

useGLTF.preload("/3d-models/hex-grid/Boulder.glb");
