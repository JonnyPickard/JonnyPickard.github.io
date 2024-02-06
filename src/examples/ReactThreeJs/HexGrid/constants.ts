import {
  OffsetCoordinates,
  createHexOrigin,
  Orientation,
  hexToPoint,
  offsetToCubePointy,
  Hex,
} from "honeycomb-grid";

export const GRID_HEIGHT = 12;
export const GRID_WIDTH = 12;
// export const TERRAIN_TILES_AMOUNT = 30;
export const TERRAIN_TILES_AMOUNT = 0;
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

export enum TILE_COLORS {
  PATH = "#9d0d8c",
  OFFSET_ROW = "#186cb1",
  HOVERED = "#67a250",
  HOVERED_EMISSIVE_LIGHT = "limegreen",
  PLAYER = "#00bb9f",
  ORIGIN = "#3564ff",
  DESTINATION = "#ff44c8",
  TERRAIN = "#f00",
}
