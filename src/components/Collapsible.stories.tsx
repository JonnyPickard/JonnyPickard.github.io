import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => <div className="size-100">{Story()}</div>],
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  name: "Default Collapsible",
  args: {
    Title: "Click to Expand",
    children: <div className="p-2">This is the collapsible content.</div>,
  },
};
