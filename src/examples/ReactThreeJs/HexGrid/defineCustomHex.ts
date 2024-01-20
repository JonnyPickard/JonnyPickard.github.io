import { defineHex, HexOptions } from "honeycomb-grid";

// Reference to the original defineHex function: https://github.com/flauwekeul/honeycomb/blob/master/src/hex/functions/defineHex.ts

/**
 * Defines a custom HexTile class with optional configuration options, extending the functionality of the base HexTile.
 *
 * @param hexOptions - Optional configuration options for the HexTile.
 * @returns A custom HexTile class based on the provided options.
 *
 * @remarks
 * This function extends the `defineHex` function from the Honeycomb library to create a HexTile class
 * with additional properties for traversability and ranged shooting.
 */
export const defineCustomHex = (hexOptions?: Partial<HexOptions>) =>
  class HexTile extends defineHex(hexOptions) {
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

    // Uncomment the following block if you decide to implement visibility blocking
    // /**
    //  * Indicates whether the tile allows visibility through it.
    //  *
    //  * @defaultValue `true`
    //  */
    // private allowsVisibilityThrough: boolean = true;

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
  };
