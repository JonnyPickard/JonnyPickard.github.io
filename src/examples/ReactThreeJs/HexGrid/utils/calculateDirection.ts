import { Hex } from "honeycomb-grid";
import findkey from "lodash.findkey";

/**
 * Represents cardinal and intercardinal directions on a hexagonal grid.
 */
enum DIRECTIONS {
  NE = "NE",
  E = "E",
  SE = "SE",
  SW = "SW",
  W = "W",
  NW = "NW",
}

/**
 * Represents axial directions for pointy-top hexagonal orientation.
 */
const DIRECTIONS_POINTY: { [key in DIRECTIONS]: { q: number; r: number } } = {
  NE: { q: 1, r: -1 },
  E: { q: 1, r: 0 },
  SE: { q: 0, r: 1 },
  SW: { q: -1, r: 1 },
  W: { q: -1, r: 0 },
  NW: { q: 0, r: -1 },
};

/**
 * Retrieves the direction based on the axial coordinates.
 * @param q The q coordinate.
 * @param r The r coordinate.
 * @returns The direction as a string, or null if direction is not found.
 */
const getDirection = ({ q, r }: { q: number; r: number }) => {
  const direction = findkey(
    DIRECTIONS_POINTY,
    (o) => q === o.q && r === o.r,
  ) as keyof typeof DIRECTIONS;

  return direction ? DIRECTIONS[direction] : null;
};

/**
 * Options for calculating the direction between two hexagons on a hexagonal grid.
 */
interface calculateDirectionOptions {
  /**
   * The starting hexagon.
   */
  fromHex: Hex;
  /**
   * The ending hexagon.
   */
  toHex: Hex;
}

/**
 * Calculates the direction from one hexagon to another on a hexagonal grid.
 * @param options Options for calculating the direction.
 * @returns The direction as a string, or null if direction cannot be determined.
 */
export const calculateDirection = ({
  fromHex,
  toHex,
}: calculateDirectionOptions) => {
  const subtractedCoords = { q: toHex.q - fromHex.q, r: toHex.r - fromHex.r };
  const direction = getDirection(subtractedCoords);
  if (!direction) {
    console.warn(
      "[calculateDirection]: Direction not found. Check that hexs are valid & orientated correctly.",
    );
    return null;
  }
  return direction;
};
