// import { clsx } from "clsx";
// import { pickCellColor } from "./utils";

import { Grid } from "./Grid";
import { useTimer } from "../../../hooks";

import { useEffect, useState, useMemo } from "react";

import {
  DEFAULT_MATRIX,
  DEFAULT_CELL_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_STROKE_COLOR,
} from "./constants";

interface GridWithPathingProps {
  matrix?: number[][];
  cellSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  tileClickCallback?: (x: number, y: number) => void;
}

type Coordinate = {
  x: number;
  y: number;
};

export function GridWithPathing({
  matrix = DEFAULT_MATRIX,
  cellSize = DEFAULT_CELL_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  tileClickCallback = (x, y) => console.log("Clicked on", x, y),
}: GridWithPathingProps) {
  const [playerLocation, setPlayerLocation] = useState<Coordinate>({
    x: 0,
    y: 0,
  });
  const [playerStart, setPlayerStart] = useState<Coordinate | null>(null);
  const [playerDestination, setPlayerDestination] = useState<Coordinate | null>(
    null,
  );
  const [playerPath, setPlayerPath] = useState<Coordinate[] | null>(null);

  const activePath = useMemo(() => {
    if (playerPath) {
      return true;
    }
    return false;
  }, [playerPath]);

  useTimer(() => {
    // when active path - rerender every sec with the players next path step
    console.log("hello");
  }, activePath);

  return (
    <Grid
      matrix={matrix}
      cellSize={cellSize}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      tileClickCallback={tileClickCallback}
    />
  );
}
