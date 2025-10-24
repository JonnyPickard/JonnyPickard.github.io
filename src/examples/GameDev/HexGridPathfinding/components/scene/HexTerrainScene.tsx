/**
 * Hex Terrain Scene Component
 *
 * Main 3D scene containing hex terrain, lighting, camera controls, and pathfinding
 * Pure client-side implementation with no network calls
 */
import { Environment } from "@react-three/drei";
import { GameLoop } from "../game/GameLoop";
import { HexTerrainChunk } from "../terrain/HexTerrainChunk";
import { HexSelector } from "../interaction/HexSelector";
import { HexWireframeOverlay } from "../terrain/HexWireframeOverlay";
import { PlayerCube } from "../player/PlayerCube";
import { PlayerPositionOverlay } from "../player/PlayerPositionOverlay";
import { Obstacles } from "../pathfinding/Obstacles";
import { PathLine } from "../pathfinding/PathLine";
import { CameraFollowPlayer } from "../camera/CameraFollowPlayer";
import { useGameStore } from "../../store";
import { getChunkDimensions } from "../../constants";
import type { ChunkCoord } from "../../types";

export function HexTerrainScene() {
  const chunkSize = useGameStore((state) => state.chunkSize);

  const handleChunkClick = (chunkCoord: ChunkCoord) => {
    console.log("Chunk clicked:", chunkCoord);
  };

  // Calculate grid helper size based on chunk size
  const { width, height } = getChunkDimensions(chunkSize);
  const gridSize = Math.max(width, height) * 1.1;
  const gridDivisions = Math.ceil(gridSize / 8);

  return (
    <>
      {/* Game Loop - tick system with automatic movement */}
      <GameLoop />

      {/* Environment - HDRI skybox */}
      <Environment
        preset="forest"
        background
        backgroundBlurriness={0.2}
        environmentIntensity={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />

      {/* Single chunk at origin */}
      <HexTerrainChunk chunkCoord={[0, 0]} onClick={handleChunkClick} />

      {/* Hex wireframe overlay for tile boundaries */}
      <HexWireframeOverlay chunkCoord={[0, 0]} color="#222222" />

      {/* Hex selection visual feedback */}
      <HexSelector />

      {/* Player position overlay - shows "true" position */}
      <PlayerPositionOverlay />

      {/* Pathfinding: Path line visualization */}
      <PathLine />

      {/* Pathfinding: Obstacles (red cylinders) */}
      <Obstacles />

      {/* Player cube with smooth interpolated movement */}
      <PlayerCube />

      {/* Camera controls - follows player with orbit */}
      <CameraFollowPlayer />

      {/* Visual helpers */}
      <gridHelper args={[gridSize, gridDivisions]} position={[width / 2, 0, height / 2]} />
      <axesHelper args={[50]} />
    </>
  );
}
