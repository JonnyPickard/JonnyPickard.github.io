import "honeycomb-grid/dist/index.d.ts";

declare module "honeycomb-grid" {
  export interface Hex {
    isTraversable: boolean;
    allowsRangedShooting: boolean;
  }
}
