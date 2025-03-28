import type { Meta, StoryObj } from "@storybook/react";
import { TechTimeline } from "./TechTimeline";
import { careerData } from "./careerData";

const meta: Meta<typeof TechTimeline> = {
  title: "Profile/TechTimeline",
  component: TechTimeline,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TechTimeline>;

export const Default: Story = {
  name: "Tech Timeline",
  args: {
    careerData,
  },
};
