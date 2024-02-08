import { TILE_MESH_SIZE } from "../../constants";

/**
 * Helper show the bounding sphere around a mesh instance
 */
export function OverlaySphere() {
  return (
    <mesh>
      <sphereGeometry args={[TILE_MESH_SIZE, 24, 24]} />
      <meshStandardMaterial transparent wireframe opacity={0.2} />
    </mesh>
  );
}
