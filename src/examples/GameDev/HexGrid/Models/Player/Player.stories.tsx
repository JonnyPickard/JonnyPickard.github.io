import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "../Scene";
import { Player as PlayerModel } from "./Player";

const meta = {
  title: "Hexagonal Grids/Player",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: PlayerModel,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlayerModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Player: Story = {};
