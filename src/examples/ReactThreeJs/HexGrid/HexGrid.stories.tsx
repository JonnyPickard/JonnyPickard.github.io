import type { Meta, StoryObj } from "@storybook/react";

import { HexTileScene } from "./HexTileScene";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid",
  component: HexTileScene,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HexTileScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HexGrid: Story = {};
