import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { TILE_COLORS } from "../../constants";
import { OverlayText } from "./Text";

const meta = {
  title: "Examples/Game Dev/Hex Grid/Overlays",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: OverlayText,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OverlayText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    coordinates: { q: 1, r: 2, s: 3 },
    isTerrainTile: false,
    isHoveredTile: false,
  },
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: [TILE_COLORS],
      defaultValue: TILE_COLORS.PLAYER,
    },
  },
};
