import { TILE_COLORS } from "../Models/constants";

export const getTileOverlayColor = (
  isDestinationTile?: boolean,
  isHoveredTile?: boolean,
  isOriginTile?: boolean,
  isPlayerTile?: boolean,
) => {
  if (isHoveredTile) {
    return TILE_COLORS.HOVERED;
  } else if (isPlayerTile) {
    return TILE_COLORS.PLAYER;
  } else if (isDestinationTile) {
    return TILE_COLORS.DESTINATION;
  } else if (isOriginTile) {
    return TILE_COLORS.ORIGIN;
  } else {
    return null;
  }
};
