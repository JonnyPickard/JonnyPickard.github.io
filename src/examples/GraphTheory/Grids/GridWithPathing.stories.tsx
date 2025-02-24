import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { GridWithPathing } from "./";

const meta: Meta<typeof GridWithPathing> = {
  component: GridWithPathing,
  title: "Examples/Grids & Graphs/Grid With Pathing",
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
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GridWithPathing>;

const defaultMatrix = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 2],
  [0, 1, 0, 0],
];

export const GridWithPathingStory: Story = {
  name: "GridWithPathing",
  args: {
    matrix: defaultMatrix,
  },
};
