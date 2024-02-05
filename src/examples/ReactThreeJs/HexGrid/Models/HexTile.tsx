// TODO: Optimisation probably should used instanced mesh for repeating tiles
import {
  HexTileGrass,
  Outline,
  HighlightTile,
  OverlayText,
  Player,
  Terrain,
} from ".";
import { Hex } from "honeycomb-grid";

import { useMemo } from "react";
import { calculateRotation, getTileOverlayColor } from "../utils";
import { TILE_COLORS } from "../constants";

interface HexTileProps {
  /* Classing containing information about the hex relative to the grid */
  hex: Hex;
  /* Between 0 - 5 */
  textureSeed: number;
  rotationSeed: number;
  isDestinationTile?: boolean;
  isHoveredTile?: boolean;
  isOriginTile?: boolean;
  isPlayerTile?: boolean;
  isTerrainTile?: boolean;
  showCoordinates?: boolean;
  showCoordinatesAs?: "OFFSET" | "AXIAL" | "CUBE";
  showSphere?: boolean;
}

export function HexTile({
  hex,
  position,
  rotationSeed,
  textureSeed,
  showSphere = false,
  showCoordinates = true,
  showCoordinatesAs = "OFFSET",
  isDestinationTile,
  isHoveredTile,
  isOriginTile,
  isPlayerTile,
  isTerrainTile,
  ...props
}: JSX.IntrinsicElements["group"] & HexTileProps) {
  const rotation = useMemo(
    () => calculateRotation(textureSeed, rotationSeed),
    [textureSeed, rotationSeed],
  );

  const coordinatesToDisplayForTextOverlay = useMemo(() => {
    switch (showCoordinatesAs) {
      case "OFFSET":
        return { q: hex.col, r: hex.row, s: null };
      case "AXIAL":
        return { q: hex.q, r: hex.r, s: null };
      case "CUBE":
        return { q: hex.q, r: hex.r, s: hex.s };
    }
  }, [showCoordinatesAs, hex]);

  const tileOverlayColor = getTileOverlayColor(
    isDestinationTile,
    isHoveredTile,
    isOriginTile,
    isPlayerTile,
  );

  return (
    <group {...props} position={position}>
      <HexTileGrass rotation={rotation} />
      {showCoordinates && (
        <OverlayText
          coordinates={coordinatesToDisplayForTextOverlay}
          isTerrainTile={isTerrainTile}
          isHoveredTile={isHoveredTile}
        />
      )}
      {isTerrainTile && <Terrain rotation={rotation} />}
      {tileOverlayColor && <Outline tileOverlayColor={tileOverlayColor} />}
      {hex.isInPath ? (
        <HighlightTile tileOverlayColor={TILE_COLORS.ROW} />
      ) : (
        tileOverlayColor && (
          <HighlightTile tileOverlayColor={tileOverlayColor} />
        )
      )}
      {isPlayerTile && <Player />}
    </group>
  );
}
