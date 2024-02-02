import type { Meta, StoryObj } from "@storybook/react";

import { PlayerScene } from "./PlayerScene";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid/Player",
  component: PlayerScene,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlayerScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Player: Story = {};
