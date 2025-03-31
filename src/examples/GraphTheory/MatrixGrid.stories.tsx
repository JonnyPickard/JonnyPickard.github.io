import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useWindowSize } from "usehooks-ts";

import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components";
import { GraphKey, MatrixGrid } from ".";
import {
  BG_PLAYER_PATH_COLOR,
  BG_PLAYER_START_COLOR,
  BG_TARGET_COLOR,
  BG_TERRAIN_COLOR,
} from "./Grids/constants";

const meta: Meta<typeof MatrixGrid> = {
  component: MatrixGrid,
  title: "Grids & Graphs/2D Grid With Key",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const { width = 0 } = useWindowSize();

      return (
        <div
          className={clsx([
            "h-screen",
            "w-screen",
            "bg-slate-900",
            "flex",
            "gap-4",
            "p-4",
            "place-items-center",
            "overflow-hidden",
            "flex-col",
            "md:flex-row",
          ])}
        >
          <Story />
          <Drawer
            direction={width >= 768 ? "right" : "bottom"}
            showHandle={false}
            customOpenIcon="radix-icons:arrow-up"
            contentClassName={clsx([
              "max-h-1/2",
              "h-1/2",
              "md:max-h-full",
              "md:h-full",
              "md:min-w-1/2",
            ])}
            openDrawerTooltip={"Show Key"}
            closeDrawerTooltip={"Hide Key"}
          >
            <>
              <DrawerHeader className={clsx(["p-4", "pb-0"])}>
                <DrawerTitle>Graph Key</DrawerTitle>
                <DrawerDescription>
                  Key for understanding the graph visualization.
                </DrawerDescription>
              </DrawerHeader>
              <div
                className={clsx([
                  "p-2",
                  "max-h-full",
                  "h-full",
                  "overflow-auto",
                ])}
              >
                <GraphKey
                  keyTable={[
                    {
                      color: "border border-white",
                      description: "traversable",
                    },
                    {
                      color: BG_TERRAIN_COLOR,
                      description: "terrain (impassable)",
                    },
                    { color: BG_PLAYER_START_COLOR, description: "start" },
                    { color: BG_TARGET_COLOR, description: "target" },
                    { color: BG_PLAYER_PATH_COLOR, description: "path" },
                  ]}
                />
              </div>
            </>
          </Drawer>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof MatrixGrid>;

export const Default: Story = {
  name: "2D Grid With Key",
  parameters: {
    layout: "fullscreen",
  },
};
