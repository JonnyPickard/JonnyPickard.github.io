import type { GridMatrix } from "../Grids/GridTypes";
import { listGridNodes } from "./listGridNodes";

describe("listGridNodes", () => {
  test("should list nodes when given one row and one column", () => {
    const result = listGridNodes(1, 1);
    expect(result).toEqual([[0, 0]]);
  });

  test("should list nodes when given multiple rows and one column", () => {
    const result = listGridNodes(3, 1);
    expect(result).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test("should list nodes when given one row and multiple columns", () => {
    const result = listGridNodes(1, 3);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  test("should list nodes when given multiple rows and columns", () => {
    const result = listGridNodes(2, 2);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
  });

  test("should list nodes when given different number of rows and columns", () => {
    const result = listGridNodes(3, 2);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
    ]);
  });

  test("should list nodes for a large grid correctly", () => {
    const rows = 100;
    const columns = 100;
    const result = listGridNodes(rows, columns);

    expect(result.length).toBe(rows * columns);
    expect(result[0]).toEqual([0, 0]);
    expect(result[rows * columns - 1]).toEqual([rows - 1, columns - 1]);
  });

  test("should list all nodes for a 3x3 grid from given matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expectedNodes = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ];

    expect(listGridNodes(0, 0, matrix)).toEqual(expectedNodes);
  });

  test("should list all nodes for a 2x2 grid from given matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const expectedNodes = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];

    expect(listGridNodes(0, 0, matrix)).toEqual(expectedNodes);
  });

  test("should handle an empty matrix", () => {
    const matrix: GridMatrix = [];
    const expectedNodes: number[] = [];

    expect(listGridNodes(0, 0, matrix)).toEqual(expectedNodes);
  });

  test("should handle a matrix with one row and one column", () => {
    const matrix = [[1]];
    const expectedNodes = [[0, 0]];

    expect(listGridNodes(0, 0, matrix)).toEqual(expectedNodes);
  });

  test("should handle zero rows and columns without matrix", () => {
    const rows = 0;
    const columns = 0;
    const expectedNodes: number[] = [];

    expect(listGridNodes(rows, columns)).toEqual(expectedNodes);
  });

  test("should prioritize matrix dimensions over provided rows and columns", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const rows = 5;
    const columns = 5;
    const expectedNodes = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];

    expect(listGridNodes(rows, columns, matrix)).toEqual(expectedNodes);
  });
});
