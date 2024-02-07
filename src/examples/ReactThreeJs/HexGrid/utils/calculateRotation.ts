import { Hex } from "honeycomb-grid";

import { calculateDirection } from ".";

function calculateRotationDegrees(
  fromDirection: string, // 'NE', 'E', 'SE', 'SW', 'W', 'NW'
  toDirection: string, // 'NE', 'E', 'SE', 'SW', 'W', 'NW'
): number {
  // Define the directions in clockwise order
  const directions = ["SW", "W", "NW", "NE", "E", "SE"];

  // Calculate the indices of the starting and ending directions
  const fromIndex = directions.indexOf(fromDirection);
  const toIndex = directions.indexOf(toDirection);

  // Calculate the number of steps needed to move from fromDirection to toDirection in clockwise and counterclockwise directions
  const stepsClockwise = (toIndex - fromIndex + 6) % 6;
  const stepsCounterclockwise = (fromIndex - toIndex + 6) % 6;

  // Determine the shortest rotation
  const shortestRotationSteps = Math.min(stepsClockwise, stepsCounterclockwise);

  // Calculate the rotation angle (in degrees)
  let angle = shortestRotationSteps * 60;
  // Adjust angle to negative if counterclockwise rotation is shorter
  if (stepsCounterclockwise > stepsClockwise) {
    angle *= -1;
  }

  return angle;
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
  const direction = calculateDirection({ fromHex, toHex });

  if (direction) {
    const degrees = calculateRotationDegrees(startingDirection, direction);

    return { degrees, direction };
  }
  return null;
};
