interface OverlaySphereProps {
  tileSize: number;
}

/**
 * Helper show the bounding sphere around a mesh instance
 *
 * @export
 * @param {OverlaySphereProps} { tileSize }
 * @return {*}
 */
export function OverlaySphere({ tileSize }: OverlaySphereProps) {
  return (
    <mesh>
      <sphereGeometry args={[tileSize, 24, 24]} />
      <meshStandardMaterial transparent wireframe />
    </mesh>
  );
}
