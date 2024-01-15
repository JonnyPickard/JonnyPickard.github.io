import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "./Scene";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid",
  component: Scene,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Scene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HexTile: Story = {};
