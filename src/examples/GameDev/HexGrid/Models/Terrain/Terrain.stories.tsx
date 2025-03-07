import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { Terrain as TerrainModel } from "./Terrain";

const meta = {
  title: "Hexagonal Grids/Terrain",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: TerrainModel,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TerrainModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Terrain: Story = {};
