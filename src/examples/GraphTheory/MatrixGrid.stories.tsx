import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { GraphKey, MatrixGrid } from ".";
import {
  BG_PLAYER_PATH_COLOR,
  BG_PLAYER_START_COLOR,
  BG_TARGET_COLOR,
  BG_TERRAIN_COLOR,
} from "./Grids/constants";

const meta: Meta<typeof MatrixGrid> = {
  component: MatrixGrid,
  title: "Grids & Graphs/2D Grid With Key",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        className={clsx([
          "h-screen",
          "w-screen",
          "bg-slate-900",
          "gap-4",
          "p-4",
          "overflow-hidden",
          "relative",
        ])}
      >
        <div
          className={clsx([
            "flex",
            "w-full",
            "h-full",
            "justify-center",
            "items-center",
          ])}
        >
          <Story />
        </div>
        <div className={clsx(["absolute", "top-2", "right-2"])}>
          <GraphKey
            keyTable={[
              {
                color: "border border-white",
                description: "traversable",
              },
              {
                color: BG_TERRAIN_COLOR,
                description: "terrain (impassable)",
              },
              { color: BG_PLAYER_START_COLOR, description: "start" },
              { color: BG_TARGET_COLOR, description: "target" },
              { color: BG_PLAYER_PATH_COLOR, description: "path" },
            ]}
          />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MatrixGrid>;

export const Default: Story = {
  name: "2D Grid With Key",
  parameters: {
    layout: "fullscreen",
  },
};
