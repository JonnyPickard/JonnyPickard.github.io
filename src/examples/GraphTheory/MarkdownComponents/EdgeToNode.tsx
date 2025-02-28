import clsx from "clsx";
import { Node } from "./Node";
import { Edge } from "./Edge";

interface EdgeToNodeProps {
  from: string;
  to: string;
  nodeSize?: number;
  edgeSize?: number;
  direction?: "R" | "D" | "L" | "U";

  className?: React.HTMLAttributes<HTMLSpanElement>["className"];
  edgeClassName?: React.HTMLAttributes<HTMLSpanElement>["className"];
  nodeClassName?: React.HTMLAttributes<HTMLSpanElement>["className"];
}

export function EdgeToNode({
  to,
  nodeSize,
  edgeSize,
  direction,
  className,
  edgeClassName,
  nodeClassName,
}: EdgeToNodeProps) {
  return (
    <div className={clsx(["flex", "justify-center", "m-2", "className"])}>
      <Edge size={edgeSize} direction={direction} className={edgeClassName} />
      <Node name={to} size={nodeSize} className={nodeClassName} />
    </div>
  );
}
