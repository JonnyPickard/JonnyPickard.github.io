/**
 * Camera Follow Player Hook (Mario 64 style)
 *
 * Based on Sean Bradley's follow camera pattern
 * Uses Object3D hierarchy with lerp for smooth following
 *
 * Features:
 * - Camera follows player mesh position with smooth lerp
 * - Hierarchical pivot system for natural camera movement
 * - Can be extended with orbit controls
 *
 * Principle: SRP - Only handles camera tracking logic
 */
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";
import { Vector3, Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

export function CameraFollowPlayer() {
  const { scene, camera } = useThree();
  const playerMeshRef = useRef<Mesh | null>(null);
  const controlsRef = useRef<any>(null);

  // Pivot point for smooth following
  const pivotPosition = useMemo(() => new Vector3(), []);
  const worldPosition = useMemo(() => new Vector3(), []);
  const lastPivot = useMemo(() => new Vector3(), []);

  // Find player mesh (once scene is populated)
  useEffect(() => {
    const findPlayer = () => {
      scene.traverse((object) => {
        if (object instanceof Mesh && object.material && "color" in object.material) {
          const hexColor = object.material.color.getHexString();
          if (hexColor === "3388ff") {
            playerMeshRef.current = object;
          }
        }
      });
    };

    // Delay to ensure player mesh is in scene
    const timer = setTimeout(findPlayer, 100);
    return () => clearTimeout(timer);
  }, [scene]);

  // Follow player with smooth lerp (every frame)
  useFrame((_, delta) => {
    if (!playerMeshRef.current || !controlsRef.current) return;

    // Get player's world position
    playerMeshRef.current.getWorldPosition(worldPosition);

    // Store old pivot position
    lastPivot.copy(pivotPosition);

    // Smoothly lerp pivot towards player (smooth following)
    pivotPosition.lerp(worldPosition, delta * 5);

    // Calculate how much the pivot moved
    const pivotDelta = new Vector3().subVectors(pivotPosition, lastPivot);

    // Move camera by the same amount to maintain distance
    camera.position.add(pivotDelta);

    // Update OrbitControls target to follow pivot
    controlsRef.current.target.copy(pivotPosition);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={15}
      maxDistance={100}
      enablePan={false}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
