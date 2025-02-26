import {
  PLAYER_START_FILL_COLOR,
  TERRAIN_FILL_COLOR,
  PLAYER_DESTINATION_FILL_COLOR,
  PLAYER_PATH_FILL_COLOR,
  TRANSPARENT_FILL_COLOR,
} from "../constants";

export const pickCellColor = (
  cellTypeInt: number,
  overrideCellColor?: string,
) => {
  // TODO: temporary - to highlight current tile algorithm is working on
  if (overrideCellColor) {
    return overrideCellColor;
  }

  switch (cellTypeInt) {
    case 1:
      return TERRAIN_FILL_COLOR;
    case 2:
      return PLAYER_START_FILL_COLOR;
    case 3:
      return PLAYER_DESTINATION_FILL_COLOR;
    case 4:
      return PLAYER_PATH_FILL_COLOR;
    default:
      return TRANSPARENT_FILL_COLOR;
  }
};
