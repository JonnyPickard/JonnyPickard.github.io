import {
  Grid,
  Hex,
  OffsetCoordinates,
  ring,
  hexToPoint,
  Point,
} from "honeycomb-grid";
import { aStar } from "abstract-astar";
import { LRUCache } from "lru-cache";
import { IMPASSABLE_COST } from "../../constants";

export class AStar {
  grid: Grid<Hex>;
  shortestPathCache = new LRUCache<
    [OffsetCoordinates, OffsetCoordinates],
    Hex[]
  >({ max: 250 });
  neighborsCache = new LRUCache<Point, Hex[]>({ max: 250 });
  previousShortestPath?: Hex[];

  constructor(grid: Grid<Hex>) {
    this.grid = grid;
  }

  getNeighbors = (center: Hex) => {
    const cacheKey = hexToPoint(center);
    const cachedNeighbors = this.neighborsCache.get(cacheKey);
    if (cachedNeighbors) {
      return cachedNeighbors;
    }

    const neighbors = this.grid.traverse(ring({ radius: 1, center })).toArray();
    this.neighborsCache.set(cacheKey, neighbors);
    return neighbors;
  };

  getShortestPath = (
    originCoords: OffsetCoordinates,
    destinationCoords: OffsetCoordinates,
  ) => {
    const cachedPath = this.shortestPathCache.get([
      originCoords,
      destinationCoords,
    ]);

    if (cachedPath) {
      return cachedPath;
    }

    const start = this.grid.getHex(originCoords)!;
    const goal = this.grid.getHex(destinationCoords)!;

    const shortestPath = aStar<Hex>({
      start,
      goal,
      estimateFromNodeToGoal: (tile) => this.grid.distance(tile, goal),
      neighborsAdjacentToNode: (center) => this.getNeighbors(center),
      // This doesn't really matter as it's either terrain or traversable
      actualCostToMove: (_, _fromTile, toTile) =>
        toTile.isTraversable ? 0 : IMPASSABLE_COST /* Infinity */,
    });

    this.shortestPathCache.set([originCoords, destinationCoords], shortestPath);
    return shortestPath;
  };

  traverse = (
    originCoords: OffsetCoordinates,
    destinationCoords: OffsetCoordinates,
  ) => {
    const shortestPath = this.getShortestPath(
      originCoords,
      destinationCoords,
    )?.filter((tile) => !tile.equals(originCoords));

    // Reset previous path
    (this.previousShortestPath ?? []).forEach((tile) => {
      tile.isInPath = false;
    });
    this.previousShortestPath = shortestPath;

    this.grid.traverse(shortestPath ?? []).forEach((tile) => {
      tile.isInPath = true;
    });

    return shortestPath;
  };
}
