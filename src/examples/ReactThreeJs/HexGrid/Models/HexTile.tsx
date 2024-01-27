import {
  HexTileGrass,
  HexMountainModel,
  OverlayHighlightOutline,
  OverlayHighlight,
  OverlayText,
} from ".";

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
  return (
    <group {...props} position={position}>
      <HexTileGrass rotationSeed={rotationSeed} textureSeed={textureSeed} />
      {showCoordinates && <OverlayText col={col} row={row} />}
      {isHoveredTile && <OverlayHighlightOutline />}
      {isTerrainTile && <HexMountainModel />}
      {isPlayerTile && <OverlayHighlight />}
    </group>
  );
}
