import { useRef } from "react";
import * as THREE from "three";
import { useGLTF, Text, Outlines } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TILE_COLORS, HexTileGrass, HexMountainModel } from ".";

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
  showSphere?: boolean;
}

export function HexTileBase({
  position,
  col,
  row,
  isOffset,
  hideTile = false,
  showSphere = false,
  isHoveredTile,
  isPlayerTile,
  isDestinationTile,
  isTerrainTile,
  ...props
}: JSX.IntrinsicElements["mesh"] & HexTileBaseProps) {
  const { nodes, materials } = useGLTF("/3d-models/HexTile.glb") as GLTFResult;

  // Size is calculated as the diameter of the outer circle
  // that can be drawn around the hex
  // See https://www.redblobgames.com/grids/hexagons/#basics
  const hardcodedTileSize = 0.9937889575958252;
  // console.log(nodes.HexTile.geometry.boundingBox.max);
  // const boundingBox = {
  //   "x": 0.8642922043800354,
  //   "y": 0.026939410716295242,
  //   "z": 0.9937889575958252
  // }

  const tileMeshRef = useRef(null);

  // import { useHelper } from "@react-three/drei";
  // eslint-disable-next-line
  // @ts-ignore
  // useHelper(tileMeshRef, THREE.BoxHelper, "cyan");

  // Make text flat with tiles
  const textRotate = new THREE.Euler(-(Math.PI / 2), 0, 0);

  const pickTileColor = () => {
    // Should maybe make custom mesh hex outline for this?
    if (isHoveredTile) {
      return TILE_COLORS.HOVERED;
    }

    if (isTerrainTile) {
      return TILE_COLORS.TERRAIN;
    }

    if (isOffset) {
      return TILE_COLORS.OFFSET_ROW;
    }

    return TILE_COLORS.ROW;
  };

  // <HexTileGrass key={`${col}-${row}`} position={[x, 0, y]} />

  return (
    <group position={position}>
      <Text
        letterSpacing={0.17}
        fontSize={0.22}
        rotation={textRotate}
        position={[0, 0.028, 0]}
      >
        [{col}, {row}]
      </Text>
      {!hideTile && (
        <mesh
          {...props}
          ref={tileMeshRef}
          dispose={null}
          geometry={nodes.HexTile.geometry}
          material={nodes.HexTile.material}
        >
          <meshStandardMaterial
            attach="material"
            color={pickTileColor()}
            roughness={0.4}
          />
          {isPlayerTile && (
            <>
              <Outlines
                scale={[0.8, 0.01, 0.8]}
                color={TILE_COLORS.PLAYER}
                position={[0, 0.04, 0]}
              />
              <Text
                color="black"
                letterSpacing={0.17}
                fontSize={0.22}
                rotation={textRotate}
                position={[0, 0.04, 0]}
              >
                [{col}, {row}]
              </Text>
            </>
          )}
          {/* {isDestinationTile && (
            <>
              <Outlines
                scale={[0.8, 0.01, 0.8]}
                color={TILE_COLORS.DESTINATION}
                position={[0, 0.04, 0]}
              ></Outlines>
              <Text
                color="black"
                letterSpacing={0.17}
                fontSize={0.22}
                rotation={textRotate}
                position={[0, 0.04, 0]}
              >
                [{col}, {row}]
              </Text>
            </>
          )}
          {isHoveredTile && <Edges scale={1.1} color={TILE_COLORS.HOVERED} />} */}
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/3d-models/HexTile.glb");
