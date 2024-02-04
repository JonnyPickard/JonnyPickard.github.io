import { Grid, Hex, OffsetCoordinates, ring } from "honeycomb-grid";
import { aStar } from "abstract-astar";

interface AStarOptions {
  grid: Grid<Hex>;
  originCoords: OffsetCoordinates;
  destinationCoords: OffsetCoordinates;
}

export const AStar = ({
  grid,
  originCoords,
  destinationCoords,
}: AStarOptions) => {
  const start = grid.getHex(originCoords)!;
  const goal = grid.getHex(destinationCoords)!;

  const shortestPath = aStar<Hex>({
    start,
    goal,
    estimateFromNodeToGoal: (tile) => grid.distance(tile, goal),
    neighborsAdjacentToNode: (center) =>
      grid.traverse(ring({ radius: 1, center })).toArray(),
    actualCostToMove: (_, __, tile) => tile.cost,
  });

  grid
    .traverse(shortestPath ?? [])
    .filter(
      (tile) => !tile.equals(originCoords) && !tile.equals(destinationCoords),
    )
    .forEach((tile) => {
      tile.isInPath = true;
    });
};
