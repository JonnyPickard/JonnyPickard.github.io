import {
  Hex,
  OffsetCoordinates,
  Orientation,
  createHexOrigin,
  hexToPoint,
  offsetToCubePointy,
} from "honeycomb-grid";

import type { Color } from "@react-three/fiber";

export const GRID_SIZE = 9;
export const GRID_HEIGHT = GRID_SIZE;
export const GRID_WIDTH = GRID_SIZE;
export const TERRAIN_TILES_AMOUNT = 30;
export const IMPASSABLE_COST = Infinity;
// Size is calculated as the diameter of the outer circle
// that can be drawn around the hex
// See https://www.redblobgames.com/grids/hexagons/#basics
// Mesh size calculated using geometry.boundingBox.max.z
// It would be better to reference the mesh vs this:
export const TILE_MESH_SIZE = 0.9937889575958252;
export const TILE_MESH_DIMENSIONS = {
  xRadius: TILE_MESH_SIZE,
  yRadius: TILE_MESH_SIZE,
};
export const HEX_ORIGIN = createHexOrigin("topLeft", {
  width: TILE_MESH_SIZE,
  height: TILE_MESH_SIZE,
});
export const DEFAULT_PLAYER_TILE: OffsetCoordinates = {
  /* If offset row Math.floor(GRID_WIDTH / 2) -1 */
  col: Math.floor(GRID_WIDTH / 2),
  row: Math.floor(GRID_HEIGHT / 2),
};

const cubeCoords = offsetToCubePointy(
  DEFAULT_PLAYER_TILE.col,
  DEFAULT_PLAYER_TILE.row,
  -1,
);

const charStart = hexToPoint({
  orientation: Orientation.POINTY,
  dimensions: TILE_MESH_DIMENSIONS,
  origin: HEX_ORIGIN,
  ...cubeCoords,
  offset: -1,
} as Hex);

export const CHARACTER_START_CAM_POSITION = {
  camX: charStart.x,
  camZ: charStart.y,
};

export const TILE_COLORS: {
  [color: string]: Color;
} = {
  PATH: "#bb00a7",
  OFFSET_ROW: "#186cb1",
  HOVERED: "#67a250",
  HOVERED_EMISSIVE_LIGHT: "limegreen",
  PLAYER: "#00bb9f",
  ORIGIN: "#3564ff",
  TARGET: "#ff4dff",
};
