import { useState, useEffect } from "react";
import { Coordinates } from "../GridTypes";

export const usePlayerStartPosition = (
  initialPosition: Coordinates,
  rows: number,
  columns: number,
) => {
  const [playerStartPosition, setPlayerStartPosition] =
    useState(initialPosition);

  useEffect(() => {
    // Ensure player position is within bounds
    setPlayerStartPosition((prev) => ({
      x: Math.min(prev.x, columns - 1),
      y: Math.min(prev.y, rows - 1),
    }));
  }, [rows, columns]);

  return [playerStartPosition, setPlayerStartPosition] as const;
};
