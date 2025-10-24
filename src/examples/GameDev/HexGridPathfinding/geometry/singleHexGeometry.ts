/**
 * Single Hex Geometry Generator
 *
 * Principle: CRP - Composes from hexGeometry module
 *
 * Generates BufferGeometry for a single hex at origin.
 * Used for rendering individual hexes (obstacles, highlights, etc.)
 */

import { BufferGeometry, Float32BufferAttribute } from "three";
import { HEX_RADIUS } from "../constants";
import { getHexVertices } from "./hexGeometry";

/**
 * Generate BufferGeometry for a single hex centered at origin
 *
 * Geometry is centered at (0,0,0) - use mesh position for placement.
 * - 7 vertices (1 center + 6 outer)
 * - 6 triangular faces
 *
 * @param radius - Hex radius (default: HEX_RADIUS = 1.0)
 * @returns BufferGeometry ready for Three.js rendering
 */
export function generateSingleHexGeometry(radius: number = HEX_RADIUS): BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  // Get hex vertices around origin
  const center = { x: 0, y: 0 };
  const vertices = getHexVertices(center, radius);

  // Center vertex (Three.js Y-up: hex X→X, hex Y→Z, height→Y)
  positions.push(0, 0, 0);
  normals.push(0, 1, 0); // Normal points up along Y axis
  const centerIdx = 0;

  // 6 outer vertices
  const outerIndices: number[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    positions.push(vertex.x, 0, vertex.y);
    normals.push(0, 1, 0);
    outerIndices.push(i + 1);
  }

  // 6 triangular faces (center → edge[i+1] → edge[i])
  // Counter-clockwise winding when viewed from above (Y-up)
  for (let i = 0; i < 6; i++) {
    const nextI = (i + 1) % 6;
    indices.push(centerIdx, outerIndices[nextI], outerIndices[i]);
  }

  // Create BufferGeometry
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);

  return geometry;
}
