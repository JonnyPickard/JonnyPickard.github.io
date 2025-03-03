/**
 * NOTE: this was originally implementation and have left it as it's useful
 * I decided to switch to a generator function to have more control over ui color updates for each step
 */
const KEY = {
  0: "traversable",
  1: "wall",
  2: "player",
};

// Replace the testMatrix with the generated one
// const testMatrix = generateTestMatrix(ROWS, COLUMNS);

// x ➡️ - depth[][]
//
// columns: left, right

// `x,y`;
type Coordinate = number;
type CoordinatesString = `${Coordinate},${Coordinate}`;

type Graph = { [node_key: string]: CoordinatesString[] };

/**
 * Turns a matrix grid into an adjacency list
 */
export const gridToGraph = async (matrix: number[][]) => {
  const rows = matrix.length;
  // Assume rectangular for now
  const columns = matrix[0].length;

  const graph: Graph = {};

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  // Loop vert for rows
  for (let y = 0; y < rows; y++) {
    // Loop across for columns
    for (let x = 0; x < columns; x++) {
      // check for walls - no node connection
      // skip if cant connect
      if (matrix[y][x] === 1) continue;

      // else can connect so add to graph
      // create coordinate based key for node
      // with empty array for future connected nodes
      const nodeKey = `${x},${y}`;
      graph[nodeKey] = [];

      // Find connected nodes
      // Loop in each direction checking for walls
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // out of bounds check
        if (newX >= 0 && newX < columns && newY >= 0 && newY < rows) {
          // walls check
          if (matrix[newY][newX] !== 1) {
            // node can connect so push to array
            graph[nodeKey].push(`${newX},${newY}`);
          }
        }
      }
    }
  }
  return graph;
};
