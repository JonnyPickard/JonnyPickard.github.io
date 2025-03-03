// NOTE: ThreeJs uses the Y axis as up unlike blender which uses Z
// https://www.redblobgames.com/grids/hexagons/#coordinates-offset
import {
  Grid,
  Hex,
  OffsetCoordinates,
  Orientation,
  hexToOffset,
  hexToPoint,
  isOffset as isOffsetCoords,
  rectangle,
} from "honeycomb-grid";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { defineCustomHex } from ".";
import { AStar } from "./algorithms/AStar";
import {
  DEFAULT_PLAYER_TILE,
  GRID_HEIGHT,
  GRID_WIDTH,
  HEX_ORIGIN,
  TERRAIN_TILES_AMOUNT,
  TILE_MESH_DIMENSIONS,
} from "./constants";
import { HexTile } from "./Models";
import { generateTerrainTiles, isTile } from "./utils";

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
    When a target tile is set for traversal
    Origin tile set as the starting point 
  */
  const [originTile, setOriginTile] = useState<NullableOffsetCoordinates>(
    nullCoordinateState(),
  );
  /* Tile that the player clicks to move to */
  const [targetTile, setTargetTile] = useState<NullableOffsetCoordinates>(
    nullCoordinateState(),
  );
  /* If it's possible to navigate to tile set this */
  const [activeTargetTile, setActiveTargetTile] =
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

  // Set path based on a target tile getting set & pathing possible.
  useEffect(() => {
    if (grid && isOffsetCoords(playerTile) && isOffsetCoords(targetTile)) {
      const shortestPath = aStar?.traverse(playerTile, targetTile);
      if (shortestPath) {
        setActivePath(shortestPath);
        setActiveTargetTile(targetTile);
        setOriginTile(playerTile);

        // Reset target tile
        setTargetTile(nullCoordinateState());
      }
    }
  }, [grid, aStar, playerTile, targetTile]);

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

  // Reset Path Highlighting After Reaching Target
  useEffect(() => {
    if (!activePath.length) {
      aStar?.resetPreviousPath();
      setActiveTargetTile(nullCoordinateState());
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

    const isTargetTile = isTile(targetTile, { col, row });
    const isActiveTargetTile = isTile(activeTargetTile, {
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
        isTargetTile={isTargetTile}
        isActiveTargetTile={isActiveTargetTile}
        isHoveredTile={isHoveredTile}
        isOriginTile={isOriginTile}
        isPlayerTile={isPlayerTile}
        isTerrainTile={isTerrainTile}
        textureSeed={textureSeed}
        rotationSeed={rotationSeed}
        showCoordinatesAs="AXIAL"
        onClick={(e) => {
          e.stopPropagation;
          setTargetTile(
            // NOTE: works better using hovered tile to indicate
            // However, mobile users can't hover.
            isOffsetCoords(hoveredTile) ? hoveredTile : { col, row },
          );
          setOriginTile(playerTile);
        }}
        onPointerOver={(e) => {
          e.stopPropagation;
          setHoveredTile({ col, row });
        }}
      />
    );
  });
};
