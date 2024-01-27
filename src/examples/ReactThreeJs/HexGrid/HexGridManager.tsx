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
import { HexTile } from "./Models";
import { isTile } from "./utils";

type NullableOffsetCoordinates = OffsetCoordinates | { col: null; row: null };

const DEFAULT_PLAYER_TILE: OffsetCoordinates = {
  col: 4,
  row: 5,
};

export const HexGridManager = () => {
  /* 
    Tile that the Player is hovering over 
    Will be used to calculate path traversal
  */
  const [hoveredTile, setHoveredTile] = useState<NullableOffsetCoordinates>({
    col: null,
    row: null,
  });
  /* 
    When a destination tile is set for traversal
    Origin tile set as the starting point 
  */
  const [originTile, setOriginTile] = useState<NullableOffsetCoordinates>({
    col: null,
    row: null,
  });
  /* Tile that the player clicks to move to */
  const [destinationTile, setDestinationTile] =
    useState<NullableOffsetCoordinates>({
      col: null,
      row: null,
    });

  /* Defaulting to a reletively central point to begin with*/
  const [playerTile, setPlayerTile] =
    useState<OffsetCoordinates>(DEFAULT_PLAYER_TILE);

  const [grid, setGrid] = useState<Grid<Hex>>();

  // Only run on first render to prevent expensive grid recalculations
  useEffect(() => {
    // Size is calculated as the diameter of the outer circle
    // that can be drawn around the hex
    // See https://www.redblobgames.com/grids/hexagons/#basics
    const hardcodedTileSize = 0.9937889575958252;
    // nodes.HexTile.geometry.boundingBox.max
    // const boundingBox = {
    //   "x": 0.8642922043800354,
    //   "y": 0.026939410716295242,
    //   "z": 0.9937889575958252
    // }

    // 1. Create a hex class:
    const Hex = defineCustomHex({
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

    setTerrainTiles(hexGrid, 6, DEFAULT_PLAYER_TILE);
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

    const isHoveredTile = isTile(hoveredTile, { col, row });
    const isPlayerTile = isTile(playerTile, { col, row });
    const isDestinationTile = isTile(destinationTile, { col, row });

    const [textureSeed, rotationSeed] = hex.randomSeeds;

    return (
      <HexTile
        key={`${col}-${row}`}
        position={[x, 0, y]}
        col={col}
        row={row}
        isOffset={isOffset}
        isHoveredTile={isHoveredTile}
        isPlayerTile={isPlayerTile}
        isDestinationTile={isDestinationTile}
        isTerrainTile={isTerrainTile}
        textureSeed={textureSeed}
        rotationSeed={rotationSeed}
        hideTile={hideTile}
        onPointerOver={(e) => {
          e.stopPropagation;
          setHoveredTile({ col, row });
        }}
        onPointerDown={(e) => {
          e.stopPropagation;
          setDestinationTile(hoveredTile);
          setOriginTile(playerTile);
        }}
      />
    );
  });
};
