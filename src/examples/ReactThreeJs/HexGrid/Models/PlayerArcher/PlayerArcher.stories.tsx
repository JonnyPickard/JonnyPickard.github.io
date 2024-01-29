import type { Meta, StoryObj } from "@storybook/react";

import { PlayerArcherScene } from "./PlayerArcherScene";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid/PlayerArcher",
  component: PlayerArcherScene,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlayerArcherScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerArcher: Story = {};
