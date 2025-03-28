import type { Meta } from "@storybook/react";
import clsx from "clsx";

import { Grid } from ".";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Grids & Graphs/2D Grid",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
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
      );
    },
  ],
};

export default meta;

// type Story = StoryObj<typeof Grid>;

// const defaultMatrix = [
//   [0, 1, 0, 0],
//   [0, 0, 1, 0],
//   [0, 1, 0, 2],
//   [0, 1, 0, 0],
// ];

// export const Grid2D: Story = {
//   name: "2D Grid",
//   args: {
//     matrix: defaultMatrix,
//   },
// };
