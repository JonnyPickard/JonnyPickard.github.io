import type { Coordinates } from "../GridTypes";

// 1. Queue starts with tile your on (start node)
// 2. pop start node off of queue
// 3. check for neighbours from said node
// 4. if neighbour isn't in visited nodes:
// - add to visited nodes
// - add to parents object
// {
//    [neighbour_node_coords: x, y]: [node you came from coords: x, y]
// }
// 5. if tile you moved to has the parent coords you have found it (x === targetX && y === targetY)
// 6. Once found you walk backwards to construct the path
// 7. loop starting from targetX, targetY pushing nodes to path array[]
// 8. push targetX target y
// 9. next loop iteration pass in parent[targetx, targety] = parent node
// 10. repeat untill no more parent nodes
// 11. return path array but reversed because walk backwards from the target
interface bfsShortestPathArgs {
  grid: number[][];
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
}

export function bfsShortestPath({
  grid,
  startCoordinates,
  targetCoordinates,
}: bfsShortestPathArgs): Coordinates[] | null {
  if (!grid.length) return null;

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const { x: startX, y: startY } = startCoordinates;
  const { x: targetX, y: targetY } = targetCoordinates;

  // 🛑 Edge Case: If start == target, return immediately
  if (startX === targetX && startY === targetY) {
    return [{ x: startX, y: startY }];
  }

  const queue: Coordinates[] = [{ x: startX, y: startY }];
  const visited = new Set<string>([`${startX},${startY}`]);
  const parent: Record<string, Coordinates | null> = {};
  parent[`${startX},${startY}`] = null;

  while (queue.length > 0) {
    const { x, y } = queue.shift()!; // Safe to use `!` because queue is not empty

    // If we reached the target, reconstruct the path
    if (x === targetX && y === targetY) {
      const path: Coordinates[] = [];
      let current: Coordinates | null = { x, y };
      while (current !== null) {
        path.push(current);
        current = parent[`${current.x},${current.y}`]; // Move backwards
      }
      return path.reverse(); // Reverse to get the path from start to goal
    }

    // Explore all valid directions
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < cols &&
        newY >= 0 &&
        newY < rows &&
        grid[newY][newX] !== 1 && // Ensure it's walkable
        !visited.has(`${newX},${newY}`)
      ) {
        queue.push({ x: newX, y: newY });
        visited.add(`${newX},${newY}`);
        parent[`${newX},${newY}`] = { x, y }; // Store parent to reconstruct path
      }
    }
  }

  return null; // No path found
}
