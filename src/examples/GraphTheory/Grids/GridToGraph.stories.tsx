import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import { useWindowSize } from "usehooks-ts";
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
      const { width = 0 } = useWindowSize();

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
            "flex-col",
            "md:flex-row",
          ])}
        >
          <Story
            args={{
              matrix: testMatrix,
              tileColorOverride: tileColorOverrides,
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
            openDrawerTooltip={"Show Graph"}
            closeDrawerTooltip={"Hide Graph"}
          >
            <>
              <DrawerHeader className={clsx(["p-4", "pb-0"])}>
                <DrawerTitle>Graph - Adjacency List Representation</DrawerTitle>
                <DrawerDescription>
                  This visualization demonstrates how a 2D grid can be converted
                  into a graph representation using an adjacency list. Each cell
                  in the grid is treated as a node, and edges are created
                  between nodes based on their traversable neighbors. The
                  adjacency list shows each node and its directly connected
                  neighbors.
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
                <GraphNodeToNeigbourList graph={graph} />
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

export const GridToGraph: Story = {
  name: "Convert To Graph (Adjacency List)",
};
