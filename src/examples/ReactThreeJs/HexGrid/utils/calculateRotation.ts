import {
  Hex,
  defineHex,
  Orientation,
  Grid,
  rectangle,
  createHexOrigin,
} from "honeycomb-grid";
import * as THREE from "three";

import { calculateNeighborDirection } from ".";

interface Vector {
  x: number;
  y: number;
}

const directions: Record<string, Vector> = {
  NE: { x: Math.sqrt(3) / 2, y: 0.5 },
  E: { x: 1, y: 0 },
  SE: { x: Math.sqrt(3) / 2, y: -0.5 },
  SW: { x: -Math.sqrt(3) / 2, y: -0.5 },
  W: { x: -1, y: 0 },
  NW: { x: -Math.sqrt(3) / 2, y: 0.5 },
};

interface calculateRotationOptions {
  fromHex: Hex;
  toHex: Hex;
  startAngle?: THREE.Euler;
}

// NOTE: currently only works for POINTY orientation.
export const calculateRotation = ({
  fromHex,
  toHex,
}: calculateRotationOptions) => {
  console.log("fromHex:", { q: fromHex.q, r: fromHex.r });
  console.log("toHex:", { q: toHex.q, r: toHex.r });
  const direction = calculateNeighborDirection({ fromHex, toHex });
  console.log(direction);
};
