import { clsx } from "clsx";
import { pickTileColor } from "./utils";
import {
  DEFAULT_MATRIX,
  DEFAULT_TILE_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_STROKE_COLOR,
} from "./constants";

interface GridProps {
  matrix?: number[][];
  tileSize?: number;
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
 * **The index of the nested array at depth 1 denotes row position & y coordinate**
 *
 * ```js
 * const grid = [
 *   [0, 0, 0, 0], // y0  < [ ------- ] > this is a row so row position is up/ down in the grid (Y)
 *   [0, 0, 0, 0], // y1
 *   [0, 0, 0, 0], // y2
 *   [0, 0, 0, 0], // y3
 * ];
 * ```
 *
 * **The index of the nested array element \(depth 2\) denotes column position & x coordinate**
 *
 * ```js
 * const grid = [
 *   [x0, <--> x1 <-->, x2, <--> x3], within a row you now have column position or X
 *   [x0, x1, x2, x3],
 *   [x0, x1, x2, x3],
 *   [x0, x1, x2, x3],
 * ];
 * ```
 */
export function Grid({
  matrix = DEFAULT_MATRIX,
  tileSize = DEFAULT_TILE_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  tileClickCallback = (x, y) => console.log("Clicked on", x, y),
  tileColorOverride,
}: GridProps) {
  const overrideTileColor = (rowI: number, colI: number) => {
    if (tileColorOverride) {
      if (
        tileColorOverride.currentNeighboursTile &&
        tileColorOverride.currentNeighboursTile.x === colI &&
        tileColorOverride.currentNeighboursTile.y === rowI
      ) {
        return tileColorOverride.currentNeighboursTile.color;
      }
      if (
        tileColorOverride.currentAlgTile &&
        tileColorOverride.currentAlgTile.x === colI &&
        tileColorOverride.currentAlgTile.y === rowI
      ) {
        return tileColorOverride.currentAlgTile.color;
      }
    }
  };

  return (
    <div className={clsx(["flex", "items-center", "justify-center", "m-4"])}>
      <svg
        width={matrix[0].length * tileSize + strokeWidth * 2}
        height={matrix.length * tileSize + strokeWidth * 2}
      >
        {matrix.map(
          (
            row,
            rowIndex, // x
          ) =>
            row.map(
              (
                tile,
                colIndex, // y
              ) => (
                <g
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => tileClickCallback(rowIndex, colIndex)}
                >
                  <rect
                    x={colIndex * tileSize + strokeWidth}
                    y={rowIndex * tileSize + strokeWidth}
                    width={tileSize}
                    height={tileSize}
                    strokeWidth={strokeWidth}
                    className={clsx([
                      pickTileColor(
                        tile,
                        overrideTileColor(rowIndex, colIndex),
                      ),
                      `${strokeColor}`,
                    ])}
                  />
                  <text
                    x={colIndex * tileSize + tileSize / 2}
                    y={rowIndex * tileSize + tileSize / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className={clsx(["text-sm", "fill-white"])}
                  >
                    {`${colIndex}, ${rowIndex}`}
                  </text>
                </g>
              ),
            ),
        )}
      </svg>
    </div>
  );
}
