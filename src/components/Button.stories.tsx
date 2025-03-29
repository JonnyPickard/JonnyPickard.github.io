import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click Me",
    size: "default",
  },
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  name: "Default Button",
  args: {
    variant: "default",
  },
};

export const Outline: Story = {
  name: "Outline Button",
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  name: "Ghost Button",
  args: {
    variant: "ghost",
  },
};

export const Destructive: Story = {
  name: "Destructive Button",
  args: {
    variant: "destructive",
  },
};

export const Secondary: Story = {
  name: "Secondary Button",
  args: {
    variant: "secondary",
  },
};

export const Link: Story = {
  name: "Link Button",
  args: {
    variant: "link",
  },
};
