/**
 * A* Pathfinding Algorithm for Hex Grids
 *
 * Simple implementation using array-based priority queue.
 * Optimized for POC - binary heap deferred until profiling shows need.
 *
 * Performance target: <100ms for any path within 128x128 chunk
 */

import type { ChunkSize } from "../../constants";
import type { CubeCoord, OffsetCoord } from "../../types";
import { cubeToOffset, getNeighbors, hexDistance, offsetToCube } from "./cubeCoords";

/**
 * A* pathfinding for hex grids
 *
 * @param from - Start position in offset coordinates
 * @param to - Goal position in offset coordinates
 * @param isBlocked - Function to check if a coordinate is blocked
 * @param chunkSize - Size of the chunk for bounds checking
 * @returns Path as array of offset coordinates, or null if no path found
 */
export function astar(
  from: OffsetCoord,
  to: OffsetCoord,
  isBlocked: (coord: OffsetCoord) => boolean,
  chunkSize: ChunkSize
): OffsetCoord[] | null {
  const start = offsetToCube(from);
  const goal = offsetToCube(to);

  // Simple priority queue using array sort
  // (Binary heap deferred - array sort fast enough for 128x128 grid)
  const openSet: Array<{ cube: CubeCoord; f: number }> = [{ cube: start, f: 0 }];

  const closedSet = new Set<string>();
  const cameFrom = new Map<string, CubeCoord>();
  const gScore = new Map<string, number>();

  // Create string key for cube coordinate (for Map/Set usage)
  const key = (c: CubeCoord): string => `${c.q},${c.r}`;

  gScore.set(key(start), 0);

  while (openSet.length > 0) {
    // Simple dequeue: sort by f-score and take first element
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!.cube;

    // Goal reached - reconstruct path
    if (current.q === goal.q && current.r === goal.r) {
      const path: OffsetCoord[] = [];
      let curr = current;

      // Walk backwards from goal to start
      while (cameFrom.has(key(curr))) {
        const offset = cubeToOffset(curr, chunkSize);
        if (offset) path.unshift(offset);
        curr = cameFrom.get(key(curr))!;
      }

      // Add start position
      path.unshift(from);
      return path;
    }

    closedSet.add(key(current));

    // Explore all neighbors
    for (const neighbor of getNeighbors(current)) {
      const offset = cubeToOffset(neighbor, chunkSize);

      // Skip if out of bounds or blocked
      if (!offset || isBlocked(offset)) continue;

      // Skip if already evaluated
      if (closedSet.has(key(neighbor))) continue;

      // Tentative g-score (cost from start to neighbor)
      const tentativeG = (gScore.get(key(current)) || 0) + 1;

      // Check if this path to neighbor is better than previous
      if (!gScore.has(key(neighbor)) || tentativeG < gScore.get(key(neighbor))!) {
        // Update best path to neighbor
        cameFrom.set(key(neighbor), current);
        gScore.set(key(neighbor), tentativeG);

        // f-score = g-score + heuristic (distance to goal)
        const f = tentativeG + hexDistance(neighbor, goal);

        // Add to open set if not already present
        if (!openSet.find((n) => n.cube.q === neighbor.q && n.cube.r === neighbor.r)) {
          openSet.push({ cube: neighbor, f });
        }
      }
    }
  }

  // No path found
  return null;
}
