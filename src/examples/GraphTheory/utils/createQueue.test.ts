import { createQueue } from "./createQueue";
import type { GraphNode } from "./types";

describe("createQueue", () => {
  let testQueue: ReturnType<typeof createQueue>;

  beforeEach(() => {
    testQueue = createQueue();
  });

  test("should add a node to the queue", () => {
    const node: GraphNode = [1, 2];
    const length = testQueue.add(node);
    expect(length).toBe(1);
    expect(testQueue.queue).toEqual([node]);
  });

  test("should add multiple nodes to the queue", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testQueue.add(node1);
    const length = testQueue.add(node2);
    expect(length).toBe(2);
    expect(testQueue.queue).toEqual([node1, node2]);
  });

  test("should remove the first node from the queue", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testQueue.add(node1);
    testQueue.add(node2);
    const removedNode = testQueue.remove();
    expect(removedNode).toEqual(node1);
    expect(testQueue.queue).toEqual([node2]);
  });

  test("should return undefined when removing from an empty queue", () => {
    const removedNode = testQueue.remove();
    expect(removedNode).toBeUndefined();
    expect(testQueue.queue).toEqual([]);
  });

  test("should return the correct state of the queue", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testQueue.add(node1);
    testQueue.add(node2);
    expect(testQueue.queue).toEqual([node1, node2]);
    testQueue.remove();
    expect(testQueue.queue).toEqual([node2]);
  });
});
