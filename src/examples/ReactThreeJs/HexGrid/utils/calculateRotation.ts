import { Hex } from "honeycomb-grid";

import { calculateDirection } from ".";

/**
 * Calculates the rotation angle needed to rotate from one direction to another on a hexagonal grid.
 * @param fromDirection The starting direction.
 * @param toDirection The ending direction.
 * @returns The rotation angle in degrees.
 */
function calculateRotationAngle(
  fromDirection: string,
  toDirection: string,
): number {
  // Define angles for each edge relative to the starting direction (SW)
  const edgeAngles: { [key: string]: number } = {
    SE: 60,
    E: 120,
    NE: 180,
    SW: 0,
    W: 300,
    NW: 240,
  };

  // Get the angles for the starting and ending directions
  const fromAngle = edgeAngles[fromDirection];
  const toAngle = edgeAngles[toDirection];

  // Calculate the difference in angles
  let rotation = toAngle - fromAngle;

  // Ensure the angle is within the range of 0 to 360 degrees
  if (rotation < 0) {
    rotation += 360;
  }

  // Determine the direction of rotation
  const direction = rotation > 180 ? 1 : -1;

  // Convert the rotation to be within +/- 180 degrees
  rotation = rotation > 180 ? 360 - rotation : rotation;

  // Apply the direction to the rotation
  if (rotation !== 180 && rotation !== 0) {
    rotation *= direction;
  }

  return rotation;
}

/**
 * Options for calculating the rotation angle between two hexagons on a hexagonal grid.
 */
interface calculateRotationOptions {
  /**
   * The starting hexagon.
   */
  fromHex: Hex;
  /**
   * The ending hexagon.
   */
  toHex: Hex;
  /**
   * The direction the character is initially facing. Defaults to "SW" (southwest).
   * @note Just what I chose for my game
   */
  startingDirection?: string;
}

/**
 * Calculates the rotation angle needed to rotate from one hexagon to another on a hexagonal grid.
 * @param options Options for calculating the rotation angle.
 * @returns The rotation angle in degrees.
 * @note Currently only works for POINTY orientation.
 */
export const calculateRotation = ({
  fromHex,
  toHex,
  startingDirection = "SW",
}: calculateRotationOptions) => {
  const toDirection = calculateDirection({ fromHex, toHex });
  if (toDirection) {
    const rotation = calculateRotationAngle(startingDirection, toDirection);
    return rotation;
  }
  return null;
};
