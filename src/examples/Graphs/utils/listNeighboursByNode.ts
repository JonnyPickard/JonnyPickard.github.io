/**
 * Represents a node in the graph as a coordinate pair.
 */
type GraphNode = number[];

/**
 * Represents the neighbors of a node as an array of coordinate pairs.
 */
type Neighbors = number[][];

/**
 * Given an array of nodes represented by coordinate pairs, this function calculates
 * the neighboring nodes for each node and returns a map where the keys are nodes
 * and the values are arrays of their neighboring nodes.
 *
 * A neighboring node is defined as a node that is horizontally or vertically adjacent
 * to the current node.
 *
 * @param nodes - An array of nodes, where each node is represented as a coordinate pair [x, y].
 * @returns A Map where each key is a node (represented as a coordinate pair [x, y]),
 * and each value is an array of neighboring nodes.
 *
 * @example
 * ```typescript
 * const nodes = [
 *   [0, 0],
 *   [1, 0],
 *   [0, 1],
 *   [-1, 0],
 *   [0, -1]
 * ];
 *
 * // result will be a Map with the nodes as keys
 * // and corresponding values representing their neighbors eg:
 * // [ 0, 0 ] => [ [ 1, 0 ], [ 0, 1 ], [ -1, 0 ], [ 0, -1 ] ]
 * const result = listNeighboursByNode(nodes);
 * ```
 */
export const listNeighboursByNode = (
  nodes: number[][],
): Map<GraphNode, Neighbors> => {
  const neighborsByNode: Map</* node */ GraphNode, /* neighbors */ Neighbors> =
    new Map();
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const neighbors: number[][] = [];

    directions.forEach((dir) => {
      const neighbor = [node[0] + dir[0], node[1] + dir[1]];
      // If neighbor is an existing node
      if (
        nodes.findIndex((n) => {
          return n[0] === neighbor[0] && n[1] === neighbor[1];
        }) !== -1
      ) {
        neighbors.push(neighbor);
      }
    });

    if (neighbors.length > 0) {
      neighborsByNode.set(node, neighbors);
    }
  }

  return neighborsByNode;
};
