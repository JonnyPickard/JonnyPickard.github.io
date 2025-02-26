import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import { Grid, gridToGraph, generateTestMatrix } from ".";
import { FIND_NEIGHBOURS_CURRENT_TILE_COLOR } from "./constants";
const ALGORITH_CURRENT_TILE_COLOR = "fill-lime-500";
// import { useTimer } from "../../../hooks";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/GridToGraph",
  parameters: {
    layout: "fullscreen",
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

      useEffect(() => {
        gridToGraph(
          testMatrix,
          setTileColorOverrides,
          setCheckingNieghbourCoordinates,
        );
      }, [testMatrix]);

      return (
        <div
          className={clsx(
            "h-screen",
            "bg-slate-900",
            "flex items-center",
            "justify-center",
          )}
        >
          <div className={clsx("flex flex-col")}>
            <ul className="flex flex-row">
              <li>
                <p className="text-white">
                  {checkingNieghbourCoordinates[0]},{" "}
                </p>
              </li>
              <li>
                <p className="text-white">{checkingNieghbourCoordinates[1]}</p>
              </li>
            </ul>
            <Story
              args={{
                matrix: testMatrix,
                tileColorOverride: tileColorOverrides,
              }}
            />
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
