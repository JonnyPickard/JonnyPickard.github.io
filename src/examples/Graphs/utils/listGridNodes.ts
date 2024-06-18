/**
 * List all node coordinates for a given grid
 */
export const listGridNodes = (
  rows: number,
  columns: number,
  matrix?: number[][],
) => {
  let r = rows;
  let c = columns;

  if (matrix && matrix.length > 0) {
    r = matrix.length;
    c = matrix[0].length;
  }

  const nodes = [];

  for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
      nodes.push([x, y]);
    }
  }

  return nodes;
};
