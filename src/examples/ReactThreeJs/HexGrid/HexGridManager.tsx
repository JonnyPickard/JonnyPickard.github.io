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
  DEFAULT_PLAYER_TILE,
  GRID_WIDTH,
  GRID_HEIGHT,
  HEX_ORIGIN,
  TERRAIN_TILES_AMOUNT,
  TILE_MESH_DIMENSIONS,
} from "./constants";
import { AStar } from "./algorithms/AStar";
import { useInterval } from "usehooks-ts";

import type { NullableOffsetCoordinates } from "./types";

import { usePlayerStore } from "./store";

const nullCoordinateState = () => ({
  col: null,
  row: null,
});

export const HexGridManager = () => {
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);
  const setPlayerRotation = usePlayerStore((state) => state.setPlayerRotation);
  /* 
    Class used to manage path traversal
  */
  const [aStar, setAStar] = useState<AStar>();

  const [activePath, setActivePath] = useState<Hex[]>([]);

  /* 
    Tile that the Player is hovering over 
    Will be used to calculate path traversal
  */
  const [hoveredTile, setHoveredTile] = useState<NullableOffsetCoordinates>(
    nullCoordinateState(),
  );
  /* 
    When a destination tile is set for traversal
    Origin tile set as the starting point 
  */
  const [originTile, setOriginTile] = useState<NullableOffsetCoordinates>(
    nullCoordinateState(),
  );
  /* Tile that the player clicks to move to */
  const [destinationTile, setDestinationTile] =
    useState<NullableOffsetCoordinates>(nullCoordinateState());
  /* If it's possible to navigate to tile set this */
  const [activeDestinationTile, setActiveDestinationTile] =
    useState<NullableOffsetCoordinates>(nullCoordinateState());

  /* Defaulting to a reletively central point to begin with*/
  const [playerTile, setPlayerTile] =
    useState<OffsetCoordinates>(DEFAULT_PLAYER_TILE);

  const [grid, setGrid] = useState<Grid<Hex>>();

  // Only run on first render to prevent expensive grid recalculations
  useEffect(() => {
    // 1. Create a hex class:
    const Hex = defineCustomHex({
      dimensions: TILE_MESH_DIMENSIONS,
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

  // TODO: Mapping a Path based on hover?
  //
  // const [hoverPath, setHoverPath] = useState<Hex[]>([]);
  // useEffect(() => {
  //   if (grid && isOffsetCoords(hoveredTile)) {
  //     if (grid && isOffsetCoords(playerTile) && isOffsetCoords(hoveredTile)) {
  //       const shortestPath = aStar?.traverse(playerTile, hoveredTile);
  //       if (shortestPath) {
  //         setHoverPath(shortestPath);
  //       }
  //     }
  //   }
  // }, [hoveredTile, grid, playerTile, aStar]);

  // Set path based on a destination tile getting set
  useEffect(() => {
    if (grid && isOffsetCoords(playerTile) && isOffsetCoords(destinationTile)) {
      const shortestPath = aStar?.traverse(playerTile, destinationTile);
      if (shortestPath) {
        setActivePath(shortestPath);
        setActiveDestinationTile(destinationTile);
        setOriginTile(playerTile);

        // Reset destination tile
        setDestinationTile(nullCoordinateState());
      }
    }
  }, [grid, aStar, playerTile, destinationTile]);

  // Player animation
  useEffect(() => {
    if (activePath.length >= 1) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [activePath, setIsRunning]);

  // Player rotation
  useEffect(() => {
    const currentTile = grid?.getHex(playerTile);

    if (currentTile && activePath.length) {
      const nextTile = activePath[0];

      setPlayerRotation({
        fromHex: currentTile,
        toHex: nextTile,
      });
    }
  }, [activePath, grid, setPlayerRotation, playerTile]);

  // Reset Path Highlighting After Reaching Destination
  useEffect(() => {
    if (!activePath.length) {
      aStar?.resetPreviousPath();
      setActiveDestinationTile(nullCoordinateState());
    }
  }, [activePath, aStar]);

  // Game Tick
  useInterval(
    () => {
      const nextTile = activePath[0];
      const shortenedPath = activePath.slice(1);

      setPlayerTile(nextTile);
      setActivePath(shortenedPath);
    },
    // Delay in milliseconds or null to stop it
    activePath.length ? 600 : null,
  );

  // 3. Iterate over the grid to render each hex:
  return grid?.toArray().map((hex) => {
    const { x, y } = hexToPoint(hex);
    const { col, row } = hexToOffset(hex);

    const isDestinationTile = isTile(destinationTile, { col, row });
    const isActiveDestinationTile = isTile(activeDestinationTile, {
      col,
      row,
    });
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
        isActiveDestinationTile={isActiveDestinationTile}
        isHoveredTile={isHoveredTile}
        isOriginTile={isOriginTile}
        isPlayerTile={isPlayerTile}
        isTerrainTile={isTerrainTile}
        textureSeed={textureSeed}
        rotationSeed={rotationSeed}
        showCoordinatesAs="AXIAL"
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
  });
};
