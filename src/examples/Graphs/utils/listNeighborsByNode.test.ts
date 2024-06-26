import { listNeighborsByNode } from "./listNeighborsByNode";
import type { GraphNode } from "./types";

describe("listNeighborsByNode", () => {
  test("should find neighbors for a single node", () => {
    const nodes: GraphNode[] = [[0, 0]];
    const result = listNeighborsByNode(nodes);
    expect(result.size).toBe(0);
  });

  test("should find all neighbors for a node", () => {
    const nodes: GraphNode[] = [
      [0, 0],
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const result = listNeighborsByNode(nodes);
    expect(result.size).toBe(5);
    expect(result.get(nodes[0])).toEqual(
      expect.arrayContaining([
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]),
    );
  });

  test("should find no neighbors if none exist", () => {
    const nodes: GraphNode[] = [
      [0, 0],
      [2, 2],
    ];
    const result = listNeighborsByNode(nodes);
    expect(result.size).toBe(0);
  });

  test("should correctly identify neighbors in a larger grid", () => {
    const nodes: GraphNode[] = [
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
    const result = listNeighborsByNode(nodes);

    expect(result.get(nodes[4])).toEqual(
      expect.arrayContaining([
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1],
      ]),
    );

    expect(result.get(nodes[0])).toEqual(
      expect.arrayContaining([
        [0, 1],
        [1, 0],
      ]),
    );

    expect(result.get(nodes[nodes.length - 1])).toEqual(
      expect.arrayContaining([
        [1, 2],
        [2, 1],
      ]),
    );
  });

  test("should handle nodes with no neighbors gracefully", () => {
    const nodes: GraphNode[] = [
      [0, 0],
      [10, 10],
    ];
    const result = listNeighborsByNode(nodes);
    expect(result.size).toBe(0);
  });
});
