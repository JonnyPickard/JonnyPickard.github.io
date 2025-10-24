/**
 * Hex Terrain Chunk Component
 *
 * Renders a configurable hex chunk using BufferGeometry
 * Handles local click events for pathfinding (no network calls)
 */
import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { generateHexChunkGeometry } from "../../geometry/hexChunkGeometry";
import { chunkToWorldPosition } from "../../geometry/hexPositioning";
import { worldPositionToWorldHex } from "../../utils/coordinateConversion";
import { useGameStore } from "../../store";
import type { ChunkCoord } from "../../types";

type HexTerrainChunkProps = {
  chunkCoord: ChunkCoord;
  onClick?: (chunkCoord: ChunkCoord) => void;
};

export function HexTerrainChunk({ chunkCoord, onClick }: HexTerrainChunkProps) {
  const chunkSize = useGameStore((state) => state.chunkSize);
  const computePath = useGameStore((state) => state.computePath);
  const setSelectedHex = useGameStore((state) => state.setSelectedHex);

  // Generate geometry based on chunk size
  const geometry = useMemo(() => {
    return generateHexChunkGeometry(chunkSize);
  }, [chunkSize]);

  // Calculate world position for this chunk
  const worldPosition = useMemo(() => {
    return chunkToWorldPosition(chunkCoord, chunkSize);
  }, [chunkCoord, chunkSize]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // Get world position from raycast
    const worldPos = event.point;

    // Convert to world hex
    const worldHex = worldPositionToWorldHex([worldPos.x, worldPos.y, worldPos.z], chunkSize);

    if (worldHex) {
      const clickedHex = worldHex.localCoord;
      console.log("Hex clicked:", clickedHex);

      // Update selected hex for visual feedback
      setSelectedHex(clickedHex);

      // Compute path locally (no network call)
      computePath(clickedHex);
    }

    // Call optional onClick callback
    onClick?.(chunkCoord);
  };

  return (
    <mesh position={worldPosition} geometry={geometry} onClick={handleClick}>
      <meshStandardMaterial color="#359b35" flatShading roughness={0.8} metalness={0.2} />
    </mesh>
  );
}
