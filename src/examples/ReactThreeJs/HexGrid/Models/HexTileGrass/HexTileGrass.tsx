import * as THREE from "three";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    HexGrass: THREE.Mesh;
  };
  materials: {
    M_HexGrass: THREE.MeshStandardMaterial;
  };
};
export function HexTileGrass(props: JSX.IntrinsicElements["mesh"]) {
  const { nodes } = useGLTF("/3d-models/hex-grid/HexGrass.glb") as GLTFResult;
  return (
    // Instanced meshes
    <Merged meshes={[nodes.HexGrass]}>
      {
        // eslint-disable-next-line
        // @ts-ignore
        // Works but cant work out how to type it ATM
        (HexGrass) => {
          return (
            <HexGrass
              {...props}
              dispose={null}
              receiveShadow
              geometry={HexGrass.geometry}
              material={HexGrass.materials}
            />
          );
        }
      }
    </Merged>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexGrass.glb");
