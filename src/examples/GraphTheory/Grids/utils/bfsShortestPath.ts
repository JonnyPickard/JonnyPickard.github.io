import type { Coordinates } from "../GridTypes";

interface BFSArgs {
  grid: number[][];
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
}

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

export function bfsShortestPath({
  grid,
  startCoordinates: { x: startX, y: startY },
  targetCoordinates: { x: targetX, y: targetY },
}: BFSArgs): number[][] | null {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue: [number, number][] = [[startX, startY]];
  const visited = new Set<string>();
  const parent: { [key: string]: string | null } = {}; // To reconstruct the path
  visited.add(`${startX},${startY}`);
  parent[`${startX},${startY}`] = null;

  function bfsRecursive() {
    if (queue.length === 0) return null;

    const [x, y] = queue.shift()!;

    // If we reached the target, reconstruct path
    if (x === targetX && y === targetY) {
      let path: number[][] = [];
      let current: string | null = `${x},${y}`;
      while (current !== null) {
        const [px, py] = current.split(",").map(Number);
        path.push([px, py]);
        current = parent[current];
      }
      return path.reverse(); // Reverse to get path from start to goal
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < cols &&
        newY >= 0 &&
        newY < rows &&
        grid[newY][newX] !== 1 &&
        !visited.has(`${newX},${newY}`)
      ) {
        queue.push([newX, newY]);
        visited.add(`${newX},${newY}`);
        parent[`${newX},${newY}`] = `${x},${y}`; // Store parent
      }
    }

    return bfsRecursive();
  }

  return bfsRecursive();
}
