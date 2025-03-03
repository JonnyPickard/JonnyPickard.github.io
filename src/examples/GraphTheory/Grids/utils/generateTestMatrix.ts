const COLUMNS = 10;
const ROWS = 10;

interface TestMatrixOptions {
  rows?: number;
  columns?: number;
  placePlayer?: boolean;
  placeDestinationTile?: boolean;
}

export const generateTestMatrix = ({
  rows = ROWS,
  columns = COLUMNS,
  placePlayer = true,
  placeDestinationTile = false,
}: TestMatrixOptions = {}): number[][] => {
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

  if (placePlayer) {
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
  }

  if (placeDestinationTile) {
    // Place destinationtile randomly
    let destinationtilePlaced = false;
    while (!destinationtilePlaced) {
      const destinationtileX = Math.floor(Math.random() * columns);
      const destinationtileY = Math.floor(Math.random() * rows);
      if (matrix[destinationtileY][destinationtileX] === 0) {
        matrix[destinationtileY][destinationtileX] = 3;
        destinationtilePlaced = true;
      }
    }
  }

  return matrix;
};
