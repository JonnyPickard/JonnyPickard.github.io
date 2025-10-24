/**
 * Player Cube Component
 *
 * Tick-synchronized movement with smooth animation.
 * Animates smoothly from old position → new position with interpolation.
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { Vector3 } from "three";
import { PLAYER_SIZE, TICK_INTERPOLATION_DURATION } from "../../constants";
import { useGameStore } from "../../store";
import { worldHexToThreePosition } from "../../utils/coordinateConversion";
import type { OffsetCoord } from "../../types";

export function PlayerCube() {
  const meshRef = useRef<Mesh>(null);

  // Player position from store
  const playerPosition = useGameStore((state) => state.playerPosition);
  const chunkSize = useGameStore((state) => state.chunkSize);

  // Animation state
  const [animationState, setAnimationState] = useState<{
    startPos: Vector3;
    targetPos: Vector3;
    startTime: number;
  } | null>(null);

  // Track previous position to detect updates
  const previousPosition = useRef<OffsetCoord>(playerPosition);

  // When playerPosition updates, start animation
  useEffect(() => {
    if (!meshRef.current) return;

    // Check if position actually changed
    const [prevCol, prevRow] = previousPosition.current;
    const [newCol, newRow] = playerPosition;
    if (prevCol === newCol && prevRow === newRow) return;

    console.log(
      `[PlayerCube] Position update: [${prevCol},${prevRow}] → [${newCol},${newRow}]`
    );

    // Calculate start and target positions in world space
    const startWorldPos = worldHexToThreePosition(
      {
        chunkCoord: [0, 0],
        localCoord: previousPosition.current,
      },
      chunkSize
    );

    const targetWorldPos = worldHexToThreePosition(
      {
        chunkCoord: [0, 0],
        localCoord: playerPosition,
      },
      chunkSize
    );

    // Store animation state
    setAnimationState({
      startPos: new Vector3(
        startWorldPos[0],
        startWorldPos[1] + PLAYER_SIZE / 2,
        startWorldPos[2]
      ),
      targetPos: new Vector3(
        targetWorldPos[0],
        targetWorldPos[1] + PLAYER_SIZE / 2,
        targetWorldPos[2]
      ),
      startTime: Date.now(),
    });

    // Update previous position tracker
    previousPosition.current = playerPosition;
  }, [playerPosition, chunkSize]);

  // Animation loop - smooth interpolation
  useFrame(() => {
    if (!meshRef.current || !animationState) return;

    const elapsed = Date.now() - animationState.startTime;
    const progress = Math.min(elapsed / TICK_INTERPOLATION_DURATION, 1); // 0 to 1

    // Lerp from start → target based on time progress
    meshRef.current.position.lerpVectors(
      animationState.startPos,
      animationState.targetPos,
      progress
    );

    // Clear animation state when complete
    if (progress >= 1) {
      setAnimationState(null);
    }
  });

  // Initial position
  const basePosition = worldHexToThreePosition(
    {
      chunkCoord: [0, 0],
      localCoord: playerPosition,
    },
    chunkSize
  );

  const position: [number, number, number] = [
    basePosition[0],
    basePosition[1] + PLAYER_SIZE / 2,
    basePosition[2],
  ];

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE]} />
      <meshStandardMaterial color="#3388ff" />
    </mesh>
  );
}
