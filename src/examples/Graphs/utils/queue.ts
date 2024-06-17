import type { GraphNode } from "./types";

/**
 * Creates a queue data structure for storing GraphNode elements.
 * @returns {Object} An object representing the queue with methods to add and remove nodes.
 * @returns {function(GraphNode): number} add - Adds a GraphNode to the queue and returns the new length of the queue.
 * @returns {function(): (GraphNode | undefined)} remove - Removes and returns the first GraphNode from the queue, or undefined if the queue is empty.
 * @returns {GraphNode[]} queue - The current state of the queue.
 *
 * Queue (First In First Out)
 *
 * The first element added to the queue is the first one to be removed.
 *
 * add: append to rear (push)
 * remove: remove from front (shift)
 */
export const queue = () => {
  const _queue: GraphNode[] = [];

  return {
    /**
     * Adds a GraphNode to the queue.
     * @param {GraphNode} node - The graph node to add.
     * @returns {number} The new length of the queue.
     */
    add: (node: GraphNode) => _queue.push(node),

    /**
     * Removes the first GraphNode from the queue.
     * @returns {GraphNode | undefined} The removed graph node, or undefined if the queue is empty.
     */
    remove: () => _queue.shift(),

    /**
     * The current state of the queue.
     * @type {GraphNode[]}
     */
    queue: _queue,
  };
};
