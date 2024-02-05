import type { Meta, StoryObj } from "@storybook/react";

import { OverlaySphere } from "./Sphere";
import { Scene } from "../";

const meta = {
  title: "Examples/ReactThreeJs/HexGrid/Overlays",
  decorators: [
    (Story) => (
      <Scene>
        <Story />
      </Scene>
    ),
  ],
  component: OverlaySphere,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OverlaySphere>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sphere: Story = {};
