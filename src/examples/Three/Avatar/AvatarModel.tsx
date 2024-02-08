import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import GUI from "lil-gui";
import { useThree } from "@react-three/fiber";
import { useInterval } from "usehooks-ts";

type GLTFResult = GLTF & {
  nodes: {
    Paladin_J_Nordstrom: THREE.SkinnedMesh;
    Paladin_J_Nordstrom_Helmet: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Paladin_MAT: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "Dance_Flair";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export function AvatarModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const all = useGLTF("/3d-models/avatar/Paladin.glb") as GLTFResult;
  const { nodes, materials, animations } = all;
  const { actions } = useAnimations(animations, group);
  const [isPlaying, setIsPlaying] = useState(true);

  const { invalidate } = useThree();

  useInterval(
    () => {
      invalidate();
    },
    // Delay in milliseconds or null to stop it
    // Lower = higher fps
    // 20 = around 50fps on mac
    isPlaying ? 20 : null,
  );

  useEffect(() => {
    const gui = new GUI();

    gui.add(
      {
        play: () => {
          actions["Dance_Flair"]?.setEffectiveTimeScale(0.7).play();
          setIsPlaying(true);
        },
      },
      "play",
    );
    gui.add(
      {
        stop: () => {
          actions["Dance_Flair"]?.stop();
          setIsPlaying(false);
        },
      },
      "stop",
    );

    actions["Dance_Flair"]?.setEffectiveTimeScale(0.8).play();

    return () => gui.destroy();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Paladin_J_Nordstrom"
            geometry={nodes.Paladin_J_Nordstrom.geometry}
            material={materials.Paladin_MAT}
            skeleton={nodes.Paladin_J_Nordstrom.skeleton}
          />
          <skinnedMesh
            name="Paladin_J_Nordstrom_Helmet"
            geometry={nodes.Paladin_J_Nordstrom_Helmet.geometry}
            material={materials.Paladin_MAT}
            skeleton={nodes.Paladin_J_Nordstrom_Helmet.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d-models/avatar/Paladin.glb");
