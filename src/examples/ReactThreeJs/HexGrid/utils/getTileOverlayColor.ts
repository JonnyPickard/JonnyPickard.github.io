import { TILE_COLORS } from "../constants";

interface getTileOverlayColorOptions {
  isDestinationTile?: boolean;
  isActiveDestinationTile?: boolean;
  isHoveredTile?: boolean;
  isOriginTile?: boolean;
  isPlayerTile?: boolean;
  isInPath?: boolean;
}

export const getTileOverlayColor = ({
  isDestinationTile,
  isActiveDestinationTile,
  isHoveredTile,
  isOriginTile,
  isPlayerTile,
  isInPath,
}: getTileOverlayColorOptions) => {
  if (isActiveDestinationTile) {
    return TILE_COLORS.DESTINATION;
  } else if (isHoveredTile) {
    return TILE_COLORS.HOVERED;
  } else if (isInPath) {
    return TILE_COLORS.PATH;
  } else if (isPlayerTile) {
    return TILE_COLORS.PLAYER;
  } else if (isOriginTile) {
    return TILE_COLORS.ORIGIN;
  } else {
    return null;
  }
};
