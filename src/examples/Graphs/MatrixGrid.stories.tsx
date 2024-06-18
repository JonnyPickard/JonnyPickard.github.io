import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { Graphs, GraphKey } from ".";

const meta: Meta<typeof Graphs> = {
  component: Graphs,
  title: "Examples/Graphs/MatrixGrid",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
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
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Graphs>;

const defaultMatrix = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 2],
  [0, 1, 0, 0],
];

export const MatrixGrid: Story = {
  args: {
    matrix: defaultMatrix,
  },
};
