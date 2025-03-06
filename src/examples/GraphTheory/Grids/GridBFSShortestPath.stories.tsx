import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import { useEffect, useState } from "react";

import type { Coordinates } from ".";
import { Grid, bfsShortestPath, generateTestMatrix } from ".";

import { GraphKey } from "../GraphKey";
import {
  BG_PLAYER_PATH_COLOR,
  BG_PLAYER_START_COLOR,
  BG_PROCESSING_TILE_COLOR,
  BG_TARGET_COLOR,
  BG_TERRAIN_COLOR,
  BG_VISITED_TILE_COLOR,
  PLAYER_START_FILL_COLOR,
  TARGET_FILL_COLOR,
} from "./constants";
import type { GridMatrix } from "./GridTypes";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Examples/Grids & Graphs/Breadth First Search",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const [gridVisualisationMatrix, setGridVisualisationMatrix] =
        useState<GridMatrix | null>(null);
      const [originalMatrix, setOriginalMatrix] = useState<GridMatrix | null>(
        null,
      );

      const [nextClickTileType, setNextClickTileType] = useState<
        "start" | "target"
      >("start");
      const [startCoordinates, setStartCoordinates] =
        useState<Coordinates | null>(null);
      const [targetCoordinates, setTargetCoordinates] =
        useState<Coordinates | null>(null);
      const [shortestPath, setShortestPath] = useState<Coordinates[]>([]);

      const [tileColorOverride, setTileColorOverride] = useState({});
      const [isRunning, setIsRunning] = useState(false);

      const pickPathTile = (tile: Coordinates) => {
        // If wall tile you can't pick it
        if (
          !gridVisualisationMatrix ||
          gridVisualisationMatrix[tile.y][tile.x] === 1
        )
          return;

        if (nextClickTileType === "start") {
          setTargetCoordinates(() => null);
          setStartCoordinates(() => tile);
          // toggle so next click sets target
          setNextClickTileType(() => "target");
        }

        if (nextClickTileType === "target") {
          setTargetCoordinates(() => tile);
          // toggle so next click sets start
          setNextClickTileType(() => "start");
        }
      };

      useEffect(() => {
        const newMatrix = generateTestMatrix({
          placePlayer: false,
          placeTargetTile: false,
        });

        setOriginalMatrix(() => newMatrix);
        setGridVisualisationMatrix(() => structuredClone(newMatrix));
      }, []);

      // Handle state updates
      // Handle setting the start/ target coordinates after user clicks
      useEffect(() => {
        if ((!startCoordinates && !targetCoordinates) || isRunning) return;

        // Target tile was clicked
        if (nextClickTileType === "start" && targetCoordinates) {
          setTileColorOverride((prev) => ({
            ...prev,
            targetTile: {
              ...targetCoordinates,
              color: TARGET_FILL_COLOR,
            },
          }));
        }

        if (nextClickTileType === "target" && startCoordinates) {
          // Start tile was clicked
          // Reset override colors colors
          setTileColorOverride(() => ({}));

          // Reset to original UI colors to start picking tiles again
          setGridVisualisationMatrix(() => structuredClone(originalMatrix));

          setTileColorOverride((prev) => ({
            ...prev,
            startTile: {
              ...startCoordinates,
              color: PLAYER_START_FILL_COLOR,
            },
          }));
        }
      }, [startCoordinates, targetCoordinates, nextClickTileType]);

      useEffect(() => {
        if (
          startCoordinates &&
          targetCoordinates &&
          !isRunning &&
          originalMatrix
        ) {
          setIsRunning(() => true);
          if (gridVisualisationMatrix) {
            console.log("startCoodinates", startCoordinates);
            bfsShortestPath({
              grid: originalMatrix,
              startCoordinates,
              targetCoordinates,
              setGridVisualisationMatrix,
              stepInterval: 200,
            })
              .then((path) => {
                if (path) console.log("✅ Path found:", path);

                setShortestPath(path || []);
                setIsRunning(false);
              })
              .catch(() => {
                setIsRunning(false);
              });
          }
        }
      }, [startCoordinates, targetCoordinates]);

      type UpdateGridVisualisationMatrix = (args: {
        x: number;
        y: number;
        tileIdentifier?: number;
      }) => void;

      const updateGridVisualisationMatrix: UpdateGridVisualisationMatrix = ({
        x,
        y,
        tileIdentifier /* 0 - 5 */,
      }) => {
        setGridVisualisationMatrix((prevMatrix) => {
          if (prevMatrix === null) return prevMatrix;
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
          updateGridVisualisationMatrix({ x, y, tileIdentifier: 4 });
        });
      }, [shortestPath]);

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

export const GridBFSShortestPath: Story = {
  name: "Breadth First Search",
};
