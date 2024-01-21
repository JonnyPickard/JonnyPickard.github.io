import { useRef } from "react";
import * as THREE from "three";
import { useGLTF, Text, Outlines, Edges } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  TILE_COLORS,
  HexTileGrass,
  HexMountainModel,
  OverlayHighlightOutline,
  OverlayText,
} from ".";

type GLTFResult = GLTF & {
  nodes: {
    HexTile: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

interface HexTileBaseProps {
  isOffset: boolean;
  /* Offset coords - Column */
  col: number;
  /* Offset coords - Row */
  row: number;
  isHoveredTile?: boolean;
  isPlayerTile?: boolean;
  isDestinationTile?: boolean;
  isTerrainTile?: boolean;
  hideTile?: boolean;
  showCoordinates?: boolean;
  showSphere?: boolean;
}

export function HexTileBase({
  position,
  col,
  row,
  isOffset,
  hideTile = false,
  showSphere = false,
  showCoordinates = true,
  isHoveredTile,
  isPlayerTile,
  isDestinationTile,
  isTerrainTile,
  ...props
}: JSX.IntrinsicElements["group"] & HexTileBaseProps) {
  return (
    <group {...props} position={position}>
      <HexTileGrass />
      {showCoordinates && <OverlayText col={col} row={row} />}
      {isHoveredTile && <OverlayHighlightOutline />}
      {isTerrainTile && <HexMountainModel />}
    </group>
  );
}
