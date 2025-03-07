import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { HexTileGrass as HexTileGrassModel } from "./HexTileGrass";

const meta = {
  title: "Examples/Game Dev/Hex Grid",
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
