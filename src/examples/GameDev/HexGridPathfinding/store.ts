/**
 * HexGridPathfinding Store
 *
 * Consolidated Zustand store for hex grid pathfinding example
 * All state management in one place for experimentation and simplicity
 */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ChunkSize } from "./constants";
import { DEFAULT_CHUNK_SIZE } from "./constants";
import type { OffsetCoord } from "./types";
import { astar } from "./utils/pathfinding/astar";

// State interface
type GameState = {
  // Grid configuration
  chunkSize: ChunkSize;

  // Hex selection
  selectedHex: OffsetCoord | null;
  hoveredHex: OffsetCoord | null;

  // Game tick state
  tickNumber: number;
  tickProgress: number; // 0 to 1

  // UI visibility
  tickUiVisible: boolean;
  wireframeVisible: boolean;

  // Player state
  playerPosition: OffsetCoord;
  currentPath: OffsetCoord[] | null;

  // Obstacles
  obstacles: Set<string>; // Set of "col,row" strings
};

// Actions interface
type GameActions = {
  // Grid configuration
  setChunkSize: (size: ChunkSize) => void;

  // Hex selection
  setSelectedHex: (hex: OffsetCoord | null) => void;
  setHoveredHex: (hex: OffsetCoord | null) => void;

  // Game tick actions
  incrementTick: () => void;
  updateTickProgress: (progress: number) => void;

  // UI actions
  toggleUI: () => void;
  toggleWireframe: () => void;

  // Player actions
  setPlayerPosition: (position: OffsetCoord) => void;
  movePlayerAlongPath: () => boolean; // Returns true if move was successful

  // Pathfinding actions
  computePath: (target: OffsetCoord) => void;
  clearPath: () => void;

  // Obstacle actions
  toggleObstacle: (coord: OffsetCoord) => void;
  generateRandomObstacles: (count: number) => void;
  clearObstacles: () => void;
  isObstacle: (coord: OffsetCoord) => boolean;
};

// Combined store type
type GameStore = GameState & GameActions;

// Helper function to get center position for chunk size
function getCenterPosition(chunkSize: ChunkSize): OffsetCoord {
  const center = Math.floor(chunkSize / 2);
  return [center, center];
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      chunkSize: DEFAULT_CHUNK_SIZE,
      selectedHex: null,
      hoveredHex: null,
      tickNumber: 0,
      tickProgress: 0,
      tickUiVisible: false,
      wireframeVisible: true,
      playerPosition: getCenterPosition(DEFAULT_CHUNK_SIZE),
      currentPath: null,
      obstacles: new Set<string>(),

      // Grid configuration actions
      setChunkSize: (size) => {
        // Reset player position to center of new chunk size
        const newPosition = getCenterPosition(size);
        set(
          {
            chunkSize: size,
            playerPosition: newPosition,
            currentPath: null,
            selectedHex: null,
            hoveredHex: null,
            obstacles: new Set<string>(),
          },
          undefined,
          "game/setChunkSize",
        );
      },

      // Hex selection actions
      setSelectedHex: (hex) =>
        set({ selectedHex: hex }, undefined, "game/setSelectedHex"),
      setHoveredHex: (hex) =>
        set({ hoveredHex: hex }, undefined, "game/setHoveredHex"),

      // Game tick actions
      incrementTick: () =>
        set(
          (state) => ({ tickNumber: state.tickNumber + 1 }),
          undefined,
          "game/incrementTick",
        ),

      updateTickProgress: (progress) =>
        set({ tickProgress: progress }, undefined, "game/updateTickProgress"),

      // UI actions
      toggleUI: () =>
        set(
          (state) => ({ tickUiVisible: !state.tickUiVisible }),
          undefined,
          "game/toggleUI",
        ),

      toggleWireframe: () =>
        set(
          (state) => ({ wireframeVisible: !state.wireframeVisible }),
          undefined,
          "game/toggleWireframe",
        ),

      // Player actions
      setPlayerPosition: (position) =>
        set({ playerPosition: position }, undefined, "game/setPlayerPosition"),

      movePlayerAlongPath: () => {
        const { currentPath } = get();
        if (!currentPath || currentPath.length <= 1) {
          set(
            { currentPath: null },
            undefined,
            "game/movePlayerAlongPath/complete",
          );
          return false;
        }

        // Move to next position in path
        const nextPosition = currentPath[1]; // Skip current position (index 0)
        const remainingPath = currentPath.slice(1);

        set(
          {
            playerPosition: nextPosition,
            currentPath: remainingPath.length > 1 ? remainingPath : null,
          },
          undefined,
          "game/movePlayerAlongPath",
        );
        return true;
      },

      // Pathfinding actions
      computePath: (target) => {
        const { playerPosition, obstacles, chunkSize } = get();
        const isBlocked = (coord: OffsetCoord) =>
          obstacles.has(`${coord[0]},${coord[1]}`);

        const path = astar(playerPosition, target, isBlocked, chunkSize);
        set({ currentPath: path }, undefined, "game/computePath");
      },

      clearPath: () => set({ currentPath: null }, undefined, "game/clearPath"),

      // Obstacle actions
      toggleObstacle: (coord) => {
        const key = `${coord[0]},${coord[1]}`;
        const { obstacles } = get();
        const newObstacles = new Set(obstacles);

        if (newObstacles.has(key)) {
          newObstacles.delete(key);
        } else {
          newObstacles.add(key);
        }

        set({ obstacles: newObstacles }, undefined, "game/toggleObstacle");
      },

      generateRandomObstacles: (count) => {
        const { playerPosition, chunkSize } = get();
        const newObstacles = new Set<string>();

        // Generate random obstacles avoiding player position
        let attempts = 0;
        const maxAttempts = count * 3; // Prevent infinite loop

        while (newObstacles.size < count && attempts < maxAttempts) {
          const col = Math.floor(Math.random() * chunkSize);
          const row = Math.floor(Math.random() * chunkSize);
          const key = `${col},${row}`;

          // Don't place obstacle on player position
          if (col === playerPosition[0] && row === playerPosition[1]) {
            attempts++;
            continue;
          }

          newObstacles.add(key);
          attempts++;
        }

        set(
          { obstacles: newObstacles },
          undefined,
          "game/generateRandomObstacles",
        );
      },

      clearObstacles: () => {
        set({ obstacles: new Set<string>() }, undefined, "game/clearObstacles");
      },

      isObstacle: (coord) => {
        const { obstacles } = get();
        return obstacles.has(`${coord[0]},${coord[1]}`);
      },
    }),
    { name: "HexGridPathfindingStore" },
  ),
);

// Selectors for convenience
export const selectPlayerPosition = (state: GameStore) => state.playerPosition;
export const selectCurrentPath = (state: GameStore) => state.currentPath;
export const selectObstacles = (state: GameStore) => state.obstacles;
export const selectChunkSize = (state: GameStore) => state.chunkSize;
