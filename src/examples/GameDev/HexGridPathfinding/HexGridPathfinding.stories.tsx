/**
 * HexGridPathfinding Storybook Stories
 */
import type { Meta, StoryObj } from "@storybook/react";
import { HexGridPathfinding } from "./HexGridPathfinding";

const meta = {
  title: "Hexagonal Grids/HexGridPathfinding",
  component: HexGridPathfinding,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Hex Grid Pathfinding

An advanced hex grid pathfinding system demonstrating efficient A* pathfinding on hexagonal grids.

## Features

- **Configurable Grid Sizes**: Switch between 64×64, 96×96, and 128×128 grids
- **A* Pathfinding**: Efficient pathfinding using cube coordinate system
- **Obstacle System**: Generate random obstacles to test pathfinding around blocked tiles
- **Smooth Movement**: Tick-based movement with interpolated animation (600ms per move)
- **Camera System**: Smooth camera following with orbital controls
- **Performance Optimized**: Chunk-based geometry and instanced rendering for obstacles

## How to Use

1. **Click on a hex tile** to set a destination
2. The player (blue cube) will automatically pathfind and move to the clicked location
3. **Use the control panel** (top-left) to:
   - Toggle UI visibility (tick counter and progress bar)
   - Toggle wireframe overlay to see hex boundaries
   - Switch grid sizes to test scalability
   - Generate obstacles to test pathfinding complexity
   - Clear obstacles to reset the grid

## Technical Details

- **Coordinate System**: Odd-row offset for storage, cube coordinates for pathfinding
- **Geometry**: Single BufferGeometry per chunk (no individual hex meshes)
- **Pathfinding**: A* with Manhattan distance heuristic in cube space
- **Rendering**: Pointy-top hexagons on X-Z plane (Three.js Y-up)

## Architecture

This is a pure client-side implementation ideal for experimenting with different
pathfinding algorithms and grid configurations.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HexGridPathfinding>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default example with 128×128 grid
 */
export const Default: Story = {};