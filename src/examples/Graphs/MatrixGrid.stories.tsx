import type { Meta, StoryObj } from "@storybook/react";

import { Graphs } from "./Graphs";

const meta: Meta<typeof Graphs> = {
  component: Graphs,
  title: "Examples/Graphs/MatrixGrid",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-slate-900 flex items-center justify-center">
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
