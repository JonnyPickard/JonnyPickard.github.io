import { calculateRotation } from "../../utils/calculateRotation";

import { Hex } from "honeycomb-grid";

describe("calculateRotation", () => {
  const startingDirection = "SW";

  it("should return the correct rotation when moving NE", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 1, r: -1 } as Hex;
    const expectedRotationAngle = 180;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should return the correct rotation when moving E", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 1, r: 0 } as Hex;
    const expectedRotationAngle = -120;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should return the correct rotation when moving SE", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 0, r: 1 } as Hex;
    const expectedRotationAngle = -60;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should return the correct rotation when moving SW", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: -1, r: 1 } as Hex;
    const expectedRotationAngle = 0;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should return the correct rotation when moving W", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: -1, r: 0 } as Hex;
    const expectedRotationAngle = 60;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should return the correct rotation when moving NW", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 0, r: -1 } as Hex;
    const expectedRotationAngle = 120;
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toEqual(
      expectedRotationAngle,
    );
  });

  it("should handle invalid directions and return undefined", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 2, r: 3 } as Hex; // Invalid direction
    expect(calculateRotation({ fromHex, toHex, startingDirection })).toBeNull();
  });
});
