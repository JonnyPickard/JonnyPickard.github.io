import React, { useState, useEffect } from "react";

interface AlgorithmStepListProps {
  currentTile: { x: number; y: number };
  graph: { [node_key: string]: string[] };
}

export const AlgorithmStepList: React.FC<AlgorithmStepListProps> = ({
  currentTile,
  graph,
}) => {
  const [processedTiles, setProcessedTiles] = useState<string[]>([]);

  useEffect(() => {
    const tileKey = `${currentTile.x},${currentTile.y}`;
    if (!processedTiles.includes(tileKey)) {
      setProcessedTiles((prev) => [...prev, tileKey]);
    }
  }, [currentTile]);

  return (
    <div className="flex flex-col text-white max-h-4">
      <h3>Current Tile: {`${currentTile.x}, ${currentTile.y}`}</h3>
      <h4>Processed Tiles:</h4>
      <pre>{JSON.stringify(processedTiles, null, 2)}</pre>
      <h4>Graph Data Structure:</h4>
      <div className="flex flex-row flex-wrap max-h-dvh overflow-hidden">
        <pre>{JSON.stringify(graph, null, 2)}</pre>
      </div>
    </div>
  );
};
