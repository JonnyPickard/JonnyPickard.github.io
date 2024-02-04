import type { Meta, StoryObj } from "@storybook/react";

import { Terrain as TerrainModel } from "./Terrain";
import { Scene } from "../";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid/Terrain",
  decorators: [
    (Story) => (
      <Scene>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
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
