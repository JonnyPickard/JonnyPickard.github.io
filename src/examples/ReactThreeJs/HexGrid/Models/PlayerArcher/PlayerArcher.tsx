import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Erika_Archer_Arrow_Mesh: THREE.SkinnedMesh;
    Erika_Archer_Body_Mesh: THREE.SkinnedMesh;
    Erika_Archer_Bow_Mesh: THREE.SkinnedMesh;
    Erika_Archer_Clothes_Mesh: THREE.SkinnedMesh;
    Erika_Archer_Eyelashes_Mesh: THREE.SkinnedMesh;
    Erika_Archer_Eyes_Mesh: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Akai_MAT1: THREE.MeshStandardMaterial;
    Bow_MAT: THREE.MeshStandardMaterial;
    EyeSpec_MAT1: THREE.MeshStandardMaterial;
    phong1: THREE.MeshStandardMaterial;
    Body_MAT1: THREE.MeshStandardMaterial;
    Arrow_MAT: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "Animations" | "T_Pose";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<
    JSX.IntrinsicElements["skinnedMesh"] | JSX.IntrinsicElements["bone"]
  >
>;

export function PlayerArcher(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/3d-models/hex-grid/PlayerArcher.glb",
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    console.log(actions);
    actions["Animations"]?.setEffectiveTimeScale(0.75).play();

    // console.log(actions["Armature.001|mixamo.com|Layer0"]?.getRoot());
    // console.log(actions["Armature.001|mixamo.com|Layer0"]);
  });
  console.log("here", actions);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Erika_Archer_Arrow_Mesh"
            geometry={nodes.Erika_Archer_Arrow_Mesh.geometry}
            material={materials.Akai_MAT1}
            skeleton={nodes.Erika_Archer_Arrow_Mesh.skeleton}
          />
          <skinnedMesh
            name="Erika_Archer_Body_Mesh"
            geometry={nodes.Erika_Archer_Body_Mesh.geometry}
            material={materials.Bow_MAT}
            skeleton={nodes.Erika_Archer_Body_Mesh.skeleton}
          />
          <skinnedMesh
            name="Erika_Archer_Bow_Mesh"
            geometry={nodes.Erika_Archer_Bow_Mesh.geometry}
            material={materials.EyeSpec_MAT1}
            skeleton={nodes.Erika_Archer_Bow_Mesh.skeleton}
          />
          <skinnedMesh
            name="Erika_Archer_Clothes_Mesh"
            geometry={nodes.Erika_Archer_Clothes_Mesh.geometry}
            material={materials.phong1}
            skeleton={nodes.Erika_Archer_Clothes_Mesh.skeleton}
          />
          <skinnedMesh
            name="Erika_Archer_Eyelashes_Mesh"
            geometry={nodes.Erika_Archer_Eyelashes_Mesh.geometry}
            material={materials.Body_MAT1}
            skeleton={nodes.Erika_Archer_Eyelashes_Mesh.skeleton}
          />
          <skinnedMesh
            name="Erika_Archer_Eyes_Mesh"
            geometry={nodes.Erika_Archer_Eyes_Mesh.geometry}
            material={materials.Arrow_MAT}
            skeleton={nodes.Erika_Archer_Eyes_Mesh.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d-models/hex-grid/PlayerArcher.glb");
