import type { NullableOffsetCoordinates } from "../types";

/**
 * isTile
 * Compare coordinates of tileA and tileB to check if they both reference the same grid position
 *
 * @param {NullableOffsetCoordinates} tileA
 * @param {NullableOffsetCoordinates} tileB
 * @return {*}
 */
export const isTile = (
  tileA: NullableOffsetCoordinates,
  tileB: NullableOffsetCoordinates,
) => tileA.col === tileB.col && tileA.row === tileB.row;
