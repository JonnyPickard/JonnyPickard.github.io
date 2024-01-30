import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    HexTileGrass002: THREE.Mesh;
  };
  materials: {
    GrassDisplacement_Mat: THREE.MeshStandardMaterial;
  };
};

// TODO: This really should be done with material variants as this is a lot of unnecessary overhead
const modelPaths = [
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement0.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement1.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement2.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement3.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement4.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement5.glb",
];

export function HexTileGrass(
  props: JSX.IntrinsicElements["mesh"] & {
    textureSeed: number;
    rotation: THREE.Euler;
  },
) {
  const models = useGLTF(modelPaths) as GLTFResult[];
  const { nodes, materials } = models[props.textureSeed];

  return (
    <mesh
      {...props}
      dispose={null}
      geometry={nodes.HexTileGrass002.geometry}
      material={materials.GrassDisplacement_Mat}
    />
  );
}

useGLTF.preload(modelPaths);
