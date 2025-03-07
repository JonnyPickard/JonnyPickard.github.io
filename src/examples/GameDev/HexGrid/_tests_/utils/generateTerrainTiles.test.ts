import {
  createHexOrigin,
  Grid,
  hexToOffset,
  OffsetCoordinates,
  Orientation,
  rectangle,
} from "honeycomb-grid";
import { defineCustomHex } from "../../CustomHex";
import { generateTerrainTiles, isTile } from "../../utils";

describe("generateTerrainTiles", () => {
  // NOTE: If I do more rigourous testing. Might be worth extracting these into testing utils.
  const hex = defineCustomHex({
    dimensions: 1,
    origin: createHexOrigin("topLeft", {
      width: 1,
      height: 1,
    }),
    orientation: Orientation.POINTY,
  });

  const buildTestGrid = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) =>
    new Grid(
      hex,
      rectangle({
        width,
        height,
      }),
    );

  // Define a sample grid for testing
  const grid = buildTestGrid({ width: 5, height: 5 });

  // Define a sample player tile for testing
  const playerTile: OffsetCoordinates = { col: 0, row: 0 };

  it("should return an empty array if grid size is zero", () => {
    const result = generateTerrainTiles(
      buildTestGrid({ width: 0, height: 0 }),
      5,
      playerTile,
    );
    expect(result).toEqual([]);
  });

  it("should return an empty array if amount is greater than grid size", () => {
    console.warn = vi.fn();
    const result = generateTerrainTiles(grid, 30, playerTile);
    expect(result).toEqual([]);
  });

  it("should generate terrain tiles within the grid", () => {
    const result = generateTerrainTiles(grid, 5, playerTile);
    // In certain situations the terrain is randomly assigned to the players tile
    // Because player can't walk on terrain we don't place this so there is -1 terrain
    expect(result.length).toBeGreaterThanOrEqual(4);
    result.forEach((tile) => {
      expect(grid.getHex(tile)).not.toBeUndefined();
    });
  });

  it("should mark generated terrain tiles as untraversable", () => {
    const result = generateTerrainTiles(grid, 5, playerTile);
    result.forEach((tile) => {
      expect(tile.isTraversable).toBe(false);
    });
  });

  it("should not generate terrain tiles under the player start location", () => {
    const result = generateTerrainTiles(grid, 5, playerTile);
    result.forEach((tile) => {
      expect(isTile(hexToOffset(tile), playerTile)).toBe(false);
    });
  });
});
