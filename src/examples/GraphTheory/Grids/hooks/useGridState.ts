import { useEffect, useState } from "react";
import { PLAYER_START_FILL_COLOR, TARGET_FILL_COLOR } from "../constants";
import type { Coordinates, GridMatrix } from "../GridTypes";
import { bfsShortestPath, dfsPath, generateTestMatrix } from "../utils";

const useGridState = (algorithm: "dfs" | "bfs") => {
  const [originalMatrix, setOriginalMatrix] = useState<GridMatrix | null>(null);
  const [gridVisualisationMatrix, setGridVisualisationMatrix] =
    useState<GridMatrix | null>(null);
  const [nextClickTileType, setNextClickTileType] = useState<
    "start" | "target"
  >("start");
  const [startCoordinates, setStartCoordinates] = useState<Coordinates | null>(
    null,
  );
  const [targetCoordinates, setTargetCoordinates] =
    useState<Coordinates | null>(null);
  const [tileColorOverride, setTileColorOverride] = useState({});
  const [path, setPath] = useState<Coordinates[] | null>([]);
  const [isRunning, setIsRunning] = useState(false);

  const pickPathTile = (tile: Coordinates) => {
    if (
      !gridVisualisationMatrix ||
      gridVisualisationMatrix[tile.y][tile.x] === 1
    )
      return;

    if (nextClickTileType === "start") {
      setTargetCoordinates(null);
      setStartCoordinates(tile);
      setNextClickTileType("target");
    } else if (nextClickTileType === "target") {
      setTargetCoordinates(tile);
      setNextClickTileType("start");
    }
  };

  useEffect(() => {
    const newMatrix = generateTestMatrix({
      placePlayer: false,
      placeTargetTile: false,
    });
    setOriginalMatrix(newMatrix);
    setGridVisualisationMatrix(structuredClone(newMatrix));
  }, []);

  useEffect(() => {
    if ((!startCoordinates && !targetCoordinates) || isRunning) return;

    if (nextClickTileType === "start" && targetCoordinates) {
      setTileColorOverride((prev) => ({
        ...prev,
        targetTile: { ...targetCoordinates, color: TARGET_FILL_COLOR },
      }));
    } else if (nextClickTileType === "target" && startCoordinates) {
      setTileColorOverride({});
      setGridVisualisationMatrix(structuredClone(originalMatrix));
      setTileColorOverride((prev) => ({
        ...prev,
        startTile: { ...startCoordinates, color: PLAYER_START_FILL_COLOR },
      }));
    }
  }, [startCoordinates, targetCoordinates, nextClickTileType]);

  useEffect(() => {
    if (startCoordinates && targetCoordinates && !isRunning && originalMatrix) {
      setIsRunning(true);
      const findPath = algorithm === "dfs" ? dfsPath : bfsShortestPath;
      findPath({
        grid: originalMatrix,
        startCoordinates,
        targetCoordinates,
        setGridVisualisationMatrix,
        stepInterval: 200,
      })
        .then((path) => {
          if (path) console.log("✅ Path found:", path);
          setPath(path);
          setIsRunning(false);
        })
        .catch(() => {
          setIsRunning(false);
        });
    }
  }, [startCoordinates, targetCoordinates]);

  const updateGridVisualisationMatrix = ({
    x,
    y,
    tileIdentifier,
  }: {
    x: number;
    y: number;
    tileIdentifier?: number;
  }) => {
    setGridVisualisationMatrix((prevMatrix) => {
      if (!prevMatrix) return prevMatrix;
      const newMatrix = prevMatrix.map((row) => row.slice());
      if (newMatrix[y][x] === 1) return prevMatrix;
      newMatrix[y][x] = tileIdentifier ?? 5;
      return newMatrix;
    });
  };

  useEffect(() => {
    if (!path || !path.length || nextClickTileType === "target") return;
    path.forEach(({ x, y }) => {
      updateGridVisualisationMatrix({ x, y, tileIdentifier: 4 });
    });
  }, [path]);

  return {
    originalMatrix,
    gridVisualisationMatrix,
    nextClickTileType,
    startCoordinates,
    targetCoordinates,
    tileColorOverride,
    path,
    isRunning,
    pickPathTile,
    updateGridVisualisationMatrix,
  };
};

export default useGridState;
