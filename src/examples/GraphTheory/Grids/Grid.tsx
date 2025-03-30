import { MatrixGrid } from "../MatrixGrid";
import {
  DEFAULT_MATRIX,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TILE_SIZE,
} from "./constants";
import { useGridStore } from "./gridStore";
import type { GridMatrix } from "./GridTypes";

interface GridProps {
  matrix?: GridMatrix | null;
  tileSize?: number;
  strokeWidth?: number;
  onTileClick?: ({ x, y }: { x: number; y: number }) => void;
  tileColorOverride?: {
    currentNeighboursTile?: { x: number; y: number; color: string };
    currentAlgTile?: { x: number; y: number; color: string };
    startTile?: { x: number; y: number; color: string };
    targetTile?: { x: number; y: number; color: string };
  };
}

export function Grid({
  matrix = DEFAULT_MATRIX,
  tileSize = DEFAULT_TILE_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  onTileClick = ({ x, y }) => console.log("Clicked on", x, y),
  tileColorOverride,
}: GridProps) {
  const { setPlayerLocation } = useGridStore();

  // Handle tile click events and update player location
  const handleTileClick = ({ x, y }: { x: number; y: number }) => {
    onTileClick({ x, y });
    setPlayerLocation({ x, y });
  };

  // Override tile colors based on specific conditions
  const overrideTileColor = (row: number, col: number) => {
    if (tileColorOverride) {
      if (
        tileColorOverride.currentNeighboursTile &&
        tileColorOverride.currentNeighboursTile.x === col &&
        tileColorOverride.currentNeighboursTile.y === row
      ) {
        return tileColorOverride.currentNeighboursTile.color;
      }
      if (
        tileColorOverride.currentAlgTile &&
        tileColorOverride.currentAlgTile.x === col &&
        tileColorOverride.currentAlgTile.y === row
      ) {
        return tileColorOverride.currentAlgTile.color;
      }
      if (
        tileColorOverride.startTile &&
        tileColorOverride.startTile.x === col &&
        tileColorOverride.startTile.y === row
      ) {
        return tileColorOverride.startTile.color;
      }
      if (
        tileColorOverride.targetTile &&
        tileColorOverride.targetTile.x === col &&
        tileColorOverride.targetTile.y === row
      ) {
        return tileColorOverride.targetTile.color;
      }
    }
  };

  return (
    matrix &&
    matrix.length && (
      <MatrixGrid
        matrix={matrix}
        cellSize={tileSize}
        strokeWidth={strokeWidth}
        onTileClick={handleTileClick}
        tileColorOverride={overrideTileColor}
      />
    )
  );
}
