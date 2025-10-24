/**
 * Hex Positioning Utilities
 *
 * Responsibility: Position calculations only (SRP compliance)
 *
 * Implements odd-row offset coordinate system for pointy-top hexagons
 */
import {
  HEX_CENTER_SPACING,
  ROW_OFFSET,
  ROW_SPACING,
  getChunkDimensions,
  type ChunkSize,
} from "../constants";
import type { ChunkCoord, LocalHexCoord, Vec2, Vec3 } from "../types";

/**
 * Calculate hex center position within a chunk
 *
 * @param local - [col, row] tuple
 * @returns { x, y } position within chunk
 */
export function getHexCenterInChunk(local: LocalHexCoord): Vec2 {
  const [col, row] = local;
  const xOffset = row % 2 === 1 ? ROW_OFFSET : 0;
  return {
    x: col * HEX_CENTER_SPACING + xOffset,
    y: row * ROW_SPACING,
  };
}

/**
 * Convert chunk coordinate to Three.js world position
 *
 * Three.js uses Y-up axis: X = left/right, Y = up/down, Z = forward/back
 * Hex grid rendered on X-Z plane (horizontal)
 *
 * @param chunk - [chunk_x, chunk_y] tuple
 * @param chunkSize - Size of the chunk
 * @returns [x, y, z] Three.js position
 */
export function chunkToWorldPosition(chunk: ChunkCoord, chunkSize: ChunkSize): Vec3 {
  const [chunkX, chunkY] = chunk;
  const { width, height } = getChunkDimensions(chunkSize);
  return [
    chunkX * width, // X axis (left/right)
    0, // Y axis (vertical) - flat terrain at y=0
    chunkY * height, // Z axis (forward/back)
  ];
}
