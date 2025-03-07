import type { Meta } from "@storybook/react";
import clsx from "clsx";
import { useState } from "react";

import { GraphKey } from "../GraphKey";
import { GridWithPathing } from "./";
import { useGridControls } from "./hooks/useGridControls";
import {
  // generateMatrix,
  useMatrix,
} from "./hooks/useMatrix";
import { usePlayerStartPosition } from "./hooks/usePlayerStartPosition";

const PLAYER_START = { x: 0, y: 0 };
const ROWS = 4;
const COLUMNS = 4;
const MAX_ROWS = 10;
const MAX_COLUMNS = 10;
const MIN_ROWS = 1;
const MIN_COLUMNS = 1;

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
      const [playerStartPosition, setPlayerStartPosition] =
        usePlayerStartPosition(PLAYER_START, rows, columns);
      const matrix = useMatrix(rows, columns, playerStartPosition);

      useGridControls({
        rows,
        setRows,
        columns,
        setColumns,
        playerStartPosition,
        setPlayerStartPosition: setPlayerStartPosition,
        constraints: {
          rows: { min: MIN_ROWS, max: MAX_ROWS },
          columns: { min: MIN_COLUMNS, max: MAX_COLUMNS },
        },
      });

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
              { color: "bg-violet-700", description: "player target" },
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

// type Story = StoryObj<typeof GridWithPathing>;

// TODO: commented out until worked finished
// export const GridWithPathingStory: Story = {
//   name: "GridWithPathing",
//   args: {
//     matrix: generateMatrix(4, 4, { x: 0, y: 0 }),
//   },
// };
