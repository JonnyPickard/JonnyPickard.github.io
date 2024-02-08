import * as THREE from "three";
import { useRef, useState, useLayoutEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { usePlayerStore } from "../../store";

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
  const isRunning = usePlayerStore((state) => state.isRunning);
  const zRotation = usePlayerStore((state) => state.playerRotation.degrees);
  const [visibleMesh, setVisibleMesh] = useState(true);

  // NOTE: Loaders are cached so it should only run once
  const { nodes, materials, animations } = useGLTF(
    "/3d-models/hex-grid/Player.glb",
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    const si = actions["Standing Idle"];
    const srf = actions["Standing Run Forward"];

    if (srf) {
      srf.clampWhenFinished = true;
      srf.repetitions = 0;
      srf.setEffectiveTimeScale(1.67);
    }
    if (isRunning) {
      // NOTE: Really hard to debug 1 frame rubberbanding issue with the animation when position changes.
      // This kind of gets around it but it is a bit hacky.
      setVisibleMesh(false);
      si?.stop();
      setVisibleMesh(true);
      srf?.play();
    }

    if (!isRunning) {
      srf?.stop();
      si?.play();
    }
  }, [actions, isRunning]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[0, THREE.MathUtils.degToRad(zRotation), 0]}
    >
      <group name="Scene">
        <group
          name="Armature"
          // Rotate model to face SW - SHould maybe do in blender?
          rotation={[Math.PI / 2, 0, THREE.MathUtils.degToRad(30)]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            visible={visibleMesh}
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
