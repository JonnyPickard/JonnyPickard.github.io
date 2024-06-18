import { createStack } from "./createStack";
import type { GraphNode } from "./types";

describe("stack", () => {
  let testStack: ReturnType<typeof createStack>;

  beforeEach(() => {
    testStack = createStack();
  });

  test("should add a node to the stack", () => {
    const node: GraphNode = [1, 2];
    const length = testStack.add(node);
    expect(length).toBe(1);
    expect(testStack.stack).toEqual([node]);
  });

  test("should add multiple nodes to the stack", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testStack.add(node1);
    const length = testStack.add(node2);
    expect(length).toBe(2);
    expect(testStack.stack).toEqual([node1, node2]);
  });

  test("should remove the last node from the stack", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testStack.add(node1);
    testStack.add(node2);
    const removedNode = testStack.remove();
    expect(removedNode).toEqual(node2);
    expect(testStack.stack).toEqual([node1]);
  });

  test("should return undefined when removing from an empty stack", () => {
    const removedNode = testStack.remove();
    expect(removedNode).toBeUndefined();
    expect(testStack.stack).toEqual([]);
  });

  test("should return the correct state of the stack", () => {
    const node1: GraphNode = [1, 2];
    const node2: GraphNode = [3, 4];
    testStack.add(node1);
    testStack.add(node2);
    expect(testStack.stack).toEqual([node1, node2]);
    testStack.remove();
    expect(testStack.stack).toEqual([node1]);
  });
});
