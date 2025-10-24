/**
 * Game Loop Component
 *
 * Tick-based game loop - handles player movement along path at each tick
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DEFAULT_TICK_INTERVAL } from "../../constants";
import { useGameStore } from "../../store";

export function GameLoop() {
  const accumulator = useRef(0);

  useFrame((_state, delta) => {
    accumulator.current += delta * 1000; // Convert to ms

    // Update tick progress (for UI visualization only)
    const progress = Math.min(accumulator.current / DEFAULT_TICK_INTERVAL, 1);
    useGameStore.setState({ tickProgress: progress });

    // Process game logic ONLY at tick boundaries
    if (accumulator.current >= DEFAULT_TICK_INTERVAL) {
      const { incrementTick, movePlayerAlongPath } = useGameStore.getState();
      incrementTick();

      // Move player to next position in path (if path exists)
      movePlayerAlongPath();

      accumulator.current = 0;
    }
  });

  return null; // No visual component
}
