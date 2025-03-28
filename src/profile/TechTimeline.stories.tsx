import type { Meta, StoryObj } from "@storybook/react";
import { TechTimeline } from "./TechTimeline";
import { careerData } from "./careerData";

const meta: Meta<typeof TechTimeline> = {
  title: "Profile/TechTimeline",
  component: TechTimeline,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TechTimeline>;

export const Default: Story = {
  name: "Tech Timeline",
  args: {
    careerData,
  },
  decorators: (Story) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <Story />
    </div>
  ),
};
