import clone from "rfdc";

type GridMatrix = number[][];

export const generateGrid = (
  rows: number,
  cols: number,
  terrainTiles: number = 0,
) => {
  if (terrainTiles > (rows * cols) / 2) {
    throw new Error("Please use less terrain tiles to make the map pathable");
  }

  const gridMatrix: GridMatrix = [];

  for (let x = 0; x < rows; x++) {
    gridMatrix[x] = [];
    for (let y = 0; y < cols; y++) {
      gridMatrix[x][y] = 0;
    }
  }

  const gridWithTerrain = addTerrain(gridMatrix, terrainTiles);

  return gridWithTerrain;
};

const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

const addTerrain = (grid: GridMatrix, terrainTiles: number) => {
  let placedTiles = 0;
  const gridWithTerrain = clone()(grid);

  while (placedTiles < terrainTiles) {
    const randomX = getRandomInt(0, grid.length);
    const randomY = getRandomInt(0, grid.length);

    if (gridWithTerrain[randomX][randomY] === 0) {
      gridWithTerrain[randomX][randomY] = 1;

      placedTiles += 1;
    }
  }

  return gridWithTerrain;
};
