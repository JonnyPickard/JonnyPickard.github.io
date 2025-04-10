import type { Meta, StoryObj } from "@storybook/react";
import { Parallax } from "./Parallax";

const meta: Meta<typeof Parallax> = {
  title: "Components/Parallax",
  component: Parallax,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Parallax>;

export const Default: Story = {
  name: "Default Parallax",
  args: {
    children: (
      <div style={{ height: "200px", background: "lightblue" }}>
        Parallax Content
      </div>
    ),
  },
};
