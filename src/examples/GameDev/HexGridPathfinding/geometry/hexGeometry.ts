/**
 * Hex Geometry Utilities
 *
 * Responsibility: Geometry generation only (SRP compliance)
 *
 * Generates vertex positions for pointy-top hexagons
 */
import { HEX_RADIUS } from "../constants";
import type { Vec2 } from "../types";

/**
 * Generate hex vertex positions (pointy-top, 30° offset)
 *
 * @param center - Center position of hex
 * @param radius - Hex radius (default: HEX_RADIUS)
 * @returns Array of 6 vertex positions
 */
export function getHexVertices(center: Vec2, radius: number = HEX_RADIUS): Vec2[] {
  const vertices: Vec2[] = [];
  const angleOffset = 30; // degrees

  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i + angleOffset;
    const angleRad = (angleDeg * Math.PI) / 180;
    vertices.push({
      x: center.x + radius * Math.cos(angleRad),
      y: center.y + radius * Math.sin(angleRad),
    });
  }

  return vertices;
}
