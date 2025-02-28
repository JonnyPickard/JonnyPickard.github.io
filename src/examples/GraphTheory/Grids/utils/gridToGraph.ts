/**
 * NOTE: this was originally implementation and have left it as it's useful
 * I decided to switch to a generator function to have more control over ui color updates for each step
 */
const COLUMNS = 10;
const ROWS = 10;

const KEY = {
  0: "traversable",
  1: "wall",
  2: "player",
};

export const generateTestMatrix = (
  rows: number = ROWS,
  columns: number = COLUMNS,
): number[][] => {
  const matrix = Array.from({ length: rows }, () => Array(columns).fill(0));

  // Place walls randomly
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (Math.random() < 0.2) {
        // 20% chance to be a wall
        matrix[y][x] = 1;
      }
    }
  }

  // Place player randomly
  let playerPlaced = false;
  while (!playerPlaced) {
    const playerX = Math.floor(Math.random() * columns);
    const playerY = Math.floor(Math.random() * rows);
    if (matrix[playerY][playerX] === 0) {
      matrix[playerY][playerX] = 2;
      playerPlaced = true;
    }
  }

  return matrix;
};

// Replace the testMatrix with the generated one
// const testMatrix = generateTestMatrix(ROWS, COLUMNS);

// x ➡️ - depth[][]
//
// columns: left, right

// `x,y`;
type Coordinate = number;
type CoordinatesString = `${Coordinate},${Coordinate}`;

export type Graph = { [node_key: string]: CoordinatesString[] };

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
        const newX = x + dx,
          newY = y + dy;

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
