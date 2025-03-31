import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: "Components/Button/Toggle Button",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the button is in the open state.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the button.",
    },
    tooltipOpen: {
      control: "text",
      description: "Tooltip label when the button is open.",
    },
    tooltipClose: {
      control: "text",
      description: "Tooltip label when the button is closed.",
    },
    size: {
      control: {
        type: "radio",
        options: ["default", "sm", "lg"],
      },
      description: "Size of the toggle button.",
    },
    direction: {
      control: {
        type: "radio",
        options: ["horizontal", "vertical"],
      },
      description: "Direction of the toggle button.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  name: "Toggle Button",
  args: {
    size: "lg",
    tooltipOpen: "Open",
    tooltipClose: "Close",
    direction: "vertical",
    isOpen: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <ToggleButton
        {...args}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(() => !isOpen);
          args.onClick?.();
        }}
      />
    );
  },
};
