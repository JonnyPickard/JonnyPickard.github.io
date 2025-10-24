/**
 * Tick UI Overlay Component
 *
 * Displays tick number and progress bar (controlled by UIControlPanel)
 */
import { useGameStore } from "../../store";

export function TickUI() {
  const tickNumber = useGameStore((state) => state.tickNumber);
  const tickProgress = useGameStore((state) => state.tickProgress);
  const tickUiVisible = useGameStore((state) => state.tickUiVisible);

  // Don't render if not visible
  if (!tickUiVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "10px 20px",
        borderRadius: 8,
        fontFamily: "monospace",
        zIndex: 1,
      }}
    >
      <div>Tick: {tickNumber}</div>
      <div style={{ marginTop: 8 }}>
        <div
          style={{
            width: 200,
            height: 10,
            background: "#333",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${tickProgress * 100}%`,
              height: "100%",
              background: "#4CAF50",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
