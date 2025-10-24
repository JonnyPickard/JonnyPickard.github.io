/**
 * Coordinate Conversion Utilities
 *
 * Responsibility: Coordinate system conversions only (SRP compliance)
 *
 * Converts between hex coordinates and Three.js coordinate system
 */
import {
  HEX_CENTER_SPACING,
  ROW_OFFSET,
  ROW_SPACING,
  type ChunkSize,
} from "../constants";
import type { ChunkCoord, LocalHexCoord, Vec3, WorldPosition } from "../types";
import { chunkToWorldPosition, getHexCenterInChunk } from "../geometry/hexPositioning";

/**
 * Convert WorldHex to Three.js position
 *
 * Three.js Y-up: hex grid on X-Z plane
 * LocalCenter {x, y} maps to Three.js X and Z axes
 *
 * @param worldHex - WorldHex with chunk_coord and local_coord
 * @param chunkSize - Size of the chunk
 * @returns [x, y, z] Three.js position
 */
export function worldHexToThreePosition(
  worldHex: {
    chunkCoord: ChunkCoord;
    localCoord: LocalHexCoord;
  },
  chunkSize: ChunkSize
): Vec3 {
  const chunkPos = chunkToWorldPosition(worldHex.chunkCoord, chunkSize);
  const localCenter = getHexCenterInChunk(worldHex.localCoord);

  return [
    chunkPos[0] + localCenter.x, // X axis (chunk X + local X)
    chunkPos[1], // Y axis (vertical, stays at 0 for flat terrain)
    chunkPos[2] + localCenter.y, // Z axis (chunk Z + local Y)
  ];
}

/**
 * Convert Three.js world position to server WorldPosition
 *
 * Three.js Y-up: hex grid on X-Z plane
 * Server WorldPosition: [x, y] 2D hex coordinate
 *
 * @param position - [x, y, z] Three.js position
 * @returns [x, y] server WorldPosition (Three.js X,Z → Server X,Y)
 */
export function threePositionToWorldPosition(position: Vec3): WorldPosition {
  return [position[0], position[2]]; // X stays X, Z becomes Y
}

/**
 * Convert Three.js world position to WorldHex coordinate
 *
 * Uses pointy-top hex with odd-row offset coordinate system
 * Three.js Y-up: hex grid on X-Z plane, Y is vertical
 * Assumes single chunk at origin [0, 0]
 *
 * @param position - [x, y, z] Three.js world position
 * @param chunkSize - Size of the chunk for bounds checking
 * @returns WorldHex with chunkCoord, localCoord, worldPosition
 */
export function worldPositionToWorldHex(
  position: Vec3,
  chunkSize: ChunkSize
): {
  chunkCoord: ChunkCoord;
  localCoord: LocalHexCoord;
  worldPosition: WorldPosition;
} | null {
  const [x, _y, z] = position; // Extract x and z, ignore y (vertical)

  // Calculate row (z represents hex "y" axis)
  const row = Math.round(z / ROW_SPACING);

  // Calculate column based on row parity (odd rows are offset)
  let col: number;
  if (row % 2 === 1) {
    // Odd row: offset by ROW_OFFSET
    col = Math.round((x - ROW_OFFSET) / HEX_CENTER_SPACING);
  } else {
    // Even row: no offset
    col = Math.round(x / HEX_CENTER_SPACING);
  }

  // Validate bounds
  if (col < 0 || col >= chunkSize || row < 0 || row >= chunkSize) {
    return null; // Out of bounds
  }

  return {
    chunkCoord: [0, 0], // Single chunk at origin
    localCoord: [col, row],
    worldPosition: [x, z], // Server WorldPosition: [x, y] maps to Three.js [x, z]
  };
}
