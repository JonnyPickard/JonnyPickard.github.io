import type { Meta, StoryObj } from "@storybook/react";

import { HexTileScene } from "./HexTileScene";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid",
  component: HexTileScene,
  // args: {
  //   cameraX: 0,
  //   cameraY: 0,
  //   cameraZ: 0,
  //   cameraFov: 15,
  // },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof HexTileScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HexTile: Story = {};
