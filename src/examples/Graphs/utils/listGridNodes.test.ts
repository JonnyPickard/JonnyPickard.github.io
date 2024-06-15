import { listGridNodes } from "./listGridNodes";

describe("listGridNodes", () => {
  it("should generate an empty grid when rows and columns are 0", () => {
    const result = listGridNodes(0, 0);
    expect(result).toEqual([]);
  });

  it("should generate a grid with one row and one column", () => {
    const result = listGridNodes(1, 1);
    expect(result).toEqual([[0, 0]]);
  });

  it("should generate a grid with multiple rows and one column", () => {
    const result = listGridNodes(3, 1);
    expect(result).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it("should generate a grid with one row and multiple columns", () => {
    const result = listGridNodes(1, 3);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("should generate a grid with multiple rows and columns", () => {
    const result = listGridNodes(2, 2);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
  });

  it("should generate a grid with different number of rows and columns", () => {
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

  it("should generate a large grid correctly", () => {
    const rows = 100;
    const columns = 100;
    const result = listGridNodes(rows, columns);

    expect(result.length).toBe(rows * columns);
    expect(result[0]).toEqual([0, 0]);
    expect(result[rows * columns - 1]).toEqual([rows - 1, columns - 1]);
  });
});
