import { OffsetCoordinates } from "honeycomb-grid";

// Size is calculated as the diameter of the outer circle
// that can be drawn around the hex
// See https://www.redblobgames.com/grids/hexagons/#basics
// Mesh size calculated using geometry.boundingBox.max.z
// It would be better to reference the mesh vs this:
export const TILE_MESH_SIZE = 0.9937889575958252;
export const IMPASSABLE_COST = Infinity;
export const IMPASSABLE_CHANCE = 0.35;
export const MAX_COST = 5;
export const DEFAULT_PLAYER_TILE: OffsetCoordinates = {
  col: 4,
  row: 5,
};
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 10;

export enum TILE_COLORS {
  ROW = "#9d0d8c",
  OFFSET_ROW = "#186cb1",
  HOVERED = "#67a250",
  HOVERED_EMISSIVE_LIGHT = "limegreen",
  PLAYER = "#00bb9f",
  ORIGIN = "#3564ff",
  DESTINATION = "#ff44c8",
  TERRAIN = "#f00",
}
