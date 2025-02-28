const ALGORITH_CURRENT_TILE_COLOR = "fill-sky-600";
const FIND_NEIGHBOURS_CURRENT_TILE_COLOR = "fill-sky-400";
const FIND_NEIGHBOURS_SUCCESS_COLOR = "fill-lime-500";
const FIND_NEIGHBOURS_FAILURE_COLOR = "fill-rose-800";

type Coordinate = number;
type CoordinatesString = `${Coordinate},${Coordinate}`;

type Graph = { [node_key: string]: CoordinatesString[] };

export function* gridToGraphGenerator(matrix: number[][]): Generator<
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

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (matrix[y][x] === 1) continue;

      // Step 1: Highlight current tile
      yield {
        tileOverrides: {
          currentAlgTile: { x, y, color: ALGORITH_CURRENT_TILE_COLOR },
          currentNeighboursTile: { x: -1, y: -1, color: "" }, // Reset
        },
        graphStep: structuredClone(graph),
      };

      const nodeKey = `${x},${y}`;
      graph[nodeKey] = [];

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < columns && newY >= 0 && newY < rows) {
          // Step 2: Highlight neighbour check
          yield {
            tileOverrides: {
              currentAlgTile: { x, y, color: ALGORITH_CURRENT_TILE_COLOR },
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
            graph[nodeKey].push(`${newX},${newY}`);
            yield {
              tileOverrides: {
                currentAlgTile: { x, y, color: ALGORITH_CURRENT_TILE_COLOR },
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
                currentAlgTile: { x, y, color: ALGORITH_CURRENT_TILE_COLOR },
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
          currentAlgTile: { x, y, color: ALGORITH_CURRENT_TILE_COLOR },
          currentNeighboursTile: { x: -1, y: -1, color: "" }, // Reset
        },
        graphStep: structuredClone(graph),
      };
    }
  }

  return graph;
}

interface GraphGenerationOptions {
  matrix: number[][];
  setTileColorOverrides: React.Dispatch<
    React.SetStateAction<{
      currentAlgTile: { x: number; y: number; color: string };
      currentNeighboursTile: { x: number; y: number; color: string };
    }>
  >;
  setGraphStep: React.Dispatch<React.SetStateAction<Graph>>;
  /* 0 - 1000 higher being slower */
  tickSpeed?: number;
}

export const runGraphGeneration = async ({
  matrix,
  setTileColorOverrides,
  setGraphStep,
  tickSpeed = 200,
}: GraphGenerationOptions) => {
  if (tickSpeed < 0 || tickSpeed > 1000) {
    throw new Error("tickSpeed must be between 0 and 1000");
  }

  const generator = gridToGraphGenerator(matrix);
  let result = generator.next();

  while (!result.done) {
    const { tileOverrides, graphStep } = result.value;

    // Update UI
    setTileColorOverrides(tileOverrides);
    setGraphStep(graphStep);

    // Delay visualization
    await new Promise((resolve) => setTimeout(resolve, tickSpeed));

    // Move to next step
    result = generator.next();
  }

  // Final graph update
  setGraphStep(result.value);
};
