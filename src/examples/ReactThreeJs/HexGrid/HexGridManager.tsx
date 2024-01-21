// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z
// https://www.redblobgames.com/grids/hexagons/#coordinates-offset
import { defineCustomHex, setTerrainTiles } from ".";
import { useState, useEffect } from "react";
import {
  Hex,
  Grid,
  rectangle,
  Orientation,
  hexToPoint,
  hexToOffset,
  OffsetCoordinates,
} from "honeycomb-grid";
import { HexTileBase, HexTileGrass } from "./Models";

type OffsetCoordinatesState = OffsetCoordinates | { col: null; row: null };

/**
 * isActiveTile
 * Check whether the tile used by the player === the tile the grid manager loop is processing
 *
 * @param {OffsetCoordinatesState} tile the tile being interacted with by the player
 * @param {OffsetCoordinates} currentPositionInLoop the tile being processed by the grid manager
 * @return {*}
 */
const isActiveTile = (
  tile: OffsetCoordinatesState,
  currentPositionInLoop: OffsetCoordinates,
) => {
  const { col, row } = currentPositionInLoop;

  return tile.col === col && tile.row === row;
};

const hardcodedTileSize = 0.9937889575958252;

export const HexGridManager = () => {
  /* 
    Tile that the Player is hovering over 
    Will be used to calculate path traversal
  */
  const [hoveredTile, setHoveredTile] = useState<OffsetCoordinatesState>({
    col: null,
    row: null,
  });
  /* 
    When a destination tile is set for traversal
    Origin tile set as the starting point 
  */
  const [originTile, setOriginTile] = useState<OffsetCoordinatesState>({
    col: null,
    row: null,
  });
  /* Tile that the player clicks to move to */
  const [destinationTile, setDestinationTile] =
    useState<OffsetCoordinatesState>({
      col: null,
      row: null,
    });
  /* Defaulting to a reletively central point to begin with*/
  const [playerTile, setPlayerTile] = useState<OffsetCoordinatesState>({
    col: 4,
    row: 5,
  });

  const [grid, setGrid] = useState<Grid<Hex>>();

  // Only run on first render to prevent expensive grid recalculations
  useEffect(() => {
    // 1. Create a hex class:
    const Hex = defineCustomHex({
      // Hardcoded for now but this comes from:
      // console.log(nodes.HexTile.geometry.boundingBox.max);
      // const boundingBox = {
      //   z: 0.9937889575958252,
      // };
      dimensions: hardcodedTileSize,
      // origin: "topLeft", // default
      // NOTE: This seems to be about the grid offset?
      // but should really work out how to calc the hexs vs grid
      // Probably due to different unit sizes for the grid/ my mesh?
      origin: { x: 8, y: 6 },
      orientation: Orientation.POINTY,
      // offset every other row by 1/2 hex
      // offset: -1, // default (odd-r)
      // offset: 1, // (even-r)
    });

    // 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
    const hexGrid = new Grid(Hex, rectangle({ width: 10, height: 10 }));

    setTerrainTiles(hexGrid, 6);
    setGrid(hexGrid);
  }, []);

  // 3. Iterate over the grid to render each hex:
  return grid?.toArray().map((hex) => {
    // Internally honeycomb uses Axial coordinates
    // But these seem confusing to look at in a rectangle
    // https://www.redblobgames.com/grids/hexagons/#coordinates-offset
    const { x, y } = hexToPoint(hex);
    const { col, row } = hexToOffset(hex);

    const isTerrainTile = hex.isTraversable === false;

    // Is an offset row
    const isOffset = Boolean(row % 2);

    // Will use as a prop to Hide 3/4's of the tiles
    // To make understanding the 3D geometry easier
    // const hideTile = Boolean(q % 2 && isOffset);
    const hideTile = false;

    const isHoveredTile = isActiveTile(hoveredTile, { col, row });
    const isPlayerTile = isActiveTile(playerTile, { col, row });
    const isDestinationTile = isActiveTile(destinationTile, { col, row });

    return (
      <HexTileGrass key={`${col}-${row}`} position={[x, 0, y]} />
      // <HexTileBase
      // key={`${col}-${row}`}
      // position={[x, 0, y]}
      //   col={col}
      //   row={row}
      //   isOffset={isOffset}
      //   isHoveredTile={isHoveredTile}
      //   isPlayerTile={isPlayerTile}
      //   isDestinationTile={isDestinationTile}
      //   isTerrainTile={isTerrainTile}
      //   hideTile={hideTile}
      //   onPointerOver={(e) => {
      //     e.stopPropagation;
      //     setHoveredTile({ col, row });
      //   }}
      //   onPointerDown={(e) => {
      //     e.stopPropagation;
      //     setDestinationTile(hoveredTile);
      //     setOriginTile(playerTile);
      //   }}
      // />
    );
  });
};
