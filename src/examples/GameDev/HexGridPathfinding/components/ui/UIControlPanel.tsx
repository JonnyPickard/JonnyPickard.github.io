/**
 * UI Control Panel Component
 *
 * Centralized UI controls following SOLID principles:
 * - SRP: Each toggle button has single responsibility
 * - OCP: Easy to extend with new controls
 * - ISP: Uses Zustand selectors for efficient re-renders
 * - DRY: Reusable ToggleButton component
 *
 * Local-only implementation (no server calls)
 */
import { useGameStore } from "../../store";
import { CHUNK_SIZE_OPTIONS, TILES_PER_TICK_OPTIONS } from "../../constants";

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Reusable Toggle Button (SRP)
 */
function ToggleButton({ label, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 3,
        padding: "4px 8px",
        cursor: "pointer",
        fontFamily: "monospace",
        fontSize: 11,
        marginBottom: 4,
        width: "100%",
        textAlign: "left",
      }}
    >
      {isActive ? "Hide" : "Show"} {label}
    </button>
  );
}

/**
 * Action Button Component (for non-toggle actions)
 */
interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

function ActionButton({ label, onClick, color = "rgba(0, 0, 0, 0.7)" }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 3,
        padding: "4px 8px",
        cursor: "pointer",
        fontFamily: "monospace",
        fontSize: 11,
        marginBottom: 4,
        width: "100%",
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}

/**
 * UI Control Panel - Centralized toggle controls
 */
export function UIControlPanel() {
  const tickUiVisible = useGameStore((state) => state.tickUiVisible);
  const wireframeVisible = useGameStore((state) => state.wireframeVisible);
  const obstacleCount = useGameStore((state) => state.obstacles.size);
  const chunkSize = useGameStore((state) => state.chunkSize);
  const tilesPerTick = useGameStore((state) => state.tilesPerTick);

  const toggleUI = useGameStore((state) => state.toggleUI);
  const toggleWireframe = useGameStore((state) => state.toggleWireframe);
  const setChunkSize = useGameStore((state) => state.setChunkSize);
  const setTilesPerTick = useGameStore((state) => state.setTilesPerTick);
  const generateRandomObstacles = useGameStore((state) => state.generateRandomObstacles);
  const clearObstacles = useGameStore((state) => state.clearObstacles);

  const maxObstacles = chunkSize * chunkSize;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        minWidth: 160,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        borderRadius: 6,
        padding: 8,
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Display toggles */}
      <ToggleButton label="Tick UI" isActive={tickUiVisible} onClick={toggleUI} />
      <ToggleButton label="Wireframe" isActive={wireframeVisible} onClick={toggleWireframe} />

      {/* Grid size selector */}
      <div
        style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: 10,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          Grid Size: {chunkSize}×{chunkSize}
        </div>
        {CHUNK_SIZE_OPTIONS.map((size) => (
          <ActionButton
            key={size}
            label={`Set ${size}×${size}`}
            onClick={() => setChunkSize(size)}
            color={
              size === chunkSize ? "rgba(33, 150, 243, 0.7)" : "rgba(0, 0, 0, 0.7)"
            }
          />
        ))}
      </div>

      {/* Movement speed selector */}
      <div
        style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: 10,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          Movement Speed: {tilesPerTick}x
        </div>
        {TILES_PER_TICK_OPTIONS.map((tpt) => (
          <ActionButton
            key={tpt}
            label={`${tpt}x ${tpt === 1 ? "Walk" : tpt === 2 ? "Run" : "Sprint"}`}
            onClick={() => setTilesPerTick(tpt)}
            color={
              tpt === tilesPerTick
                ? "rgba(76, 175, 80, 0.7)"
                : "rgba(0, 0, 0, 0.7)"
            }
          />
        ))}
      </div>

      {/* Obstacle controls - Local only */}
      <div
        style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: 10,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          Obstacles: {obstacleCount} ({((obstacleCount / maxObstacles) * 100).toFixed(1)}%)
        </div>

        <ActionButton
          label={`Generate 10% (~${Math.floor(maxObstacles * 0.1)})`}
          onClick={() => generateRandomObstacles(Math.floor(maxObstacles * 0.1))}
          color="rgba(76, 175, 80, 0.7)"
        />

        <ActionButton
          label={`Generate 20% (~${Math.floor(maxObstacles * 0.2)})`}
          onClick={() => generateRandomObstacles(Math.floor(maxObstacles * 0.2))}
          color="rgba(139, 195, 74, 0.7)"
        />

        <ActionButton
          label="Clear All Obstacles"
          onClick={clearObstacles}
          color="rgba(244, 67, 54, 0.7)"
        />
      </div>
    </div>
  );
}
