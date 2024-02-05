import { TILE_COLORS } from "../constants";

export const getTileOverlayColor = (
  isDestinationTile?: boolean,
  isHoveredTile?: boolean,
  isOriginTile?: boolean,
  isPlayerTile?: boolean,
) => {
  if (isDestinationTile) {
    return TILE_COLORS.DESTINATION;
  } else if (isHoveredTile) {
    return TILE_COLORS.HOVERED;
  } else if (isPlayerTile) {
    return TILE_COLORS.PLAYER;
  } else if (isOriginTile) {
    return TILE_COLORS.ORIGIN;
  } else {
    return null;
  }
};
