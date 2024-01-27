import { Grid, Hex, OffsetCoordinates, hexToOffset } from "honeycomb-grid";
import { isTile, getRandomItemIndex } from "./utils";

// TODO: getRandomItemIndex

// Note: for full procedural generation you would need to run a graph search on the grid nodes
// and make sure there are no closed off areas that could trap players.

/**
 * Sets a specified number of terrain tiles in a hexagonal grid.
 *
 * @param grid - The hexagonal grid to modify.
 * @param amount - The number of terrain tiles to set in the grid.
 * @returns The modified hexagonal grid with the specified terrain tiles.
 */
export const setTerrainTiles = (
  grid: Grid<Hex>,
  amount: number,
  playerTile: OffsetCoordinates,
): Grid<Hex> => {
  /**
   * Checks if the requested amount of terrain tiles exceeds the grid size.
   * Displays a warning and returns the original grid if the condition is true.
   */
  if (amount > grid.size) {
    console.warn(
      "[setTerrainTiles]: You have attempted to set more terrain tiles than the tiles that exist in the grid",
    );
    return grid;
  }

  // Set to store unique indexes for selecting random tiles.
  const tileUniqueIndexes = new Set<number>();

  // Generate unique indexes until reaching the specified amount.
  while (tileUniqueIndexes.size !== amount) {
    tileUniqueIndexes.add(Math.floor(Math.random() * grid.size) + 1);
  }

  // Convert the grid to an array for easy manipulation.
  const gridAsArray = grid.toArray();

  // Array to store the selected terrain tiles.
  const terrainTiles: Hex[] = [];

  // Iterate through unique indexes, update tile properties, and add to terrainTiles array.
  tileUniqueIndexes.forEach((uniqueIndex) => {
    const tile = gridAsArray[uniqueIndex];
    // Don't put untraversable tiles under the player start location
    if (isTile(hexToOffset(tile), playerTile)) {
      return;
    }
    tile.isTraversable = false;
    terrainTiles.push(tile);
  });

  // Update the grid with the modified terrain tiles and return the result.
  return grid.setHexes(terrainTiles);
};
