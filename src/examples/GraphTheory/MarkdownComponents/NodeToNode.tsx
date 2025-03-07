import clsx from "clsx";
import { Edge } from "./Edge";
import { Node } from "./Node";

interface NodeToNodeProps {
  from: string;
  to: string;
  nodeSize?: number;
  edgeSize?: number;
  direction?: "R" | "D" | "L" | "U";
}

export function NodeToNode({
  from,
  to,
  nodeSize,
  edgeSize,
  direction,
}: NodeToNodeProps) {
  return (
    <div className={clsx(["flex", "m-2"])}>
      <Node name={from} size={nodeSize} />
      <Edge size={edgeSize} direction={direction} />
      <Node name={to} size={nodeSize} />
    </div>
  );
}
