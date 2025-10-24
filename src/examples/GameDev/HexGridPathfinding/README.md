# HexGridPathfinding

A standalone hex grid pathfinding implementation demonstrating advanced hex grid techniques with A* pathfinding, configurable grid sizes, and smooth player movement.

## Overview

This is a **pure client-side** hex grid pathfinding system designed for experimenting with different pathfinding algorithms and grid configurations.

## Features

### Core Functionality

- **A* Pathfinding** with cube coordinate system
- **Configurable Grid Sizes**: 64×64, 96×96, 128×128
- **Obstacle System**: Dynamic obstacle generation and removal
- **Smooth Movement**: Tick-based movement (600ms) with interpolated animation
- **Camera Follow**: Smooth camera tracking with orbital controls

### Technical Highlights

- **Chunk-based Geometry**: Single BufferGeometry per chunk (no individual hex meshes)
- **Instanced Rendering**: Efficient obstacle rendering (10,000+ obstacles at 60fps)
- **Odd-row Offset Coordinates**: For storage and positioning
- **Cube Coordinates**: For pathfinding calculations
- **Pointy-top Hexagons**: Rendered on X-Z plane (Three.js Y-up)

## Architecture

### Directory Structure

```tree
HexGridPathfinding/
├── components/
│   ├── camera/          # Camera follow system
│   ├── game/            # Game loop and tick system
│   ├── interaction/     # Hex selection visuals
│   ├── pathfinding/     # Path visualization and obstacles
│   ├── player/          # Player rendering
│   ├── scene/           # Main 3D scene
│   ├── terrain/         # Hex terrain rendering
│   └── ui/              # UI overlays and controls
├── geometry/            # BufferGeometry generators
├── utils/               # Coordinate conversion and pathfinding
├── constants.ts         # Configuration constants
├── types.ts             # TypeScript type definitions
├── store.ts             # Zustand state management
└── HexGridPathfinding.tsx  # Main entry component
```

### Design Principles

- **Client-side Only**: No network calls, no authentication required
- **Single Store**: Consolidated Zustand store for all state management
- **Immediate Feedback**: Click → instant pathfinding computation
- **Configurable**: Multiple grid size options for testing scalability
- **Performance Focused**: Chunk-based geometry and instanced rendering

## Usage

### In Storybook

```bash
npm run dev
# Navigate to Examples/GameDev/HexGridPathfinding
```

### Programmatic

```typescript
import { HexGridPathfinding } from "@/examples/GameDev/HexGridPathfinding";

export function MyComponent() {
  return <HexGridPathfinding />;
}
```

## How It Works

### 1. Click Handling

- User clicks hex terrain
- Three.js raycast determines world position
- Convert to offset coordinates [col, row]
- Store as `selectedHex` and trigger pathfinding

### 2. Pathfinding

- Convert offset coordinates → cube coordinates
- Run A* algorithm in cube space (uniform neighbor calculation)
- Convert path back to offset coordinates
- Store path in `currentPath`

### 3. Movement

- Game loop runs at 600ms ticks
- Each tick: move player to next position in path
- PlayerCube component interpolates smoothly between positions
- Camera follows player with smooth lerp

### 4. Rendering

- **Terrain**: Single BufferGeometry for all hexes in chunk
- **Obstacles**: Instanced rendering (single draw call)
- **Player**: Animated mesh with smooth interpolation
- **Path**: Line connecting hex centers
- **Selection**: Highlighted cylinder on selected hex

## State Management

Single Zustand store with these responsibilities:

- Grid configuration (chunk size)
- Hex selection (selected, hovered)
- Game state (tick number, progress)
- UI visibility (wireframe, tick UI)
- Player state (position, path)
- Obstacles (Set of blocked hexes)

## Coordinate Systems

### Offset Coordinates

- Storage: `[col, row]`
- System: Odd-row offset (odd rows shifted right by 0.5)
- Used for: Grid indexing, rendering positions

### Cube Coordinates

- Structure: `{ q, r, s }` where `q + r + s = 0`
- Used for: Pathfinding (uniform neighbor calculation)
- Conversion: `offsetToCube()` and `cubeToOffset()`

### Three.js Coordinates

- Y-axis: Up
- X-axis: Left/right (hex X)
- Z-axis: Forward/back (hex Y)
- Hex grid rendered on X-Z plane at Y=0

## Performance

- **Chunk Generation**: O(n²) - runs once per chunk size change
- **Pathfinding**: O((V + E) log V) - A* with binary heap-like priority queue
- **Obstacle Rendering**: O(1) draw calls - instanced rendering
- **Player Movement**: O(1) per frame - simple interpolation

**Tested Performance:**

- 128×128 grid: 16,384 hexes rendered at 60fps
- 10,000 obstacles: 60fps with instanced rendering
- Pathfinding: <100ms for any path in 128×128 grid

## Customization

### Change Tick Interval

Edit `constants.ts`:

```typescript
export const DEFAULT_TICK_INTERVAL = 300; // Faster movement
```

### Add New Grid Sizes

Edit `constants.ts`:

```typescript
export const CHUNK_SIZE_OPTIONS = [32, 64, 96, 128, 256] as const;
```

### Modify Pathfinding

Edit `utils/pathfinding/astar.ts` to try different algorithms or heuristics.

## Future Enhancements

Potential additions for experimentation:

- [ ] Dijkstra's algorithm comparison
- [ ] JPS (Jump Point Search) for uniform cost grids
- [ ] Weighted terrain (different movement costs)
- [ ] Multi-agent pathfinding with collision avoidance
- [ ] Flow field pathfinding for RTS-style movement
- [ ] Incremental pathfinding (D* Lite)
- [ ] Hierarchical pathfinding for very large grids
