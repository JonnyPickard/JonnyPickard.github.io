import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import GUI from "lil-gui";

import { GridWithPathing } from "./";
import { GraphKey } from "../GraphKey";

const PLAYER_START = { x: 0, y: 0 };
const ROWS = 4;
const COLUMNS = 4;
const MAX_ROWS = 10;
const MAX_COLUMNS = 10;
const MIN_ROWS = 1;
const MIN_COLUMNS = 1;

const generateMatrix = (
  rows: number = ROWS,
  columns: number = COLUMNS,
  playerPosition: { x: number; y: number } = PLAYER_START,
): number[][] => {
  // Set an empty multidimensional array full of 0's
  const matrix = Array.from({ length: rows }, () => Array(columns).fill(0));

  const clampPlayerPosition = {
    x: Math.min(playerPosition.x, columns - 1),
    y: Math.min(playerPosition.y, rows - 1),
  };

  matrix[clampPlayerPosition.y][clampPlayerPosition.x] = 2;

  return matrix;
};

const meta: Meta<typeof GridWithPathing> = {
  component: GridWithPathing,
  title: "Examples/Grids & Graphs/Grid With Pathing",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const [rows, setRows] = useState(ROWS);
      const [columns, setColumns] = useState(COLUMNS);
      const [matrix, setMatrix] = useState<number[][]>(
        generateMatrix(ROWS, COLUMNS, PLAYER_START),
      );
      const [playerPosition, setPlayerPosition] = useState(PLAYER_START);

      // TODO: controlls logic is also getting gross and could be abstracted
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
          .min(MIN_ROWS)
          .max(MAX_ROWS)
          .step(1)
          .onFinishChange((value: number) => {
            setRows(value);
          });

        guiRef.current
          .add({ columns }, "columns")
          .min(MIN_COLUMNS)
          .max(MAX_COLUMNS)
          .step(1)
          .onFinishChange((value: number) => {
            setColumns(value);
          });

        // Change player position
        const folder = guiRef.current.addFolder("Player Position");
        folder
          .add(playerPosition, "x")
          .min(0)
          .max(columns - 1)
          .step(1)
          .onFinishChange((value: number) => {
            return setPlayerPosition((prev) => ({ ...prev, x: value }));
          });

        folder
          .add(playerPosition, "y")
          .min(0)
          .max(rows - 1)
          .step(1)
          .onFinishChange((value: number) => {
            return setPlayerPosition((prev) => ({ ...prev, y: value }));
          });

        return () => guiRef.current?.destroy();
      }, [columns, playerPosition, rows]);

      // --- TODO: Refactor
      // This block is gettting gross I should abstract custom state logic into a hook

      // Update player position controls for edge cases when changing grid size
      useEffect(() => {
        // Ensure player position is within bounds
        setPlayerPosition((prev) => {
          return {
            x: Math.min(prev.x, columns - 1),
            y: Math.min(prev.y, rows - 1),
          };
        });
      }, [columns, rows]);

      useEffect(() => {
        // Update matrix
        setMatrix(() => generateMatrix(rows, columns, playerPosition));

        // Disable player position controls if grid is 1x1
        getPlayerControls("x")?.disable(columns === 1);
        getPlayerControls("y")?.disable(rows === 1);
      }, [rows, columns, playerPosition]);
      // ---

      return (
        <div
          className={clsx(
            "h-screen",
            "bg-slate-900",
            "flex items-center",
            "justify-center",
          )}
        >
          <GraphKey
            keyTable={[
              { color: "border border-white", description: "traversable" },
              { color: "bg-pink-700", description: "terrain (impassable)" },
              { color: "bg-emerald-700", description: "player start" },
              { color: "bg-violet-700", description: "player destination" },
              { color: "bg-lime-300", description: "player path" },
            ]}
          />
          <Story args={{ matrix }} />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof GridWithPathing>;

export const GridWithPathingStory: Story = {
  name: "GridWithPathing",
  args: {
    matrix: generateMatrix(4, 4, { x: 0, y: 0 }),
  },
};
