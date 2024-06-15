/**
 * List all nodes for a given grid size
 */
export const listGridNodes = (rows: number, columns: number) => {
  const grid = [];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      grid.push([x, y]);
    }
  }

  return grid;
};
