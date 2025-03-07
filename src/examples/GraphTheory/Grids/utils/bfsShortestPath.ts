import type { Coordinates, GridMatrix } from "../GridTypes";

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
  grid: GridMatrix;
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
  setGridVisualisationMatrix?: React.Dispatch<
    React.SetStateAction<GridMatrix | null>
  >;
  stepInterval?: number;
}

export function bfsShortestPath({
  grid,
  startCoordinates,
  targetCoordinates,
  setGridVisualisationMatrix,
  stepInterval = 200,
}: bfsShortestPathArgs): Promise<Coordinates[] | null> {
  if (stepInterval < 0 || stepInterval > 1000) {
    throw new Error("stepInterval must be between 0 and 1000");
  }

  return new Promise((resolve) => {
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

    if (startX === targetX && startY === targetY) {
      resolve([{ x: startX, y: startY }]);
      return;
    }

    const queue: Coordinates[] = [{ x: startX, y: startY }];
    const visited = new Set<string>([`${startX},${startY}`]);
    const parent: Record<string, Coordinates | null> = {};
    parent[`${startX},${startY}`] = null;

    function step() {
      if (queue.length === 0) {
        resolve(null);
        return;
      }

      const { x, y } = queue.shift()!; // Dequeue the first element

      if (x === targetX && y === targetY) {
        const path: Coordinates[] = [];
        let current: Coordinates | null = { x, y };
        while (current !== null) {
          path.push(current);
          current = parent[`${current.x},${current.y}`];
        }

        resolve(path.reverse());
        return;
      }

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newY >= 0 &&
          newY < rows && // Ensure within row bounds
          newX >= 0 &&
          newX < cols && // Ensure within col bounds
          grid[newY][newX] !== 1 && // Not a wall
          !visited.has(`${newX},${newY}`) // Not visited
        ) {
          queue.push({ x: newX, y: newY });
          visited.add(`${newX},${newY}`);
          parent[`${newX},${newY}`] = { x, y };
        }
      }

      if (setGridVisualisationMatrix) {
        setGridVisualisationMatrix(
          gridToUI(grid, visited, queue, { x: targetX, y: targetY }),
        );
      }

      setTimeout(step, stepInterval);
    }

    step();
  });
}

function gridToUI(
  grid: GridMatrix,
  visited: Set<string>,
  queue: Coordinates[],
  target: Coordinates,
): GridMatrix {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      if (r === target.y && c === target.x) return 3; // 🎯 Target
      if (queue.some(({ x, y }) => y === r && x === c)) return 5; // 📌 Queue (current frontier) - processing
      if (visited.has(`${c},${r}`)) return 6; // visited/ processed
      return cell;
    }),
  );
}
