import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => <div className="size-100">{Story()}</div>],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  name: "Accordion",
  args: {
    items: [
      {
        title: "Section 1",
        content: "This is the content for section 1.",
      },
      {
        title: "Section 2",
        content: "This is the content for section 2.",
      },
      {
        title: "Section 3",
        content: "This is the content for section 3.",
      },
    ],
    defaultValue: "Section 1",
    collapsible: true,
  },
};
