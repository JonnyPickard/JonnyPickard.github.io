import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import { Grid, gridToGraph, generateTestMatrix, Graph } from ".";
import { FIND_NEIGHBOURS_CURRENT_TILE_COLOR } from "./constants";
import { AlgorithmStepList } from "./AlgorithmStepList";
import { GraphNodeToNodeList } from "../MarkdownComponents";

const ALGORITH_CURRENT_TILE_COLOR = "fill-lime-500";
// import { useTimer } from "../../../hooks";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/GridToGraph",
  parameters: {
    layout: "center",
  },
  decorators: [
    (Story) => {
      const [testMatrix, setTestMatrix] = useState(generateTestMatrix());
      const [checkingNieghbourCoordinates, setCheckingNieghbourCoordinates] =
        useState([0, 0]);
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
        gridToGraph(
          testMatrix,
          setTileColorOverrides,
          setCheckingNieghbourCoordinates,
          setGraphStep,
        );
      }, [testMatrix]);

      return (
        <div
          className={clsx([
            "h-screen",
            "w-screen",
            "bg-slate-900",
            "flex",
            "place-items-center",
            "overflow-hidden",
          ])}
        >
          <div
            className={clsx([
              "flex",
              "flex-row",
              "justify-center",
              "items-center",
              "overflow-scroll",
              "h-full",
              "w-full",
            ])}
          >
            <div
              className={clsx([
                "flex",
                "align-center",
                "overflow-scroll",
                "gap-4",
                "w-full",
              ])}
            >
              <div className={clsx(["flex", "align-center", "justify-center"])}>
                <Story
                  args={{
                    matrix: testMatrix,
                    tileColorOverride: tileColorOverrides,
                  }}
                />
              </div>
              <div className={clsx(["flex-row", "overflow-scroll"])}>
                <GraphNodeToNodeList graph={graphStep} />
              </div>
            </div>
            {/* <AlgorithmStepList
              currentTile={tileColorOverrides.currentAlgTile}
              graph={graphStep}
            /> */}
          </div>
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

const defaultMatrix = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 2],
  [0, 1, 0, 0],
];

export const GridToGraph: Story = {
  args: {
    matrix: defaultMatrix,
  },
};
