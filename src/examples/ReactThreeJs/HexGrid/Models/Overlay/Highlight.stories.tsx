import type { Meta, StoryObj } from "@storybook/react";

import { OverlayHighlight } from "./Highlight";
import { Scene } from "..";
import { TILE_COLORS } from "../constants";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid/Overlays",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: OverlayHighlight,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OverlayHighlight>;

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
      options: TILE_COLORS,
      defaultValue: TILE_COLORS.PLAYER,
    },
  },
};
