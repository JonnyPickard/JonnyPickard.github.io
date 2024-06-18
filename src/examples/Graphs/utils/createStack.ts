import type { GraphNode } from "./types";

/**
 * Creates a stack data structure for storing GraphNode elements.
 * @returns {Object} An object representing the stack with methods to add and remove nodes.
 * @returns {function(GraphNode): number} add - Adds a GraphNode to the stack and returns the new length of the stack.
 * @returns {function(): (GraphNode | undefined)} remove - Removes and returns the last GraphNode from the stack, or undefined if the stack is empty.
 * @returns {GraphNode[]} stack - The current state of the stack.
 *
 * Stack (Last In First Out):
 *
 * add element: append to rear (push)
 * remove element: remove from rear (pop)
 */
export const createStack = () => {
  const stack: GraphNode[] = [];

  return {
    /**
     * Adds a GraphNode to the stack.
     * @param {GraphNode} node - The graph node to add.
     * @returns {number} The new length of the stack.
     */
    add: (node: GraphNode) => stack.push(node),

    /**
     * Removes the last GraphNode from the stack.
     * @returns {GraphNode | undefined} The removed graph node, or undefined if the stack is empty.
     */
    remove: () => stack.pop(),

    /**
     * The current state of the stack.
     * @type {GraphNode[]}
     */
    stack: stack,
  };
};
