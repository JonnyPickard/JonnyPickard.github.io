import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Coordinates } from "./GridTypes";
import type { Graph } from "./utils/gridToGraphGeneratorFN";

interface GridState {
  playerLocation: Coordinates;
  playerStart: Coordinates | null;
  target: Coordinates | null;
  playerPath: Coordinates[] | null;
  graph: Graph;
  setPlayerLocation: (location: Coordinates) => void;
  setPlayerStart: (start: Coordinates | null) => void;
  setTarget: (target: Coordinates | null) => void;
  setPlayerPath: (path: Coordinates[] | null) => void;
  setGraph: (graph: Graph) => void;
}

export const useGridStore = create<GridState>()(
  devtools(
    (set) => ({
      playerLocation: { x: 0, y: 0 },
      playerStart: null,
      target: null,
      playerPath: null,
      graph: {},
      setPlayerLocation: (location) => set({ playerLocation: location }),
      setPlayerStart: (start) => set({ playerStart: start }),
      setTarget: (target) => set({ target: target }),
      setPlayerPath: (path) => set({ playerPath: path }),
      setGraph: (graph) => set({ graph: graph }),
    }),
    { name: "gridStore" },
  ),
);
