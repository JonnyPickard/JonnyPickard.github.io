// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z
// https://www.redblobgames.com/grids/hexagons/#coordinates-offset
import { defineCustomHex } from ".";

import { useState, useEffect } from "react";
import {
  Hex,
  Grid,
  rectangle,
  Orientation,
  hexToPoint,
  hexToOffset,
  OffsetCoordinates,
  isOffset as isOffsetCoords,
} from "honeycomb-grid";
import { HexTile } from "./Models";
import { isTile, generateTerrainTiles } from "./utils";
import {
  TILE_MESH_SIZE,
  DEFAULT_PLAYER_TILE,
  GRID_WIDTH,
  GRID_HEIGHT,
  HEX_ORIGIN,
  TERRAIN_TILES_AMOUNT,
} from "./constants";
import { AStar } from "./algorithms/AStar";

import type { NullableOffsetCoordinates } from "./types";

export const HexGridManager = () => {
  /* 
    Class used to manage path traversal
  */
  const [aStar, setAStar] = useState<AStar>();
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
    // 1. Create a hex class:
    const Hex = defineCustomHex({
      dimensions: TILE_MESH_SIZE,
      origin: HEX_ORIGIN,
      orientation: Orientation.POINTY,
    });

    // 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
    const hexGrid = new Grid(
      Hex,
      rectangle({
        width: GRID_WIDTH,
        height: GRID_HEIGHT,
      }),
    );

    const terrainTiles = generateTerrainTiles(
      hexGrid,
      TERRAIN_TILES_AMOUNT,
      DEFAULT_PLAYER_TILE,
    );
    hexGrid.setHexes(terrainTiles);

    setGrid(hexGrid);
    setAStar(new AStar(hexGrid));
  }, []);

  // useEffect(() => {
  // if (grid && isOffsetCoords(playerTile) && isOffsetCoords(destinationTile)) {
  //   aStar?.traverse(playerTile, destinationTile);
  // }
  // }, [destinationTile, grid, playerTile]);

  // On Hover Calc Path
  useEffect(() => {
    if (grid && isOffsetCoords(hoveredTile)) {
      if (grid && isOffsetCoords(playerTile) && isOffsetCoords(hoveredTile)) {
        aStar?.traverse(playerTile, hoveredTile);
      }
    }
  }, [hoveredTile, grid, playerTile, aStar]);

  // 3. Iterate over the grid to render each hex:
  return (
    <>
      {grid?.toArray().map((hex) => {
        const { x, y } = hexToPoint(hex);
        const { col, row } = hexToOffset(hex);

        const isDestinationTile = isTile(destinationTile, { col, row });
        const isHoveredTile = isTile(hoveredTile, { col, row });
        const isOriginTile = isTile(originTile, { col, row });
        const isPlayerTile = isTile(playerTile, { col, row });
        const isTerrainTile = hex.isTraversable === false;

        const [textureSeed, rotationSeed] = hex.randomSeeds;

        return (
          <HexTile
            hex={hex}
            key={`${col}-${row}`}
            position={[x, 0, y]}
            isDestinationTile={isDestinationTile}
            isHoveredTile={isHoveredTile}
            isOriginTile={isOriginTile}
            isPlayerTile={isPlayerTile}
            isTerrainTile={isTerrainTile}
            textureSeed={textureSeed}
            rotationSeed={rotationSeed}
            onPointerOver={(e) => {
              e.stopPropagation;
              setHoveredTile({ col, row });
            }}
            onPointerDown={(e) => {
              e.stopPropagation;
            }}
            onPointerUp={(e) => {
              e.stopPropagation;
              setDestinationTile(hoveredTile);
              setOriginTile(playerTile);
            }}
          />
        );
      })}
    </>
  );
};
