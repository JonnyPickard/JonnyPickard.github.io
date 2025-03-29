import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  name: "Default Collapsible",
  args: {
    title: "Click to Expand",
    children: (
      <div style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        This is the collapsible content.
      </div>
    ),
  },
};
