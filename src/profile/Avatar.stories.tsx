import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

import Headshot from "../assets/profile/headshot-700x700.png";

const meta: Meta<typeof Avatar> = {
  title: "Profile Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    src: Headshot,
    alt: "User Avatar",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  name: "Avatar",
  args: {
    src: Headshot,
    alt: "Custom User Avatar",
  },
  decorators: (Story) => (
    <div className="min-h-[400px] min-w-[400px] flex items-center justify-center bg-gray-900 text-gray-100 rounded-2xl">
      <Story />
    </div>
  ),
};
