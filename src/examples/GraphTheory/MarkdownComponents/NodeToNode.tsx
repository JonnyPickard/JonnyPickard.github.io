import { Node } from "./Node";
import { Edge } from "./Edge";

interface NodeToNodeProps {
  from: string;
  to: string;
}

export function NodeToNode({ from, to }: NodeToNodeProps) {
  return (
    <div className="flex m-2">
      <Node name={from} />
      <Edge />
      <Node name={to} />
    </div>
  );
}
