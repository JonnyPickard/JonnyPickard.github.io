import { defineHex, HexOptions, Hex } from "honeycomb-grid";
import { getRandomInt } from "./utils";

// Note: I ended up extending default Hex types at src/types/honeycomb.d.ts to allow for custom properties
// This seemed like the easiest solution as the hc-grid library works in a slightly unusual way for performance reasons

// Reference to the original defineHex function: https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/defineHex.ts

/**
 * Defines a custom CustomHex class with optional configuration options, extending the functionality of the base CustomHex.
 *
 * @param hexOptions - Optional configuration options for the CustomHex.
 * @returns A custom CustomHex class based on the provided options.
 *
 * @remarks
 * This function extends the `defineHex` function from the Honeycomb library to create a CustomHex class
 * with additional properties for traversability and ranged shooting.
 */
export const defineCustomHex = (hexOptions?: Partial<HexOptions>) =>
  class CustomHex extends defineHex(hexOptions) {
    private _isInPath: boolean = false;
    /**
     * Indicates whether a player can cross the tile.
     *
     * @defaultValue `true`
     */
    private _isTraversable: boolean = true;

    /**
     * Indicates whether the tile allows ranged projectiles to pass across it.
     *
     * @defaultValue `true`
     */
    private _allowsRangedShooting: boolean = true;

    /**
     * Seed values used to initialize random properties of the CustomHex.
     *
     * @remarks
     * This seed is utilized to generate random values for certain properties of the CustomHex,
     * providing a basis for variety within the game environment.
     *
     * @defaultValue A random integer between 0 and 5, inclusive.
     */
    private _randomSeeds = [getRandomInt(6), getRandomInt(6)];

    get isInPath() {
      return this._isInPath;
    }

    set isInPath(isPathTile: boolean) {
      this._isInPath = isPathTile;
    }

    /**
     * Gets the randomly generated int seed values of the CustomHex.
     *
     * @returns {number[]} The current seed values.
     */
    get randomSeeds() {
      return this._randomSeeds;
    }

    /**
     * Gets the current traversability status of the tile.
     *
     * @returns The traversability status of the tile.
     */
    get isTraversable() {
      return this._isTraversable;
    }

    /**
     * Sets the traversability status of the tile.
     *
     * @param canTraverse - The new traversability status.
     */
    set isTraversable(canTraverse: boolean) {
      this._isTraversable = canTraverse;
    }

    /**
     * Gets the current ranged shooting status of the tile.
     *
     * @returns The ranged shooting status of the tile.
     */
    get allowsRangedShooting() {
      return this._allowsRangedShooting;
    }

    /**
     * Sets the ranged shooting status of the tile.
     *
     * @param canShootAcross - The new ranged shooting status.
     */
    set allowsRangedShooting(canShootAcross: boolean) {
      this._allowsRangedShooting = canShootAcross;
    }
  } as typeof Hex;
