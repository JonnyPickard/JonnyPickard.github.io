// TODO: Optimisation probably should used instanced mesh for repeating tiles
import {
  HexTileGrass,
  OverlayHighlightOutline,
  OverlayHighlight,
  OverlayText,
  Player,
  Terrain,
} from ".";
import { Hex } from "honeycomb-grid";

import { useMemo } from "react";
import { calculateRotation } from "../utils";

interface HexTileProps {
  /* Classing containing information about the hex relative to the grid */
  hex: Hex;
  /* Between 0 - 5 */
  textureSeed: number;
  rotationSeed: number;
  isHoveredTile?: boolean;
  isPlayerTile?: boolean;
  isDestinationTile?: boolean;
  isTerrainTile?: boolean;
  hideTile?: boolean;
  showCoordinates?: boolean;
  showCoordinatesAs?: "OFFSET" | "AXIAL" | "CUBE";
  showSphere?: boolean;
}

export function HexTile({
  hex,
  position,
  rotationSeed,
  textureSeed,
  hideTile = false,
  showSphere = false,
  showCoordinates = true,
  showCoordinatesAs = "CUBE",
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
      {isHoveredTile && <OverlayHighlightOutline />}
      {isTerrainTile && <Terrain rotation={rotation} />}
      {isPlayerTile && <OverlayHighlight />}
      {isPlayerTile && <Player />}
      {isPlayerTile && !isHoveredTile && (
        <OverlayHighlightOutline isPlayerTile={isPlayerTile} />
      )}
    </group>
  );
}
