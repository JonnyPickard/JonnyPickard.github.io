import type { Coordinates, GridMatrix } from "../GridTypes";

// 0 = walkable
// 1 = wall
// 3 = target
// 4 = path
// 5 = processing
// 6 = visited
interface DfsPathArgs {
  grid: GridMatrix;
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
  setGridVisualisationMatrix?: React.Dispatch<
    React.SetStateAction<GridMatrix | null>
  >;

  // default: false
  logToConsole?: boolean;
  /* 
    0 - 1000 higher being slower
    default: 200
  */
  stepInterval?: number;
}

export function dfsPath({
  grid,
  startCoordinates,
  targetCoordinates,
  setGridVisualisationMatrix,
  logToConsole = false,
  stepInterval = 200,
}: DfsPathArgs): Promise<Coordinates[] | null> {
  if (stepInterval < 0 || stepInterval > 1000) {
    throw new Error("stepInterval must be between 0 and 1000");
  }

  return new Promise((resolve) => {
    const { x: sc, y: sr } = startCoordinates;
    const { x: tc, y: tr } = targetCoordinates;

    const rows = grid.length;
    const cols = grid[0].length;
    const stack: [number, number, Coordinates[]][] = [
      [sr, sc, [{ x: sc, y: sr }]],
    ];
    const visited: Set<string> = new Set();
    visited.add(`${sr},${sc}`);

    const directions: [number, number][] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]; // Down, Up, Right, Left

    function step() {
      if (stack.length === 0) {
        if (logToConsole) {
          console.log("❌ Target not found!");
        }
        resolve(null);
        return;
      }

      const node = stack.pop();
      if (!node) return;
      const [r, c, path] = node;

      const displayGrid = gridToUI(grid, visited, path, { x: tc, y: tr });
      if (logToConsole) {
        console.table(displayGrid);
      }

      if (setGridVisualisationMatrix) {
        setGridVisualisationMatrix(() => {
          return displayGrid;
        });
      }

      // Update grid visualization
      if (r === tr && c === tc) {
        if (logToConsole) {
          console.log("🎉 Found the target! Path:", path);
        }

        resolve(path);
        return;
      }

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          !visited.has(`${nr},${nc}`) &&
          grid[nr][nc] !== 1
        ) {
          visited.add(`${nr},${nc}`);
          stack.push([nr, nc, [...path, { x: nc, y: nr }]]); // Track path
        }
      }
      // 🔥 Delay for animation
      setTimeout(step, stepInterval);
    }

    step(); // Start the visualization
  });
}

function gridToUI(
  grid: GridMatrix,
  visited: Set<string>,
  path: Coordinates[],
  target: Coordinates,
): GridMatrix {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      if (r === target.y && c === target.x) return 3; // Target
      if (path.some(({ x, y }) => y === r && x === c)) return 5; // Processing
      if (visited.has(`${r},${c}`)) return 6; // Visited cells
      return cell; // Original value
    }),
  );
}
