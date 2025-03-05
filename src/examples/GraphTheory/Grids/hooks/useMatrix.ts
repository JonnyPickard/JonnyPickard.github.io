import { useEffect, useState } from "react";

import type { Coordinates, GridMatrix } from "../GridTypes";

// For now dont do:
// - walls
// pathing
// custom objects for specific tiles
//
// Do I do a create inital matrix for the map?
// Then update that matrix on each render?

interface GenerateMatrixProps {
  rows: number;
  columns: number;
  playerStartPosition: Coordinates;
  playerPosition: Coordinates;
  activePath: Coordinates[];
}

// Note: this controls what the UI displays
export const generateMatrix = (
  rows: number,
  columns: number,
  playerStartPosition: Coordinates,
): GridMatrix => {
  // Set an empty multidimensional array full of 0's
  const matrix = Array.from({ length: rows }, () => Array(columns).fill(0));

  const clampPlayerStartPosition = {
    x: Math.min(playerStartPosition.x, columns - 1),
    y: Math.min(playerStartPosition.y, rows - 1),
  };

  matrix[clampPlayerStartPosition.y][clampPlayerStartPosition.x] = 2;

  console.log("matrix", matrix);

  return matrix;
};

// Use this to control all grid updates
export const useMatrix = (
  rows: number,
  columns: number,
  playerStartPosition: Coordinates,
) => {
  const [matrix, setMatrix] = useState<GridMatrix>(
    generateMatrix(rows, columns, playerStartPosition),
  );

  useEffect(() => {
    setMatrix(generateMatrix(rows, columns, playerStartPosition));
  }, [rows, columns, playerStartPosition]);

  return matrix;
};
