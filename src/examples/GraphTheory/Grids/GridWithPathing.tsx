// import { clsx } from "clsx";
// import { pickTileColor } from "./utils";

import { useTimer } from "../../../hooks";
import { Grid } from "./Grid";

import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_MATRIX,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TILE_SIZE,
} from "./constants";

interface GridWithPathingProps {
  matrix?: number[][];
  tileSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  onTileClick?: ({ x, y }: { x: number; y: number }) => void;
}

type Coordinate = {
  x: number;
  y: number;
};

export function GridWithPathing({
  matrix = DEFAULT_MATRIX,
  tileSize = DEFAULT_TILE_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  onTileClick = ({ x, y }) => console.log("Clicked on", x, y),
}: GridWithPathingProps) {
  const [playerLocation, setPlayerLocation] = useState<Coordinate>({
    x: 0,
    y: 0,
  });
  const [playerStart, setPlayerStart] = useState<Coordinate | null>(null);
  const [target, setTarget] = useState<Coordinate | null>(null);
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
      tileSize={tileSize}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      onTileClick={onTileClick}
    />
  );
}
