import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { TILE_COLORS } from "../../constants";
import { HighlightTile } from "./Highlight";

const meta = {
  title: "Examples/Game Dev/Hex Grid/Overlays",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: HighlightTile,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HighlightTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Highlight: Story = {
  args: {
    tileOverlayColor: TILE_COLORS.PLAYER,
  },
  argTypes: {
    tileOverlayColor: {
      control: {
        type: "select",
      },
      options: [TILE_COLORS],
      defaultValue: TILE_COLORS.PLAYER,
    },
  },
};
