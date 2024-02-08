import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { create } from "zustand";
import { calculateRotation, DIRECTION } from "./utils";
import { Hex } from "honeycomb-grid";

import { logger } from "./utils";

interface PlayerState {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  playerRotation: {
    direction: DIRECTION;
    degrees: number;
  };
  setPlayerRotation: (rotationOptions: { fromHex: Hex; toHex: Hex }) => void;
}

export const usePlayerStore = create<PlayerState>()(
  logger(
    devtools(
      (set) => ({
        isRunning: false,
        setIsRunning: (isRunning) => set(() => ({ isRunning })),
        playerRotation: {
          direction: "SW",
          degrees: 0,
        },
        setPlayerRotation: ({ fromHex, toHex }) =>
          set((state) => {
            const rotation = calculateRotation({
              fromHex,
              toHex,
              startingDirection: state.playerRotation.direction,
            });

            if (rotation) {
              return {
                playerRotation: {
                  direction: rotation.direction,
                  // NOTE: This will keep appending to the rotation
                  // and will give a gradually larger or smaller number
                  // based on direction of rotation.
                  // Might be a better way to do this or maybe even just apply new rotation scale.
                  // Ie back at starting direction 'SW' reset rotation to 0?
                  degrees: state.playerRotation.degrees + rotation.degrees,
                },
              };
            }

            return { playerRotation: state.playerRotation };
          }),
      }),
      {
        name: "player-storage",
      },
    ),
  ),
);
