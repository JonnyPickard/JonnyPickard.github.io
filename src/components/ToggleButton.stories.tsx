import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: "Components/ToggleButton",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the button is in the open state.",
    },
    onClick: {
      action: "clicked",
      description: "Callback function when the button is clicked.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the button.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  name: "Default",
  args: {
    isOpen: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <ToggleButton
        {...args}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          args.onClick?.();
        }}
      />
    );
  },
};
