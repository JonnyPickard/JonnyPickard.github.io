import { Grid, Hex, OffsetCoordinates, hexToOffset } from "honeycomb-grid";
import { isTile } from ".";

// Note: for full procedural generation you would need to run a graph search on the grid nodes
// and make sure there are no closed off areas that could trap players.

/**
 * generates a specified number of terrain tiles in a hexagonal grid.
 *
 * @param grid - The hexagonal grid to modify.
 * @param amount - The number of terrain tiles to generate in the grid.
 * @returns The modified hexagonal grid with the specified terrain tiles.
 */
export const generateTerrainTiles = (
  grid: Grid<Hex>,
  amount: number,
  playerTile: OffsetCoordinates,
) => {
  if (grid.size <= 0) {
    return [];
  }
  /**
   * Checks if the requested amount of terrain tiles exceeds the grid size.
   * Displays a warning and returns the original grid if the condition is true.
   */
  if (amount > grid.size) {
    console.warn(
      "[generateTerrainTiles]: You have attempted to generate more terrain tiles than the tiles that exist in the grid",
    );
    return [];
  }

  // generate to store unique indexes for selecting random tiles.
  const tileUniqueIndexes = new Set<number>();

  // Generate unique indexes until reaching the specified amount.
  while (tileUniqueIndexes.size !== amount) {
    tileUniqueIndexes.add(Math.floor(Math.random() * grid.size));
  }

  // Convert the grid to an array for easy manipulation.
  const gridAsArray = grid.toArray();

  // Array to store the selected terrain tiles.
  const terrainTiles: Hex[] = [];

  // Iterate through unique indexes, update tile properties, and add to terrainTiles array.
  tileUniqueIndexes.forEach((uniqueIndex) => {
    try {
      const tile = gridAsArray[uniqueIndex].clone();
      // Don't put untraversable tiles under the player start location
      if (isTile(hexToOffset(tile), playerTile)) {
        return;
      }
      tile.isTraversable = false;
      terrainTiles.push(tile);
    } catch (err) {
      console.error("[generateTerrainTiles]: apply terrain at index:", err);
    }
  });

  // Update the grid with the modified terrain tiles and return the result.
  return terrainTiles;
};
