import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
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
  title: "Examples/Grids & Graphs/Depth First Search",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
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
            "overflow-hidden",
            "relative",
          ])}
        >
          <div
            className={clsx([
              "flex",
              "w-full",
              "h-full",
              "justify-center",
              "items-center",
            ])}
          >
            <Story
              args={{
                onTileClick: pickPathTile,
                matrix: gridVisualisationMatrix
                  ? gridVisualisationMatrix
                  : originalMatrix,
                tileColorOverride,
              }}
            />
          </div>
          <div className={clsx(["absolute", "top-2", "right-2"])}>
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
                { color: BG_PROCESSING_TILE_COLOR, description: "processing" },
                { color: BG_VISITED_TILE_COLOR, description: "visited" },
              ]}
            />
          </div>
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
