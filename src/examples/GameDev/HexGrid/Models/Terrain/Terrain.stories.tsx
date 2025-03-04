import type { Meta, StoryObj } from "@storybook/react";

import { Terrain as TerrainModel } from "./Terrain";
import { Scene } from "..";

const meta = {
  title: "Examples/Game Dev/Hex Grid/Terrain",
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
