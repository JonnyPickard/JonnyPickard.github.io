import type { Meta, StoryObj } from "@storybook/react";

import { Scene } from "..";
import { TILE_COLORS } from "../../constants";
import { Outline as HighlightOutline } from "./Outline";

const meta = {
  title: "Hexagonal Grids/Overlays",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: HighlightOutline,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HighlightOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
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
