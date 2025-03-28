import type { Meta, StoryObj } from "@storybook/react";
import { SkillBars } from "./SkillBars";

const meta = {
  title: "Profile/SkillBars",
  component: SkillBars,
} satisfies Meta<typeof SkillBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Skill Bars",
  render: () => <SkillBars />,
};
