import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    SpacePirate_M: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Standing Idle"
  | "Standing Run Forward"
  | "Standing Turn Left"
  | "Standing Turn Right"
  | "T-Pose";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export function Player(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/3d-models/hex-grid/Player.glb",
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Standing Idle"]?.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="Mesh"
            geometry={nodes.Mesh.geometry}
            material={materials.SpacePirate_M}
            skeleton={nodes.Mesh.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d-models/hex-grid/Player.glb");
