/**
 * Hex Chunk Geometry Generator
 *
 * Principle: CRP - Composes from hexPositioning + hexGeometry modules
 *
 * Generates BufferGeometry for configurable hex chunk (64×64, 96×96, or 128×128)
 * - 7 vertices per hex (1 center + 6 outer)
 * - 6 triangular faces per hex
 */

import { BufferGeometry, Float32BufferAttribute } from "three";
import { HEX_RADIUS, type ChunkSize } from "../constants";
import type { LocalHexCoord } from "../types";
import { getHexVertices } from "./hexGeometry";
import { getHexCenterInChunk } from "./hexPositioning";

/**
 * Generate BufferGeometry for hex chunk
 *
 * @param chunkSize - Size of chunk (64, 96, or 128)
 * @param radius - Hex radius (default: HEX_RADIUS = 1.0)
 * @returns BufferGeometry ready for Three.js rendering
 */
export function generateHexChunkGeometry(
  chunkSize: ChunkSize,
  radius: number = HEX_RADIUS
): BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  let vertexIndex = 0;

  for (let row = 0; row < chunkSize; row++) {
    for (let col = 0; col < chunkSize; col++) {
      const local: LocalHexCoord = [col, row];
      const center = getHexCenterInChunk(local);
      const vertices = getHexVertices(center, radius);

      // Center vertex (Three.js Y-up: hex X→X, hex Y→Z, height→Y)
      positions.push(center.x, 0, center.y);
      normals.push(0, 1, 0); // Normal points up along Y axis
      const centerIdx = vertexIndex++;

      // 6 outer vertices
      const outerIndices: number[] = [];
      for (const vertex of vertices) {
        positions.push(vertex.x, 0, vertex.y);
        normals.push(0, 1, 0);
        outerIndices.push(vertexIndex++);
      }

      // 6 triangular faces (center → edge[i+1] → edge[i])
      // Counter-clockwise winding when viewed from above (Y-up)
      for (let i = 0; i < 6; i++) {
        const nextI = (i + 1) % 6;
        indices.push(centerIdx, outerIndices[nextI], outerIndices[i]);
      }
    }
  }

  // Create BufferGeometry
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);

  return geometry;
}
