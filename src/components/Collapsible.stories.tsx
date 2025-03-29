import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [(Story) => Story()],
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  name: "Default Collapsible",
  args: {
    title: "Click to Expand",
    children: <div className="p-2">This is the collapsible content.</div>,
  },
};
