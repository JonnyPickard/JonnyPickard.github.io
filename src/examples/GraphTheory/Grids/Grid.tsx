import { clsx } from "clsx";

import { pickCellColor } from "./utils";

import {
  DEFAULT_MATRIX,
  DEFAULT_CELL_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_STROKE_COLOR,
} from "./constants";

interface GridProps {
  matrix?: number[][];
  cellSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  tileClickCallback?: (x: number, y: number) => void;
  tileColorOverride?: {
    currentAlgTile: {
      x: number;
      y: number;
      color: string;
    };
    currentNeighboursTile: {
      x: number;
      y: number;
      color: string;
    };
  };
}

/**
 * @remarks
 * This is intended for drawing 2D Grid using a maxtrix where:
 * - **0:** Empty Tiles = **white**
 * - **1:** Players Path = **green**
 * - **2:** Terrain Tiles = **red**
 *
 * **The index of the nested array at depth 1 denotes row position & x coordinate**
 *
 * ```js
 * const grid = [
 *   [0, 0, 0, 0], // x0
 *   [0, 0, 0, 0], // x1
 *   [0, 0, 0, 0], // x2
 *   [0, 0, 0, 0], // x3
 * ];
 * ```
 *
 * **The index of the nested array element \(depth 2\) denotes column position & y coordinate**
 *
 * ```js
 * const grid = [
 *   [y0, y1, y2, y3],
 *   [y0, y1, y2, y3],
 *   [y0, y1, y2, y3],
 *   [y0, y1, y2, y3],
 * ];
 * ```
 */
export function Grid({
  matrix = DEFAULT_MATRIX,
  cellSize = DEFAULT_CELL_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  tileClickCallback = (x, y) => console.log("Clicked on", x, y),
  tileColorOverride,
}: GridProps) {
  const overrideCellColor = (rowI: number, colI: number) => {
    if (tileColorOverride) {
      if (
        tileColorOverride.currentNeighboursTile &&
        tileColorOverride.currentNeighboursTile.x === rowI &&
        tileColorOverride.currentNeighboursTile.y === colI
      ) {
        return tileColorOverride.currentNeighboursTile.color;
      }
      if (
        tileColorOverride.currentAlgTile &&
        tileColorOverride.currentAlgTile.x === rowI &&
        tileColorOverride.currentAlgTile.y === colI
      ) {
        return tileColorOverride.currentAlgTile.color;
      }
    }
  };

  return (
    <svg
      width={matrix[0].length * cellSize + strokeWidth * 2}
      height={matrix.length * cellSize + strokeWidth * 2}
    >
      {matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <g
            key={`${rowIndex}-${colIndex}`}
            onClick={() => tileClickCallback(rowIndex, colIndex)}
          >
            <rect
              x={colIndex * cellSize + strokeWidth}
              y={rowIndex * cellSize + strokeWidth}
              width={cellSize}
              height={cellSize}
              strokeWidth={strokeWidth}
              className={clsx([
                pickCellColor(cell, overrideCellColor(rowIndex, colIndex)),
                "red",
              ])}
            />
            <text
              x={colIndex * cellSize + cellSize / 2}
              y={rowIndex * cellSize + cellSize / 2}
              dominantBaseline="middle"
              textAnchor="middle"
              className={clsx(["text-sm", "fill-white"])}
            >
              {`${rowIndex}, ${colIndex}`}
            </text>
          </g>
        )),
      )}
    </svg>
  );
}
