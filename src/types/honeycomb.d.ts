import "honeycomb-grid/dist/index.d.ts";

declare module "honeycomb-grid" {
  export interface Hex {
    isInPath: boolean;
    cost: number;
    isTraversable: boolean;
    allowsRangedShooting: boolean;
    randomSeeds: number[];
  }
}
