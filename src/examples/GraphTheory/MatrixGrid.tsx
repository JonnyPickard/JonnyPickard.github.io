import { clsx } from "clsx";
import type { GridMatrix } from "./Grids/GridTypes";

const defaultMatrix = [
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];

const defaultCellSize = 60;
const defaultStrokeWidth = 2;
const playerPathFillColor = "fill-lime-300";
const terrainFillColor = "fill-pink-700";
const playerStartFillColor = "fill-emerald-700";
const targetFillColor = "fill-violet-700";
const transparentFillColor = "fill-transparent";
const defaultStrokeColor = "stroke-slate-50";

const pickCellColor = (cellTypeInt: number) => {
  switch (cellTypeInt) {
    case 1:
      return terrainFillColor;
    case 2:
      return playerStartFillColor;
    case 3:
      return targetFillColor;
    case 4:
      return playerPathFillColor;
    default:
      return transparentFillColor;
  }
};

interface MatrixGridProps {
  matrix?: GridMatrix;
  cellSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  onTileClick?: ({ x, y }: { x: number; y: number }) => void;
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
  onTileClick = ({ x, y }) => console.log("Clicked on", x, y),
}: MatrixGridProps) {
  return (
    <div
      className={clsx([
        "flex",
        "items-center",
        "justify-center",
        "m-4",
        "w-full",
        "h-full",
      ])}
    >
      <svg
        width={matrix[0].length * cellSize + strokeWidth * 2}
        height={matrix.length * cellSize + strokeWidth * 2}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <g
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onTileClick({ y: rowIndex, x: colIndex })}
            >
              <rect
                x={colIndex * cellSize + strokeWidth}
                y={rowIndex * cellSize + strokeWidth}
                width={cellSize}
                height={cellSize}
                strokeWidth={strokeWidth}
                className={clsx([pickCellColor(cell), strokeColor])}
              />
              <text
                x={colIndex * cellSize + cellSize / 2}
                y={rowIndex * cellSize + cellSize / 2}
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
