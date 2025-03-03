import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import type { Coordinates } from ".";
import { Grid, bfsShortestPath, generateTestMatrix } from ".";

import { GraphKey } from "../GraphKey";
import {
  BG_PLAYER_PATH_COLOR,
  BG_PLAYER_START_COLOR,
  BG_TARGET_COLOR,
  BG_TERRAIN_COLOR,
  PLAYER_START_FILL_COLOR,
  TARGET_FILL_COLOR,
  TRANSPARENT_FILL_COLOR,
} from "./constants";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/Grid BFS Shortest Path",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const [testMatrix, setTestMatrix] = useState<number[][]>([]);
      const [originalMatrix, setOriginalMatrix] = useState(
        generateTestMatrix({ placePlayer: false, placeTargetTile: false }),
      );

      const [nextClickTileType, setNextClickTileType] = useState<
        "start" | "target"
      >("start");
      const [startCoordinates, setStartCoordinates] =
        useState<Coordinates | null>(null);
      const [targetCoordinates, setTargetCoordinates] =
        useState<Coordinates | null>(null);
      const [shortestPath, setShortestPath] = useState<Coordinates[]>([]);

      const [tileColorOverride, settileColorOverride] = useState({
        startTile: { x: 0, y: 0, color: TRANSPARENT_FILL_COLOR },
        targetTile: {
          x: 0,
          y: 1,
          color: TRANSPARENT_FILL_COLOR,
        },
      });

      const pickPathTile = (tile: Coordinates) => {
        if (nextClickTileType === "start") {
          setStartCoordinates(() => tile);
          // toggle so next click sets target
          setNextClickTileType(() => "target");

          settileColorOverride((prev) => ({
            ...prev,
            startTile: {
              ...tile,
              color: PLAYER_START_FILL_COLOR,
            },
          }));
        }

        if (nextClickTileType === "target") {
          setTargetCoordinates(() => tile);
          // toggle so next click sets start
          setNextClickTileType(() => "start");

          settileColorOverride((prev) => ({
            ...prev,
            targetTile: {
              ...tile,
              color: TARGET_FILL_COLOR,
            },
          }));
        }
      };

      useEffect(() => {
        const originalMatrix = generateTestMatrix({
          placePlayer: false,
          placeTargetTile: false,
        });

        setTestMatrix(structuredClone(originalMatrix));
        setOriginalMatrix(originalMatrix);
      }, []);

      const resetGrid = () => {
        setTestMatrix(() => structuredClone(originalMatrix));
      };

      type UpdateTestMatrix = (args: {
        x: number;
        y: number;
        tileIdentifier?: number;
      }) => void;

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

          // 5 = will be used to demonstrate all processed tiles as the alg steps still WIP though
          // 0 = reset
          newMatrix[y][x] =
            tileIdentifier || tileIdentifier === 0 ? tileIdentifier : 5;
          return newMatrix;
        });
      };

      // Handle setting the start/ target coordinates after user clicks
      useEffect(() => {
        if (!startCoordinates && !targetCoordinates) return;

        if (nextClickTileType === "start" && targetCoordinates) {
          // If start means last tile clicked was target
          const { x, y } = targetCoordinates;

          updateTestMatrix({ x, y, tileIdentifier: 3 });
        }

        if (nextClickTileType === "target" && startCoordinates) {
          // If target means last tile clicked was start
          const { x, y } = startCoordinates;

          // Reset back to original grid UI colors to start picking tiles again
          resetGrid();

          updateTestMatrix({ x, y, tileIdentifier: 2 });
        }
      }, [startCoordinates, targetCoordinates, nextClickTileType]);

      // When coordinates are locked in find/ set path
      useEffect(() => {
        if (startCoordinates && targetCoordinates) {
          const bfsSPath = bfsShortestPath({
            grid: testMatrix,
            startCoordinates,
            targetCoordinates,
          });

          if (bfsSPath) {
            setShortestPath(bfsSPath);
          }
        }
      }, [startCoordinates, targetCoordinates]);

      // Draw path
      useEffect(() => {
        if (
          !shortestPath ||
          !shortestPath.length ||
          nextClickTileType === "target"
        )
          return;
        // Tiles from start to target
        shortestPath.forEach(({ x, y }) => {
          updateTestMatrix({ x, y, tileIdentifier: 4 });
        });
      }, [shortestPath]);

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
            "relative",
          ])}
        >
          <div className={clsx(["h-2/3", "flex", "w-full"])}>
            <Story
              args={{
                onTileClick: pickPathTile,
                matrix: testMatrix,
                tileColorOverride,
              }}
            />
          </div>
          <div className={clsx(["h-2/3", "w-full"])}>
            <GraphKey
              className={clsx(["absolute", "top-2", "right-2"])}
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
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridBFSShortestPath: Story = {};
