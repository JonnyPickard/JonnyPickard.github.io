import type { Meta, StoryObj } from "@storybook/react";

import { HexGridDisplayScene } from "./HexGridDisplayScene";
import { HexGridGameScene } from "./HexGridGameScene";

const meta = {
  title: "Hexagonal Grids",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HexGridGameScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GameGrid: Story = {
  name: "Interactive Grid with A* Pathfinding",
  render: () => <HexGridGameScene />,
};

export const DisplayGrid: Story = {
  name: "Simple Hexagonal Grid Display",
  render: () => <HexGridDisplayScene />,
};
