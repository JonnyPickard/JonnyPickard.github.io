import { Grid, Hex, OffsetCoordinates, ring } from "honeycomb-grid";
import { aStar } from "abstract-astar";

interface AStarOptions {
  grid: Grid<Hex>;
  originCoords: OffsetCoordinates;
  destinationCoords: OffsetCoordinates;
}

const neighborsMap = new Map<string, Hex[]>();

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
    neighborsAdjacentToNode: (center) => {
      const cacheKey = `${center.q}-${center.r}`;
      const cachedNeighbors = neighborsMap.get(cacheKey);
      if (cachedNeighbors) {
        return cachedNeighbors;
      }

      const neighbors = grid.traverse(ring({ radius: 1, center })).toArray();
      neighborsMap.set(cacheKey, neighbors);
      return neighbors;
    },
    actualCostToMove: (_, __, tile) => tile.cost,
  });

  grid.forEach((hex) => {
    hex.isInPath = false;
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
