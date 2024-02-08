import type { Meta, StoryObj } from "@storybook/react";

import { HexGridScene } from "./HexGridScene";

const meta = {
  title: "Examples/Game Dev/Hex Grid",
  component: HexGridScene,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HexGridScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {};
