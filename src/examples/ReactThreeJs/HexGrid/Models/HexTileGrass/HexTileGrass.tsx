import * as THREE from "three";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useMemo } from "react";

type GLTFResult = GLTF & {
  nodes: {
    HexGrass: THREE.Mesh;
  };
  materials: {
    M_HexGrass: THREE.MeshStandardMaterial;
  };
};
export function HexTileGrass(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/3d-models/hex-grid/HexGrass.glb") as GLTFResult;
  const HexGrassMesh = useMemo(() => {
    return nodes.HexGrass;
  }, [nodes]);
  return (
    // Instanced meshes
    <Merged {...props} meshes={[HexGrassMesh]}>
      {
        // eslint-disable-next-line
        // @ts-ignore
        // Works but cant work out how to type it ATM
        (HexGrass) => {
          return (
            <HexGrass
              dispose={null}
              geometry={HexGrass.geometry}
              material={HexGrass.materials}
              receiveShadow
            />
          );
        }
      }
    </Merged>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexGrass.glb");
