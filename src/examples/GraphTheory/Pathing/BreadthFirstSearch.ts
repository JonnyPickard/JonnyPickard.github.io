type GraphNode = [x: number, y: number];

/**
 * append to rear (push)
 * remove from front (shift)
 */
export const queue = () => {
  const _queue: GraphNode[] = [];

  return {
    add: (node: GraphNode) => _queue.push(node),
    remove: () => _queue.shift(),
    queue: _queue,
  };
};
