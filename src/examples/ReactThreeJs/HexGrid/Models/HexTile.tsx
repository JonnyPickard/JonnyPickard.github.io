// TODO: Optimisation probably should used instanced mesh for repeating tiles
// NOTE: Tried this but you have to hack it to make shadows work
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
import { calculateTileRotation, getTileOverlayColor } from "../utils";

interface HexTileProps {
  /* Classing containing information about the hex relative to the grid */
  hex: Hex;
  /* Between 0 - 5 */
  textureSeed: number;
  rotationSeed: number;
  isDestinationTile?: boolean;
  isActiveDestinationTile?: boolean;
  isHoveredTile?: boolean;
  isOriginTile?: boolean;
  isPlayerTile?: boolean;
  isTerrainTile?: boolean;
  showCoordinates?: boolean;
  showCoordinatesAs?: "OFFSET" | "AXIAL" | "CUBE";
  // showSphere?: boolean;
}

export function HexTile({
  hex,
  position,
  rotationSeed,
  textureSeed,
  // showSphere = false,
  showCoordinates = true,
  showCoordinatesAs = "OFFSET",
  isDestinationTile,
  isActiveDestinationTile,
  isHoveredTile,
  isOriginTile,
  isPlayerTile,
  isTerrainTile,
  ...props
}: JSX.IntrinsicElements["group"] & HexTileProps) {
  const rotation = useMemo(
    () => calculateTileRotation(textureSeed, rotationSeed),
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

  const tileOverlayColor = getTileOverlayColor({
    isDestinationTile,
    isActiveDestinationTile,
    isHoveredTile,
    isOriginTile,
    isPlayerTile,
    isInPath: hex.isInPath,
  });

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
      {tileOverlayColor && (
        <HighlightTile tileOverlayColor={tileOverlayColor} />
      )}
      {isPlayerTile && <Player />}
    </group>
  );
}
