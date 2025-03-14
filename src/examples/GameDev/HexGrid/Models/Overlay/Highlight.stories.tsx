import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { TILE_COLORS } from "../../constants";
import { HighlightTile } from "./Highlight";

const meta = {
  title: "Hexagonal Grids/Overlays",
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
        type: "color",
        presetColors: Object.values(TILE_COLORS),
      },
    },
  },
};
