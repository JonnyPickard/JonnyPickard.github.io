import type { Meta, StoryObj } from "@storybook/react";

import { AvatarScene } from "./AvatarScene";

const meta = {
  title: "Examples/ReactThreeJs/Avatar",
  component: AvatarScene,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof AvatarScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlairAnimation: Story = {};
