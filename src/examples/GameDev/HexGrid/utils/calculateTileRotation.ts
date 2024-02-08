import * as THREE from "three";

/**
 * Randomizes hex tile rotation for more interesting terrain tiles.
 *
 * @param {number} seedA - The first random seed for hex tile rotation.
 * @param {number} seedB - The second random seed for hex tile rotation.
 *
 * @returns {THREE.Euler} Euler angles representing the calculated rotation for hexagonal tiles.
 *
 * @remarks
 * This function calculates the rotation in Euler angles for hexagonal tiles based on
 * two random seeds. The first seed (seedA) is typically used for random textures,
 * while the second seed (seedB) is used for random rotations. The calculated rotation
 * is in increments of 60 degrees to maintain alignment with pointy edges and flat edges
 * of the hexagon.
 *
 * @example
 * ```typescript
 * const seedA = 3;
 * const seedB = 1;
 * const rotation = calculateTileRotation(seedA, seedB);
 *
 * rotation === 120
 * ```
 */
export const calculateTileRotation = (
  seedA: number,
  seedB: number,
): THREE.Euler => {
  // Calculate the average of two seeds
  const averageOf2Seeds = Math.floor((seedA + 1 + seedB + 1) / 2);

  // Calculate the rotation degrees based on the average of seeds
  const rotationDegrees = averageOf2Seeds * 60;

  // Return Euler angles representing the calculated rotation
  return new THREE.Euler(0, THREE.MathUtils.degToRad(rotationDegrees), 0);
};
