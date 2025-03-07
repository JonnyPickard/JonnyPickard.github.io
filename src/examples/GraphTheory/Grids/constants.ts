import type { GridMatrix } from "./GridTypes";

export const DEFAULT_MATRIX: GridMatrix = [
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 2],
  [1, 0, 0, 0],
];

export const DEFAULT_TILE_SIZE = 60;
export const DEFAULT_STROKE_WIDTH = 2;

// Fill Colors

export const FIND_NEIGHBOURS_CURRENT_TILE_COLOR = "fill-sky-400";
export const FIND_NEIGHBOURS_SUCCESS_COLOR = "fill-lime-500";
export const FIND_NEIGHBOURS_FAILURE_COLOR = "fill-rose-800";
export const PROCESSING_TILE_COLOR = "fill-sky-600";

// Processed
export const VISITED_TILE_COLOR = "fill-teal-700/60";
export const PLAYER_PATH_FILL_COLOR = "fill-lime-500/80";
export const TERRAIN_FILL_COLOR = "fill-pink-700";
export const PLAYER_START_FILL_COLOR = "fill-violet-500";
export const TARGET_FILL_COLOR = "fill-emerald-500";
export const TRANSPARENT_FILL_COLOR = "fill-transparent";

// BG colors
export const BG_FIND_NEIGHBOURS_CURRENT_TILE_COLOR = "bg-sky-400";
export const BG_FIND_NEIGHBOURS_SUCCESS_COLOR = "bg-lime-500";
export const BG_FIND_NEIGHBOURS_FAILURE_COLOR = "bg-rose-800";
export const BG_PROCESSING_TILE_COLOR = "bg-sky-600";

// Processed
export const BG_VISITED_TILE_COLOR = "bg-teal-700/60";
export const BG_PLAYER_PATH_COLOR = "bg-lime-500";
export const BG_TERRAIN_COLOR = "bg-pink-700";
export const BG_PLAYER_START_COLOR = "bg-violet-500";
export const BG_TARGET_COLOR = "bg-emerald-500";
export const BG_TRANSPARENT_COLOR = "bg-transparent";

// Stroke Colors
export const DEFAULT_STROKE_COLOR = "stroke-slate-800";
