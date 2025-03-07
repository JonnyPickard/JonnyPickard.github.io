import GUI from "lil-gui";
import { Dispatch, useEffect, useRef } from "react";

import { Coordinates } from "../GridTypes";

interface GridControlsProps {
  rows: number;
  setRows: (value: number) => void;
  columns: number;
  setColumns: (value: number) => void;
  playerStartPosition: Coordinates;
  setPlayerStartPosition: Dispatch<React.SetStateAction<Coordinates>>;
  constraints: {
    rows: { min: number; max: number };
    columns: { min: number; max: number };
  };
}

export const useGridControls = ({
  rows,
  setRows,
  columns,
  setColumns,
  playerStartPosition,
  setPlayerStartPosition,
  constraints,
}: GridControlsProps) => {
  const guiRef = useRef<GUI | null>(null);

  const getPlayerControls = (position: "x" | "y") =>
    guiRef.current
      ?.controllersRecursive()
      .filter((property) => property.property === position)[0];

  useEffect(() => {
    // Initialize GUI
    guiRef.current = new GUI({ title: "Grid Controls" });

    // Change grid size
    guiRef.current
      .add({ rows }, "rows")
      .min(constraints.rows.min)
      .max(constraints.rows.max)
      .step(1)
      .onFinishChange((value: number) => {
        setRows(value);
      });

    guiRef.current
      .add({ columns }, "columns")
      .min(constraints.columns.min)
      .max(constraints.columns.max)
      .step(1)
      .onFinishChange((value: number) => {
        setColumns(value);
      });

    // Change player position
    const folder = guiRef.current.addFolder("Player Start");
    folder
      .add(playerStartPosition, "x")
      .min(0)
      .max(columns - 1)
      .step(1)
      .onFinishChange((value: number) => {
        setPlayerStartPosition((prev) => ({
          ...prev,
          x: value,
        }));
      });

    folder
      .add(playerStartPosition, "y")
      .min(0)
      .max(rows - 1)
      .step(1)
      .onFinishChange((value: number) => {
        setPlayerStartPosition((prev) => ({
          ...prev,
          y: value,
        }));
      });

    return () => guiRef.current?.destroy();
  }, [
    columns,
    constraints.columns.max,
    constraints.columns.min,
    constraints.rows.max,
    constraints.rows.min,
    playerStartPosition,
    rows,
    setColumns,
    setPlayerStartPosition,
    setRows,
  ]);

  useEffect(() => {
    // Disable player position controls if grid is 1x1
    getPlayerControls("x")?.disable(columns === 1);
    getPlayerControls("y")?.disable(rows === 1);
  }, [rows, columns]);

  return guiRef;
};
