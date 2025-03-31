import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { EdgeToNode } from "./EdgeToNode";
import { Node } from "./Node";

import { Button } from "@/components";
import { HiArrowDown } from "react-icons/hi";
import type { Graph } from "../Grids";

interface GraphNodeToNeigbourListProps {
  graph: Graph;
  nodeSize?: number;
  edgeSize?: number;
}

export const GraphNodeToNeigbourList: React.FC<
  GraphNodeToNeigbourListProps
> = ({ graph, nodeSize = 32, edgeSize = 32 }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [graph, autoScroll]);

  return (
    <div
      className={clsx([
        "bg-secondary-500/40",
        "p-4",
        "rounded-lg",
        "h-full",
        "w-full",
        "max-h-full",
        "flex",
        "flex-col",
      ])}
    >
      <ul
        ref={listRef}
        className={clsx([
          "list-disc",
          "flex",
          "flex-col",
          "[&>*:nth-child(odd)]:bg-secondary-600/20",
          "[&>*:nth-child(even)]:bg-secondary-600/10",
          "space-y-3",
          "max-h-full",
          "overflow-auto",
          "grow",
        ])}
      >
        {Object.entries(graph).map(([node, connections]) => (
          <li
            key={node}
            className={clsx(["flex", "items-center", "max-h-[32px]"])}
          >
            <Node
              name={node}
              className={clsx([
                "m-0",
                "mr-4",
                "bg-emerald-600",
                "max-h-[32px]",
              ])}
            />
            {connections.map((connection) => (
              <EdgeToNode
                key={`${node}-${connection.x},${connection.y}`}
                from={node}
                to={`${connection.x},${connection.y}`}
                direction={connection.direction}
                nodeSize={nodeSize}
                edgeSize={edgeSize}
                edgeClassName={clsx(["mr-4", "max-h-[32px]"])}
              />
            ))}
          </li>
        ))}
      </ul>
      <Button
        onClick={() => setAutoScroll((prev) => !prev)}
        className={clsx(["mt-4", "self-center"])}
      >
        {autoScroll ? "Disable Auto-Scroll" : "Enable Auto-Scroll"}
        {autoScroll ? (
          <HiArrowDown className="w-4 h-4 ml-2 rotate-180 transition-transform ease-in" />
        ) : (
          <HiArrowDown className="w-4 h-4 ml-2 rotate-0 transition-transform ease-in" />
        )}
      </Button>
    </div>
  );
};
