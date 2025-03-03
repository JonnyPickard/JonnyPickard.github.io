import { Coordinates } from "../GridTypes";

import { bfsShortestPath } from "./bfsShortestPath";

interface TestCase {
  grid: number[][];
  startCoordinates: Coordinates;
  targetCoordinates: Coordinates;
  expectedPath: Coordinates[] | null;
}

const testCases: TestCase[] = [
  {
    // ✅ Standard shortest path test
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
  {
    // ✅ Handles paths correctly around obstacles
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
  {
    // ✅ No path exists (completely blocked)
    grid: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    startCoordinates: { x: 0, y: 0 },
    targetCoordinates: { x: 2, y: 2 },
    expectedPath: null,
  },
  {
    // ✅ Edge case: Start == Target
    grid: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    startCoordinates: { x: 2, y: 2 },
    targetCoordinates: { x: 2, y: 2 },
    expectedPath: [{ x: 2, y: 2 }],
  },
];

testCases.forEach(
  ({ grid, startCoordinates, targetCoordinates, expectedPath }, index) => {
    test(`Test case ${index + 1}`, () => {
      const result = bfsShortestPath({
        grid,
        startCoordinates,
        targetCoordinates,
      });
      expect(result).toEqual(expectedPath);
    });
  },
);
