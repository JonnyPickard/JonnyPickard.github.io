/**
 * Hex Wireframe Overlay Component
 *
 * Renders wireframe edges for all hexes in a chunk to visualize tile boundaries
 * Controlled by wireframeVisible state in gameStore
 */
import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";
import { HEX_RADIUS } from "../../constants";
import { useGameStore } from "../../store";
import { chunkToWorldPosition } from "../../geometry/hexPositioning";
import { getHexVertices } from "../../geometry/hexGeometry";
import { getHexCenterInChunk } from "../../geometry/hexPositioning";
import type { ChunkCoord } from "../../types";

interface HexWireframeOverlayProps {
  chunkCoord: ChunkCoord;
  color?: string;
  lineWidth?: number;
}

/**
 * Generate wireframe line segments for all hexes in a chunk
 */
function generateHexWireframe(
  chunkWidth: number,
  chunkHeight: number,
  hexRadius: number
): BufferGeometry {
  const positions: number[] = [];

  for (let row = 0; row < chunkHeight; row++) {
    for (let col = 0; col < chunkWidth; col++) {
      // Get hex center in chunk space
      const center = getHexCenterInChunk([col, row]);

      // Get 6 vertices for this hex
      const vertices = getHexVertices(center, hexRadius);

      // Create 6 line segments connecting vertices
      for (let i = 0; i < 6; i++) {
        const nextI = (i + 1) % 6;
        const v1 = vertices[i];
        const v2 = vertices[nextI];

        // Line segment: v1 → v2 (Y=0.01 to hover slightly above terrain)
        positions.push(v1.x, 0.01, v1.y); // Three.js Y-up: hex Y → Z
        positions.push(v2.x, 0.01, v2.y);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  return geometry;
}

export function HexWireframeOverlay({
  chunkCoord,
  color = "#333333",
  lineWidth = 1,
}: HexWireframeOverlayProps) {
  const wireframeVisible = useGameStore((state) => state.wireframeVisible);
  const chunkSize = useGameStore((state) => state.chunkSize);

  // Generate wireframe geometry (memoized) - MUST be called before any early returns
  const geometry = useMemo(
    () => generateHexWireframe(chunkSize, chunkSize, HEX_RADIUS),
    [chunkSize]
  );

  // Calculate chunk world position
  const chunkPosition = chunkToWorldPosition(chunkCoord, chunkSize);

  // Don't render if not visible (AFTER all hooks)
  if (!wireframeVisible) return null;

  return (
    <lineSegments geometry={geometry} position={chunkPosition}>
      <lineBasicMaterial color={color} linewidth={lineWidth} />
    </lineSegments>
  );
}
