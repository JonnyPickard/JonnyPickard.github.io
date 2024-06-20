import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { Graph } from "./Graph";

const meta: Meta<typeof Graph> = {
  component: Graph,
  title: "Examples/Graphs/Graph",
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

type Story = StoryObj<typeof Graph>;

export const Story: Story = {};
