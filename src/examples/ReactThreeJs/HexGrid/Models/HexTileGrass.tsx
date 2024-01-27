import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { calculateRotation } from "../utils";
import { useMemo } from "react";

THREE.MathUtils.degToRad(60);

type GLTFResult = GLTF & {
  nodes: {
    HexTileGrass002: THREE.Mesh;
  };
  materials: {
    GrassDisplacement_Mat: THREE.MeshStandardMaterial;
  };
};

const modelPaths = [
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement0.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement1.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement2.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement3.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement4.glb",
  "/3d-models/hex-grid/HexTileGrass_UsingDisplacement5.glb",
];

export function HexTileGrass(
  props: JSX.IntrinsicElements["group"] & {
    textureSeed: number;
    rotationSeed: number;
  },
) {
  const models = useGLTF(modelPaths) as GLTFResult[];
  const { nodes, materials } = models[props.textureSeed];
  const rotation = useMemo(
    () => calculateRotation(props.textureSeed, props.rotationSeed),
    [props.textureSeed, props.rotationSeed],
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.HexTileGrass002.geometry}
        material={materials.GrassDisplacement_Mat}
        rotation={rotation}
      />
    </group>
  );
}

useGLTF.preload(modelPaths);
