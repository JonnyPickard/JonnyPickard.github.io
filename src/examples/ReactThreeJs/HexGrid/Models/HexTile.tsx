import {
  HexTileGrass,
  HexMountainModel,
  OverlayHighlightOutline,
  OverlayHighlight,
  OverlayText,
} from ".";

import { useMemo } from "react";
import { calculateRotation } from "../utils";

interface HexTileProps {
  isOffset: boolean;
  /* Offset coords - Column */
  col: number;
  /* Offset coords - Row */
  row: number;
  /* Between 0 - 5 */
  textureSeed: number;
  rotationSeed: number;
  isHoveredTile?: boolean;
  isPlayerTile?: boolean;
  isDestinationTile?: boolean;
  isTerrainTile?: boolean;
  hideTile?: boolean;
  showCoordinates?: boolean;
  showSphere?: boolean;
}

export function HexTile({
  position,
  col,
  row,
  rotationSeed,
  textureSeed,
  isOffset,
  hideTile = false,
  showSphere = false,
  showCoordinates = true,
  isHoveredTile,
  isPlayerTile,
  isDestinationTile,
  isTerrainTile,
  ...props
}: JSX.IntrinsicElements["group"] & HexTileProps) {
  const rotation = useMemo(
    () => calculateRotation(textureSeed, rotationSeed),
    [textureSeed, rotationSeed],
  );
  return (
    <group {...props} position={position}>
      <HexTileGrass textureSeed={textureSeed} rotation={rotation} />
      {showCoordinates && (
        <OverlayText
          col={col}
          row={row}
          isTerrainTile={isTerrainTile}
          isHoveredTile={isHoveredTile}
        />
      )}
      {isHoveredTile && <OverlayHighlightOutline />}
      {isTerrainTile && <HexMountainModel rotation={rotation} />}
      {isPlayerTile && <OverlayHighlight />}
      {isPlayerTile && !isHoveredTile && (
        <OverlayHighlightOutline isPlayerTile={isPlayerTile} />
      )}
    </group>
  );
}
