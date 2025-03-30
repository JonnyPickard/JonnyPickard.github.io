import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useState } from "react";
import Button from "./Button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [goal, setGoal] = useState(350);

    function onClick(adjustment: number) {
      setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    }

    return (
      <Drawer>
        <div className={clsx(["mx-auto", "w-full", "max-w-sm", "dark"])}>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className={clsx(["p-4", "pb-0"])}>
            <div
              className={clsx([
                "flex",
                "items-center",
                "justify-center",
                "space-x-2",
              ])}
            >
              <Button
                variant="outline"
                size="icon"
                className={clsx(["h-8", "w-8", "shrink-0", "rounded-full"])}
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Icon icon={"mdi:minus"} />
                <span className={clsx(["sr-only"])}>Decrease</span>
              </Button>
              <div className={clsx(["flex-1", "text-center"])}>
                <div
                  className={clsx([
                    "text-7xl",
                    "font-bold",
                    "tracking-tighter",
                  ])}
                >
                  {goal}
                </div>
                <div
                  className={clsx([
                    "text-[0.70rem]",
                    "uppercase",
                    "text-muted-foreground",
                  ])}
                >
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={clsx(["h-8", "w-8", "shrink-0", "rounded-full"])}
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Icon icon={"mdi:plus"} />
                <span className={clsx(["sr-only"])}>Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </Drawer>
    );
  },
};
