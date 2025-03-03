import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useCallback, useEffect, useState } from "react";

import type { Coordinates, Graph } from ".";
import {
  Grid,
  bfsShortestPath,
  generateTestMatrix,
  runSimpleGraphGeneration,
} from ".";
import { GraphNodeToNeigbourList } from "../MarkdownComponents";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/Grid BFS Shortest Path",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const [testMatrix, setTestMatrix] = useState(
        generateTestMatrix({ placePlayer: false, placeDestinationTile: false }),
      );

      const [graph, setGraph] = useState<Graph>({});
      const [tileClickType, setTileClickType] = useState<"start" | "target">(
        "start",
      );
      const [pathStartCoordinates, setPathStartCoordinates] =
        useState<Coordinates>({ x: 0, y: 0 });
      const [pathTargetCoordinates, setPathTargetCoordinates] =
        useState<Coordinates>({ x: 0, y: 0 });

      const pickPathTile = useCallback(
        (tile: Coordinates) => {
          if (tileClickType === "start") {
            setPathStartCoordinates(tile);
            // toggle so next click sets target
            setTileClickType("target");
          }

          if (tileClickType === "target") {
            setPathTargetCoordinates(tile);
            // toggle so next click sets start
            setTileClickType("start");
          }
        },
        [tileClickType],
      );

      type UpdateTestMatrix = (args: {
        x: number;
        y: number;
        tileIdentifier?: number;
      }) => void;

      // Update this with a 5 each graph node checked to show all the checked nodes
      // while path finding
      const updateTestMatrix: UpdateTestMatrix = ({
        x,
        y,
        tileIdentifier /* 0 - 5 */,
      }) => {
        setTestMatrix((prevMatrix) => {
          const newMatrix = prevMatrix.map((row) => row.slice());

          // Don't allow pathing on wall
          if (newMatrix[y][x] === 1) {
            return prevMatrix;
          }

          // 5 = alg processed tile color
          newMatrix[y][x] = tileIdentifier ? tileIdentifier : 5;
          return newMatrix;
        });
      };

      useEffect(() => {
        updateTestMatrix(clickedTileCoordinates);
      }, []);

      useEffect(() => {
        console.log("Matrix", testMatrix);
        runSimpleGraphGeneration({
          matrix: testMatrix,
          setGraph,
        });
      }, [testMatrix]);

      useEffect(() => {
        const shortestPath = bfsShortestPath({
          grid: testMatrix,
          startCoordinates: { x: 0, y: 0 },
          targetCoordinates: { x: 3, y: 3 },
        });
      }, []);

      useEffect(() => {
        console.log("Updated Graph:", graph);
      }, [graph]);

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
                onTileClick: pickPathTile,
                matrix: testMatrix,
              }}
            />
          </div>
          {/* <div className={clsx(["h-2/3", "w-full"])}>
            <GraphNodeToNeigbourList graph={graph} />
          </div> */}
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridBFSShortestPath: Story = {};
