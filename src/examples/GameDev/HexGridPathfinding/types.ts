/**
 * Coordinate Types
 * Standalone version for HexGridPathfinding example
 */

// Offset coordinates [col, row] - used for hex grid positioning
// In odd-row offset system, odd rows are shifted right by 0.5
export type OffsetCoord = [number, number];

// Cube coordinates [q, r, s] - used for pathfinding calculations
// Constraint: q + r + s = 0
export type CubeCoord = { q: number; r: number; s: number };

// World position in 2D hex space [x, y]
export type WorldPosition = [number, number];

// Chunk coordinate [chunkX, chunkY] - identifies which chunk
export type ChunkCoord = [number, number];

// Local hex coordinate within a chunk [col, row]
// Values range from 0 to CHUNK_SIZE-1
export type LocalHexCoord = OffsetCoord;

// Full world hex identifier
export interface WorldHex {
  chunkCoord: ChunkCoord;
  localCoord: LocalHexCoord;
  worldPosition: WorldPosition;
}

// Utility types for Three.js integration
export interface Vec2 {
  x: number;
  y: number;
}

export type Vec3 = [number, number, number];

// Helper functions to convert between types
export function tupleToVec2(tuple: [number, number]): Vec2 {
  return { x: tuple[0], y: tuple[1] };
}

export function vec2ToTuple(vec: Vec2): [number, number] {
  return [vec.x, vec.y];
}

export function offsetCoordToKey(coord: OffsetCoord): string {
  return `${coord[0]},${coord[1]}`;
}

export function keyToOffsetCoord(key: string): OffsetCoord {
  const [col, row] = key.split(",").map(Number);
  return [col, row];
}
