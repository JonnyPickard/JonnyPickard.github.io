/**
 * Hex Grid Mathematical Constants
 * Standalone version adapted from rhythm-hex-mmorpg game client
 */

// Hex geometry constants (pointy-top hexagons)
export const HEX_RADIUS = 1.0;
export const HEX_CENTER_SPACING = 1.7320508075688772; // sqrt(3)
export const HEX_DIAMETER = 2.0;
export const ROW_SPACING = 1.5;
export const ROW_OFFSET = 0.8660254037844386; // sqrt(3) / 2

// Configurable chunk sizes (64, 96, or 128)
export const CHUNK_SIZE_OPTIONS = [64, 96, 128] as const;
export type ChunkSize = (typeof CHUNK_SIZE_OPTIONS)[number];

// Default chunk size
export const DEFAULT_CHUNK_SIZE: ChunkSize = 64;

// Calculate chunk world dimensions based on chunk size
export function getChunkDimensions(chunkSize: ChunkSize) {
  const width = (chunkSize + 0.5) * HEX_CENTER_SPACING;
  const height = (chunkSize - 1) * ROW_SPACING + HEX_DIAMETER;
  return { width, height };
}

// Hex orientation and coordinate system
export const HEX_ORIENTATION = "pointy-top" as const;
export const COORDINATE_SYSTEM = "odd-row-offset" as const;

// Game tick timing (milliseconds)
export const DEFAULT_TICK_INTERVAL = 600;
export const TICK_INTERPOLATION_DURATION = 600;

// Tiles per tick (movement speed)
export const TILES_PER_TICK_OPTIONS = [1, 2, 3] as const;
export type TilesPerTick = (typeof TILES_PER_TICK_OPTIONS)[number];
export const DEFAULT_TILES_PER_TICK: TilesPerTick = 1;

// Visual constants
export const OBSTACLE_HEIGHT = 0.4;
export const OBSTACLE_RADIUS = 0.4;
export const PLAYER_SIZE = 0.8;
export const PATH_LINE_WIDTH = 0.05;
export const HEX_SELECTOR_HEIGHT = 0.1;
