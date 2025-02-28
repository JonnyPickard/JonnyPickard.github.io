import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import type { Graph } from ".";
import { Grid, generateTestMatrix, runGraphGeneration } from ".";
import { GraphNodeToNeigbourList } from "../MarkdownComponents";
import {
  ALGORITH_CURRENT_TILE_COLOR,
  FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
} from "./constants";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/Grid To Graph",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      // TODO: button to generate new grid
      const [testMatrix] = useState(generateTestMatrix({ placePlayer: false }));
      const [tileColorOverrides, setTileColorOverrides] = useState({
        currentAlgTile: { x: 0, y: 0, color: ALGORITH_CURRENT_TILE_COLOR },
        currentNeighboursTile: {
          x: 0,
          y: 1,
          color: FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
        },
      });
      const [graph, setGraph] = useState<Graph>({});

      useEffect(() => {
        runGraphGeneration({
          matrix: testMatrix,
          setTileColorOverrides,
          setGraph,
          tickSpeed: 150,
        });
      }, [testMatrix]);

      return (
        <div
          className={clsx([
            "h-screen",
            "mh-screen",
            "w-screen",
            "mw-screen",
            "bg-slate-900",
            "flex",
            "gap-4",
            "p-4",
            "place-items-center",
            "overflow-hidden",
          ])}
        >
          <div className={clsx(["h-2/3", "flex", "w-full"])}>
            <Story
              args={{
                matrix: testMatrix,
                tileColorOverride: tileColorOverrides,
              }}
            />
          </div>
          <div className={clsx(["h-2/3", "w-full"])}>
            <GraphNodeToNeigbourList graph={graph} />
          </div>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridToGraph: Story = {};
