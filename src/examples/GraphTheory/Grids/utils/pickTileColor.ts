import {
  PLAYER_PATH_FILL_COLOR,
  PLAYER_START_FILL_COLOR,
  TARGET_FILL_COLOR,
  TERRAIN_FILL_COLOR,
  TRANSPARENT_FILL_COLOR,
  VISITED_TILE_COLOR,
} from "../constants";

export const pickTileColor = (
  tileTypeInt: number,
  overrideTileColor?: string,
) => {
  if (overrideTileColor) {
    return overrideTileColor;
  }

  switch (tileTypeInt) {
    case 1:
      return TERRAIN_FILL_COLOR;
    case 2:
      return PLAYER_START_FILL_COLOR;
    case 3:
      return TARGET_FILL_COLOR;
    case 4:
      return PLAYER_PATH_FILL_COLOR;
    case 5:
      return VISITED_TILE_COLOR;
    default:
      return TRANSPARENT_FILL_COLOR;
  }
};
