import { Hex } from "honeycomb-grid";
import * as THREE from "three";
import findkey from "lodash.findkey";

enum DIRECTIONS {
  NE = "NE",
  E = "E",
  SE = "SE",
  SW = "SW",
  W = "W",
  NW = "NW",
}

// Value when you subtract neighboring axial destination coords from origin coords
const DIRECTIONS_POINTY = {
  NE: { q: 1, r: -1 },
  E: { q: 1, r: 0 },
  SE: { q: 0, r: 1 },
  SW: { q: -1, r: 1 },
  W: { q: -1, r: 0 },
  NW: { q: 0, r: -1 },
};

enum ROTATION_KEYS {
  NE = 1,
  E = 2,
  SE = 3,
  SW = 4,
  W = 5,
  NW = 6,
}

/* 
  start NE = 1
  end E = 2
 */

const getDirection = ({ q, r }: { q: number; r: number }) => {
  const direction = findkey(
    DIRECTIONS_POINTY,
    (o) => q === o.q && r === o.r,
  ) as keyof typeof DIRECTIONS;

  return direction ? DIRECTIONS[direction] : null;
};

interface calculateRotationOptions {
  fromHex: Hex;
  toHex: Hex;
  startAngle?: THREE.Euler;
}

export const calculateNeighborDirection = ({
  fromHex,
  toHex,
}: calculateRotationOptions) => {
  console.log("subtraction:", {
    q: toHex.q - fromHex.q,
    r: toHex.r - fromHex.r,
  });
  const subtractedCoords = { q: toHex.q - fromHex.q, r: toHex.r - fromHex.r };

  const direction = getDirection(subtractedCoords);
  if (!direction) {
    console.warn(
      "[calculateNeighborDirection]: Direction not found. Check that hexs are neighbors.",
    );
    return null;
  }
  return direction;
};
