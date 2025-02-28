import { TILE_COLORS } from "../constants";

interface getTileOverlayColorOptions {
  isActiveDestinationTile?: boolean;
  isHoveredTile?: boolean;
  isOriginTile?: boolean;
  isPlayerTile?: boolean;
  isInPath?: boolean;
}

export const getTileOverlayColor = ({
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
  } else if (isPlayerTile) {
    return TILE_COLORS.PLAYER;
  } else if (isInPath) {
    return TILE_COLORS.PATH;
  } else if (isOriginTile) {
    return TILE_COLORS.ORIGIN;
  } else {
    return null;
  }
};
