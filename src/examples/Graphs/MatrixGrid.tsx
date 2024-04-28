const defaultMatrix = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];
const defaultCellSize = 60;
const defaultStrokeWidth = 2;
const defaultFillColor = "fill-lime-300";
const defaultStrokeColor = "stroke-slate-50";

interface MatrixGridProps {
  matrix?: number[][];
  cellSize?: number;
  strokeWidth?: number;
  fillColor?: string;
  strokeColor?: string;
}

export function MatrixGrid({
  matrix = defaultMatrix,
  cellSize = defaultCellSize,
  strokeWidth = defaultStrokeWidth,
  fillColor = defaultFillColor,
  strokeColor = defaultStrokeColor,
}: MatrixGridProps) {
  return (
    <svg
      width={matrix[0].length * cellSize + strokeWidth * 2}
      height={matrix.length * cellSize + strokeWidth * 2}
    >
      {matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <g key={`${rowIndex}-${colIndex}`}>
            <rect
              x={colIndex * cellSize + strokeWidth}
              y={rowIndex * cellSize + strokeWidth}
              width={cellSize}
              height={cellSize}
              stroke-width={strokeWidth}
              className={[
                cell === 1 ? fillColor : "fill-transparent",
                strokeColor,
              ].join(" ")}
            />
            <text
              x={colIndex * cellSize + cellSize / 2}
              y={rowIndex * cellSize + cellSize / 2}
              dominantBaseline="middle"
              textAnchor="middle"
              className={[
                "text-sm",
                cell === 1 ? "fill-slate-900" : "fill-slate-50",
              ].join(" ")}
            >
              {`${rowIndex}, ${colIndex}`}
            </text>
          </g>
        )),
      )}
    </svg>
  );
}
