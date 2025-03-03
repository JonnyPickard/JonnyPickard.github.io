import { TILE_COLORS } from "../constants";

interface getTileOverlayColorOptions {
  isActiveTargetTile?: boolean;
  isHoveredTile?: boolean;
  isOriginTile?: boolean;
  isPlayerTile?: boolean;
  isInPath?: boolean;
}

export const getTileOverlayColor = ({
  isActiveTargetTile,
  isHoveredTile,
  isOriginTile,
  isPlayerTile,
  isInPath,
}: getTileOverlayColorOptions) => {
  if (isActiveTargetTile) {
    return TILE_COLORS.TARGET;
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
