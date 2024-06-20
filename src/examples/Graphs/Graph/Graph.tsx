import cytoscape from "cytoscape";

import { useRef, useEffect } from "react";

const nodeColor = "#6366f1";
const edgeColor = "#10b981";

export interface GraphProps {
  elements: cytoscape.ElementDefinition[];
}

export function Graph({ elements = [] }: GraphProps) {
  const graphRef = useRef(null);

  useEffect(() => {
    cytoscape({
      container: graphRef.current,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" },
          style: { color: "white" },
        },
        {
          // node b
          data: { id: "b" },
          style: { color: "white" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
        },
        ...elements,
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": nodeColor,
            label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": edgeColor,
            "target-arrow-color": edgeColor,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],

      layout: {
        name: "grid",
        rows: 1,
      },
    });
  }, []);

  return <div className={"size-full"} ref={graphRef} />;
}
