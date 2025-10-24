/**
 * Cube Coordinate System Utilities
 *
 * Provides conversion between offset coordinates (col, row) and cube coordinates (q, r, s)
 * for hexagonal grid pathfinding operations.
 *
 * Cube coordinates use the constraint: q + r + s = 0
 * This makes neighbor calculations uniform (6 fixed direction vectors)
 */

import type { ChunkSize } from "../../constants";
import type { CubeCoord, OffsetCoord } from "../../types";

/**
 * Convert offset coordinates to cube coordinates
 *
 * Offset: [col, row] where odd rows are shifted
 * Cube: { q, r, s } where q + r + s = 0
 *
 * @param offset - Offset coordinates [col, row]
 * @returns Cube coordinates { q, r, s }
 */
export function offsetToCube(offset: OffsetCoord): CubeCoord {
  const [col, row] = offset;
  const q = col - Math.floor(row / 2);
  const r = row;
  const s = -q - r;
  return { q, r, s };
}

/**
 * Convert cube coordinates to offset coordinates
 *
 * Cube: { q, r, s } where q + r + s = 0
 * Offset: [col, row] where odd rows are shifted
 *
 * Returns null if coordinates are out of bounds
 *
 * @param cube - Cube coordinates { q, r, s }
 * @param chunkSize - Size of the chunk for bounds checking
 * @returns Offset coordinates [col, row] or null if out of bounds
 */
export function cubeToOffset(cube: CubeCoord, chunkSize: ChunkSize): OffsetCoord | null {
  const { q, r } = cube;
  const col = q + Math.floor(r / 2);
  const row = r;

  // Validate chunk bounds
  if (col < 0 || col >= chunkSize || row < 0 || row >= chunkSize) {
    return null;
  }

  return [col, row];
}

/**
 * Six direction vectors for cube coordinate neighbors
 *
 * In cube coordinates, neighbors are calculated by adding these
 * fixed direction vectors (much simpler than offset coordinates)
 */
const DIRECTIONS: CubeCoord[] = [
  { q: 1, r: -1, s: 0 }, // East
  { q: 1, r: 0, s: -1 }, // Northeast
  { q: 0, r: 1, s: -1 }, // Northwest
  { q: -1, r: 1, s: 0 }, // West
  { q: -1, r: 0, s: 1 }, // Southwest
  { q: 0, r: -1, s: 1 }, // Southeast
];

/**
 * Get all 6 neighbors of a hex in cube coordinates
 *
 * @param cube - Cube coordinates { q, r, s }
 * @returns Array of 6 neighboring cube coordinates
 */
export function getNeighbors(cube: CubeCoord): CubeCoord[] {
  return DIRECTIONS.map((d) => ({
    q: cube.q + d.q,
    r: cube.r + d.r,
    s: cube.s + d.s,
  }));
}

/**
 * Calculate hex distance between two cube coordinates
 *
 * Uses the Manhattan distance in cube coordinate space
 * (maximum of absolute differences across all three axes)
 *
 * @param a - First cube coordinate
 * @param b - Second cube coordinate
 * @returns Distance in hexes
 */
export function hexDistance(a: CubeCoord, b: CubeCoord): number {
  return Math.max(Math.abs(a.q - b.q), Math.abs(a.r - b.r), Math.abs(a.s - b.s));
}
