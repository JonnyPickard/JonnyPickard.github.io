import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

import Headshot from "../assets/profile/headshot-700x700.png";

const meta: Meta<typeof Avatar> = {
  title: "Profile/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    src: Headshot,
    alt: "User Avatar",
    fallback: "UA",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  name: "Avatar",
  args: {
    src: Headshot,
    alt: "Custom User Avatar",
    fallback: "CU",
  },
};
