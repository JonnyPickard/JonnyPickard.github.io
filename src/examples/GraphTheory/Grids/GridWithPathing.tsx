import {
  // useEffect,
  useMemo,
} from "react";
import { useTimer } from "../../../hooks";
import { Grid } from "./Grid";
import { useGridStore } from "./gridStore";

import {
  DEFAULT_MATRIX,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TILE_SIZE,
} from "./constants";
import type { GridMatrix } from "./GridTypes";

interface GridWithPathingProps {
  matrix?: GridMatrix;
  tileSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  onTileClick?: ({ x, y }: { x: number; y: number }) => void;
}

export function GridWithPathing({
  matrix = DEFAULT_MATRIX,
  tileSize = DEFAULT_TILE_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  onTileClick = ({ x, y }) => console.log("Clicked on", x, y),
}: GridWithPathingProps) {
  const { playerPath } = useGridStore();

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
