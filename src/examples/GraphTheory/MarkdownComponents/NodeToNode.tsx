import clsx from "clsx";
import { Node } from "./Node";
import { Edge } from "./Edge";

interface NodeToNodeProps {
  from: string;
  to: string;
  nodeSize?: number;
  edgeSize?: number;
}

export function NodeToNode({ from, to, nodeSize, edgeSize }: NodeToNodeProps) {
  return (
    <div className={clsx(["flex", "m-2"])}>
      <Node name={from} size={nodeSize} />
      <Edge size={edgeSize} />
      <Node name={to} size={nodeSize} />
    </div>
  );
}
