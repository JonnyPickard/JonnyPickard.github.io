import { dfsPath } from "./dfsPath";

import type { Coordinates, GridMatrix } from "../GridTypes";

interface TestCase {
  grid: GridMatrix;
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
  expectedPath: Coordinates[] | null;
}

const testCases: TestCase[] = [
  // 1️⃣ Simple straight-line path
  {
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    startCoordinates: { x: 0, y: 0 },
    targetCoordinates: { x: 2, y: 0 },
    expectedPath: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },

  // 2️⃣ Path that must navigate around obstacles
  {
    grid: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    startCoordinates: { x: 0, y: 0 },
    targetCoordinates: { x: 2, y: 2 },
    expectedPath: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
  },

  // 3️⃣ No possible path due to walls
  {
    grid: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    startCoordinates: { x: 0, y: 0 },
    targetCoordinates: { x: 2, y: 2 },
    expectedPath: null,
  },

  // 4️⃣ Larger grid with multiple possible paths
  {
    grid: [
      [0, 0, 0, 0],
      [1, 1, 0, 1],
      [0, 0, 0, 0],
      [0, 1, 1, 0],
    ],
    startCoordinates: { x: 0, y: 0 },
    targetCoordinates: { x: 3, y: 2 },
    expectedPath: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
  },
];

testCases.forEach(
  ({ grid, startCoordinates, targetCoordinates, expectedPath }, index) => {
    return test(`DFS Test Case: ${index + 1}`, async () => {
      const result = await dfsPath({
        grid,
        startCoordinates,
        targetCoordinates,
        stepInterval: 0,
      });
      expect(result).toEqual(expectedPath);
    });
  },
);
