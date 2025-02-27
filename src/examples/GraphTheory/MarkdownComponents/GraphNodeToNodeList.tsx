import React from "react";
import clsx from "clsx";
import { NodeToNode } from "./NodeToNode";

type Coordinate = number;
type CoordinatesString = `${Coordinate},${Coordinate}`;

type Graph = { [node_key: string]: CoordinatesString[] };

interface GraphNodeToNodeListProps {
  graph: Graph;
  nodeSize?: number;
  edgeSize?: number;
}

export const GraphNodeToNodeList: React.FC<GraphNodeToNodeListProps> = ({
  graph,
  nodeSize = 20,
  edgeSize = 20,
}) => {
  return (
    <ul
      className={clsx([
        "list-disc",
        "flex",
        "flex-col",
        "flex-wrap",
        "h-full",
        "overyflow-scroll",
      ])}
    >
      {Object.entries(graph).map(([node, connections]) => (
        <li key={node} className={clsx(["flex", "items-center"])}>
          <span className={clsx(["text-emerald-500", "text-xs"])}>{node}:</span>
          {connections.map((connection) => (
            <NodeToNode
              key={`${node}-${connection}`}
              from={node}
              to={connection}
              nodeSize={nodeSize}
              edgeSize={edgeSize}
            />
          ))}
        </li>
      ))}
    </ul>
  );
};
