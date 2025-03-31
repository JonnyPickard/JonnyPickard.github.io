import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useWindowSize } from "usehooks-ts";
import { Grid } from ".";
import { GraphKey } from "../GraphKey";
import {
  BG_PLAYER_PATH_COLOR,
  BG_PLAYER_START_COLOR,
  BG_PROCESSING_TILE_COLOR,
  BG_TARGET_COLOR,
  BG_TERRAIN_COLOR,
  BG_VISITED_TILE_COLOR,
} from "./constants";
import useGridState from "./hooks/useGridState";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Grids & Graphs/Depth First Search",
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
  decorators: [
    (Story) => {
      const { width = 0 } = useWindowSize();

      const {
        originalMatrix,
        gridVisualisationMatrix,
        tileColorOverride,
        pickPathTile,
      } = useGridState("dfs");

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
          <Story
            args={{
              onTileClick: pickPathTile,
              matrix: gridVisualisationMatrix ?? originalMatrix,
              tileColorOverride,
            }}
          />
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
              <DrawerHeader className={clsx(["p-4", "pb-1"])}>
                <DrawerTitle>Depth First Search</DrawerTitle>
                <DrawerDescription>
                  Depth First Search (DFS) explores as far as possible along
                  each branch before backtracking. This visualization
                  demonstrates the traversal process. Click any 2 tiles to set
                  the start and target points. The algorithm will then find a
                  path from the start to the target tile.
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
                    {
                      color: BG_PROCESSING_TILE_COLOR,
                      description: "processing",
                    },
                    { color: BG_VISITED_TILE_COLOR, description: "visited" },
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

type Story = StoryObj<typeof Grid>;

export const GridDFSPath: Story = {
  name: "Depth First Search",
};
