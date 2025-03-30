import { clsx } from "clsx";
import { pickTileColor } from "./Grids";
import type { GridMatrix } from "./Grids/GridTypes";

const defaultMatrix = [
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

const defaultCellSize = 60;
const defaultStrokeWidth = 2;
const defaultStrokeColor = "stroke-slate-800";

interface MatrixGridProps {
  matrix?: GridMatrix;
  cellSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  containerClassName?: string;
  onTileClick?: ({ x, y }: { x: number; y: number }) => void;
  tileColorOverride?: (row: number, col: number) => string | undefined;
}

/**
 * This is intended for drawing a grid with:
 *
 * 0: Empty Tiles - white
 * 1: Players Path - green
 * 2: Terrain Tiles - red
 */
export function MatrixGrid({
  matrix = defaultMatrix,
  cellSize = defaultCellSize,
  strokeWidth = defaultStrokeWidth,
  strokeColor = defaultStrokeColor,
  containerClassName,
  onTileClick = ({ x, y }) => console.log("Clicked on", x, y),
  tileColorOverride,
}: MatrixGridProps) {
  const gridWidth = matrix[0].length * cellSize + strokeWidth * 2;
  const gridHeight = matrix.length * cellSize + strokeWidth * 2;

  return (
    <div
      className={clsx([
        "flex",
        "items-center",
        "justify-center",
        "m-4",
        "w-full",
        "h-full",
        "max-w-screen-md",
        "mx-auto",
        containerClassName,
      ])}
    >
      <svg viewBox={`0 0 ${gridWidth} ${gridHeight}`} className="w-full h-auto">
        {matrix.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <g
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onTileClick({ y: rowIndex, x: colIndex })}
              role="button"
              aria-label={`Grid cell at row ${rowIndex}, column ${colIndex}`}
            >
              <rect
                x={Math.round(colIndex * (gridWidth / matrix[0].length))}
                y={rowIndex * (gridHeight / matrix.length)}
                width={gridWidth / matrix[0].length}
                height={gridHeight / matrix.length}
                strokeWidth={strokeWidth}
                className={clsx([
                  pickTileColor(
                    tile,
                    tileColorOverride && tileColorOverride(rowIndex, colIndex),
                  ),
                  strokeColor,
                ])}
              />
              <text
                x={
                  colIndex * (gridWidth / matrix[0].length) +
                  gridWidth / matrix[0].length / 2
                }
                y={
                  rowIndex * (gridHeight / matrix.length) +
                  gridHeight / matrix.length / 2
                }
                dominantBaseline="middle"
                textAnchor="middle"
                className={clsx(["text-sm", "fill-slate-50"])}
              >
                {`${rowIndex}, ${colIndex}`}
              </text>
            </g>
          )),
        )}
      </svg>
    </div>
  );
}
