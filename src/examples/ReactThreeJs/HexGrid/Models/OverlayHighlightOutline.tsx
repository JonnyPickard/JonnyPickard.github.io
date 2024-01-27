import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TILE_COLORS } from ".";
import { useCallback } from "react";

type GLTFResult = GLTF & {
  nodes: {
    HexSelectedOutline: THREE.Mesh;
  };
  materials: {
    [material: string]: THREE.MeshStandardMaterial;
  };
};

interface OverlayHighlightOutlineProps {
  isHoveredTile?: boolean;
  isPlayerTile?: boolean;
  isDestinationTile?: boolean;
}

/**
 * Helper show the bounding HighlightOutline around a mesh instance
 *
 * @export
 * @param {OverlayHighlightOutlineProps} { tileSize }
 * @return {*}
 */
export function OverlayHighlightOutline({
  isHoveredTile,
  isPlayerTile,
  isDestinationTile,
  ...props
}: JSX.IntrinsicElements["mesh"] & OverlayHighlightOutlineProps) {
  const { nodes } = useGLTF(
    "/3d-models/hex-grid/HexTilleHighlightOutline.glb",
  ) as GLTFResult;

  // TODO: Might be worth having a tile state prop vs manualing passing these all through
  const pickTileOutlineColor = useCallback(() => {
    if (isHoveredTile) {
      return TILE_COLORS.HOVERED;
    } else if (isPlayerTile) {
      return TILE_COLORS.PLAYER;
    } else if (isDestinationTile) {
      return TILE_COLORS.DESTINATION;
    } else {
      return TILE_COLORS.HOVERED;
    }
  }, [isHoveredTile, isPlayerTile, isDestinationTile]);

  return (
    <mesh
      {...props}
      dispose={null}
      geometry={nodes.HexSelectedOutline.geometry}
      material={nodes.HexSelectedOutline.material}
      position={[0, 0.049, 0]}
    >
      <meshLambertMaterial
        color={pickTileOutlineColor()}
        toneMapped={false}
        emissiveIntensity={0.5}
        emissive={TILE_COLORS.HOVERED_EMISSIVE_LIGHT}
      />
    </mesh>
  );
}

useGLTF.preload("/3d-models/hex-grid/HexTilleHighlightOutline.glb");
