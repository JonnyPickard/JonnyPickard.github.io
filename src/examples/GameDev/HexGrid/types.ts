import type { OffsetCoordinates } from "honeycomb-grid";

export type NullableOffsetCoordinates =
  | OffsetCoordinates
  | { col: null; row: null };
