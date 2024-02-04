import type { Meta, StoryObj } from "@storybook/react";

import { HexTileGrass as HexTileGrassModel } from "./HexTileGrass";
import { Scene } from "../";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: HexTileGrassModel,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HexTileGrassModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tile: Story = {};
