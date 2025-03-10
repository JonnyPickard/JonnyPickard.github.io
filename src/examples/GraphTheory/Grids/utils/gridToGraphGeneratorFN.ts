import type { GridMatrix } from "../GridTypes";
import {
  FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
  FIND_NEIGHBOURS_FAILURE_COLOR,
  FIND_NEIGHBOURS_SUCCESS_COLOR,
  PROCESSING_TILE_COLOR,
} from "../constants";

type Direction = "R" | "D" | "L" | "U";

export type Graph = {
  [node_key: string]: {
    x: number;
    y: number;
    direction: Direction;
  }[];
};

// Makes an adjacency list graph representation
// Uneccessary for 2D Map grids as its extra looping to making the list first
// For 2D Map pathfinding you should do BFS etc as you work out neighbours
export function* gridToGraphGenerator(matrix: GridMatrix): Generator<
  {
    tileOverrides: {
      currentAlgTile: { x: number; y: number; color: string };
      currentNeighboursTile: { x: number; y: number; color: string };
    };
    graphStep: Graph;
  },
  Graph,
  void
> {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const graph: Graph = {};

  const directions: [number, number, Direction][] = [
    [0, 1, "R"], // right
    [1, 0, "D"], // down
    [0, -1, "L"], // left
    [-1, 0, "U"], // up
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (matrix[y][x] === 1) continue;

      // Step 1: Highlight current tile
      yield {
        tileOverrides: {
          currentAlgTile: { x, y, color: PROCESSING_TILE_COLOR },
          currentNeighboursTile: { x: -1, y: -1, color: "" }, // Reset
        },
        graphStep: structuredClone(graph),
      };

      const nodeKey = `${x},${y}`;
      graph[nodeKey] = [];

      for (const [dx, dy, direction] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < columns && newY >= 0 && newY < rows) {
          // Step 2: Highlight neighbour check
          yield {
            tileOverrides: {
              currentAlgTile: { x, y, color: PROCESSING_TILE_COLOR },
              currentNeighboursTile: {
                x: newX,
                y: newY,
                color: FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
              },
            },
            graphStep: structuredClone(graph),
          };

          if (matrix[newY][newX] !== 1) {
            // Step 3: Neighbour success
            graph[nodeKey].push({ x: newX, y: newY, direction });

            yield {
              tileOverrides: {
                currentAlgTile: { x, y, color: PROCESSING_TILE_COLOR },
                currentNeighboursTile: {
                  x: newX,
                  y: newY,
                  color: FIND_NEIGHBOURS_SUCCESS_COLOR,
                },
              },
              graphStep: structuredClone(graph),
            };
          } else {
            // Step 4: Neighbour failure
            yield {
              tileOverrides: {
                currentAlgTile: { x, y, color: PROCESSING_TILE_COLOR },
                currentNeighboursTile: {
                  x: newX,
                  y: newY,
                  color: FIND_NEIGHBOURS_FAILURE_COLOR,
                },
              },
              graphStep: structuredClone(graph),
            };
          }
        }
      }

      // Step 5: Graph update after all neighbours are checked
      yield {
        tileOverrides: {
          currentAlgTile: { x, y, color: PROCESSING_TILE_COLOR },
          currentNeighboursTile: { x: -1, y: -1, color: "" }, // Reset
        },
        graphStep: structuredClone(graph),
      };
    }
  }

  return graph;
}

interface GraphGenerationOptions {
  matrix: GridMatrix;
  setTileColorOverrides: React.Dispatch<
    React.SetStateAction<{
      currentAlgTile: { x: number; y: number; color: string };
      currentNeighboursTile: { x: number; y: number; color: string };
    }>
  >;
  setGraph: (graph: Graph) => void;
  /* 0 - 1000 higher being slower */
  stepInterval?: number;
  signal?: AbortSignal;
}

export const runGraphGeneration = async ({
  matrix,
  setTileColorOverrides,
  setGraph,
  stepInterval = 200,
  signal,
}: GraphGenerationOptions) => {
  if (stepInterval < 0 || stepInterval > 1000) {
    throw new Error("stepInterval must be between 0 and 1000");
  }

  const generator = gridToGraphGenerator(matrix);
  let result = generator.next();

  while (!result.done) {
    if (signal?.aborted) return;

    const { tileOverrides, graphStep } = result.value;

    // Update UI
    setTileColorOverrides(tileOverrides);
    setGraph(graphStep);

    // Delay visualization
    await new Promise((resolve) => setTimeout(resolve, stepInterval));

    // Move to next step
    result = generator.next();
  }

  // Final graph update
  setGraph(result.value);
};

interface SimpleGraphGenerationOptions {
  matrix: GridMatrix;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
}

// Generate graph with:
// - no tile recoloring
// - no delay?
export const runSimpleGraphGeneration = async ({
  matrix,
  setGraph,
}: SimpleGraphGenerationOptions) => {
  const generator = gridToGraphGenerator(matrix);
  let result = generator.next();

  while (!result.done) {
    // Move to next step
    result = generator.next();
  }

  // Final graph update
  setGraph(result.value);
};
