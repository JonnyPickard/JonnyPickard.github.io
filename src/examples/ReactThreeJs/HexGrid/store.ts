import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { create } from "zustand";
import { calculateRotation, DIRECTION } from "./utils";
import { Hex } from "honeycomb-grid";

import { logger } from "./utils";

/**
 * Represents the state of the player.
 */
interface PlayerState {
  /** Indicates whether the player is currently running. */
  isRunning: boolean;
  /** Sets the running state of the player. */
  setIsRunning: (isRunning: boolean) => void;
  /** Contains information about the player's rotation. */
  playerRotation: {
    /** The current direction the player is facing. */
    direction: DIRECTION;
    /** The total rotation angle in degrees. */
    degrees: number;
  };
  /**
   * Sets the player's rotation based on the provided hexagon coordinates.
   * @param rotationOptions - The options for calculating the rotation.
   */
  setPlayerRotation: (rotationOptions: { fromHex: Hex; toHex: Hex }) => void;
}

/** Creates a store for managing player state using Zustand. */
export const usePlayerStore = create<PlayerState>()(
  logger(
    devtools(
      (set) => ({
        isRunning: false,
        setIsRunning: (isRunning) => set(() => ({ isRunning })),
        playerRotation: {
          /**
           * Default direction is SW but this should be set as the hex edge the
           * character mesh is facing.
           *
           * @note this rotation is only set up to work with POINTY top orientated hexagons.
           * */
          direction: "SW",
          degrees: 0, // Initial rotation angle is 0 degrees as you're facing the direction.
        },
        setPlayerRotation: ({ fromHex, toHex }) =>
          set((state) => {
            const rotation = calculateRotation({
              fromHex,
              toHex,
              initiallyFacing: state.playerRotation.direction,
            });

            if (rotation) {
              return {
                playerRotation: {
                  direction: rotation.direction,
                  // NOTE: This will keep appending to the rotation
                  // and will give a gradually larger or smaller number
                  // based on direction of rotation.
                  //
                  // It might be better to apply/ reset new rotation scale.
                  // Ie back at starting direction 'SW' reset rotation to 0?
                  //
                  // Although this is useful if you need to translate from
                  // startingRotation -> newRotation
                  degrees: state.playerRotation.degrees + rotation.degrees,
                },
              };
            }

            return { playerRotation: state.playerRotation };
          }),
      }),
      {
        name: "player",
      },
    ),
  ),
);
