import { Drawer } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import { Grid, generateTestMatrix, runGraphGeneration } from ".";
import { GraphNodeToNeigbourList } from "../MarkdownComponents";
import {
  FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
  PROCESSING_TILE_COLOR,
} from "./constants";
import { useGridStore } from "./gridStore";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Grids & Graphs/Convert To Graph (Adjacency List)",

  parameters: {
    controls: {
      disable: true,
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      // TODO: button to generate new grid
      const [testMatrix] = useState(generateTestMatrix({ placePlayer: false }));
      const [tileColorOverrides, setTileColorOverrides] = useState({
        currentAlgTile: { x: 0, y: 0, color: PROCESSING_TILE_COLOR },
        currentNeighboursTile: {
          x: 0,
          y: 1,
          color: FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
        },
      });
      const { setGraph, graph } = useGridStore();

      useEffect(() => {
        const controller = new AbortController();
        runGraphGeneration({
          matrix: testMatrix,
          setTileColorOverrides,
          setGraph,
          stepInterval: 150,
          signal: controller.signal,
        });
        return () => controller.abort();
      }, [testMatrix]);

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
          ])}
        >
          <div className={clsx(["h-2/3", "w-1/2", "flex", "w-full"])}>
            <Story
              args={{
                matrix: testMatrix,
                tileColorOverride: tileColorOverrides,
              }}
            />
          </div>
          <Drawer
            initialIsOpen
            direction="right"
            showHandle={false}
            contentClassName={clsx(["min-w-1/2"])}
          >
            <GraphNodeToNeigbourList graph={graph} />
          </Drawer>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridToGraph: Story = {
  name: "Convert To Graph (Adjacency List)",
};
