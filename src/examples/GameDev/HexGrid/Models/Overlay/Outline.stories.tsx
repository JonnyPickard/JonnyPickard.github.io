import type { Meta, StoryObj } from "@storybook/react";

import { Outline as HighlightOutline } from "./Outline";
import { Scene } from "..";
import { TILE_COLORS } from "../../constants";

const meta = {
  title: "Examples/Game Dev/Hex Grid/Overlays",
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
        type: "select",
      },
      options: TILE_COLORS,
      defaultValue: TILE_COLORS.PLAYER,
    },
  },
};
