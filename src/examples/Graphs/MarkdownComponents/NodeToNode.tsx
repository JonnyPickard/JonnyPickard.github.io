import { Node } from "./Node";

interface NodeToNodeProps {
  from: string;
  to: string;
}

export function NodeToNode({ from, to }: NodeToNodeProps) {
  return (
    <div className="flex">
      <Node name={from} />
      <Node name={to} />
    </div>
  );
}
