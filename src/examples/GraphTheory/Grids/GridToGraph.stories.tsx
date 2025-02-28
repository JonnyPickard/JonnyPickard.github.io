import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import { Grid, generateTestMatrix, Graph, runGraphGeneration } from ".";
import { FIND_NEIGHBOURS_CURRENT_TILE_COLOR } from "./constants";
import { GraphNodeToNodeList } from "../MarkdownComponents";

const ALGORITH_CURRENT_TILE_COLOR = "fill-lime-500";

// import { AlgorithmStepList } from "./AlgorithmStepList";
// import { useTimer } from "../../../hooks";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/Grid To Graph",
  parameters: {
    layout: "center",
  },
  decorators: [
    (Story) => {
      // TODO: button to generate new grid
      const [testMatrix, setTestMatrix] = useState(generateTestMatrix());
      const [tileColorOverrides, setTileColorOverrides] = useState({
        currentAlgTile: { x: 0, y: 0, color: ALGORITH_CURRENT_TILE_COLOR },
        currentNeighboursTile: {
          x: 0,
          y: 1,
          color: FIND_NEIGHBOURS_CURRENT_TILE_COLOR,
        },
      });
      const [graphStep, setGraphStep] = useState<Graph>({});

      useEffect(() => {
        // gridToGraph(testMatrix, setTileColorOverrides, setGraphStep);
        runGraphGeneration(testMatrix, setTileColorOverrides, setGraphStep);
      }, [testMatrix]);

      return (
        <div
          className={clsx([
            "h-screen",
            "mh-full",
            "w-screen",
            "mw-full",
            "bg-slate-900",
            "flex",
            "gap-4",
            "p-4",
            // "place-items-center",
            "overflow-hidden",
          ])}
        >
          <Story
            args={{
              matrix: testMatrix,
              tileColorOverride: tileColorOverrides,
            }}
          />
          <div className={clsx(["overflow-scroll", "w-full"])}>
            <GraphNodeToNodeList graph={graphStep} />
          </div>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridToGraph: Story = {};
