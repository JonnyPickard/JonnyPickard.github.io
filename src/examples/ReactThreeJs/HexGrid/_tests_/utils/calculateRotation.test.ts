import { calculateRotation } from "../../utils/calculateRotation";

import { Hex } from "honeycomb-grid";

describe("calculateRotation", () => {
  const initiallyFacing = "SW";

  it("should return the correct rotation when moving NE", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: 1, r: -1 } as Hex;

    const expectedRotationDeg = 180;
    const expectedRotationDir = "NE";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should return the correct rotation when moving E", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: 1, r: 0 } as Hex;

    const expectedRotationDeg = 120;
    const expectedRotationDir = "E";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should return the correct rotation when moving SE", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: 0, r: 1 } as Hex;

    const expectedRotationDeg = 60;
    const expectedRotationDir = "SE";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should return the correct rotation when moving SW", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: -1, r: 1 } as Hex;

    const expectedRotationDeg = 0;
    const expectedRotationDir = "SW";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should return the correct rotation when moving W", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: -1, r: 0 } as Hex;

    const expectedRotationDeg = -60;
    const expectedRotationDir = "W";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should return the correct rotation when moving NW", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: 0, r: -1 } as Hex;

    const expectedRotationDeg = -120;
    const expectedRotationDir = "NW";
    const expectedRotation = {
      degrees: expectedRotationDeg,
      direction: expectedRotationDir,
    };

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toEqual(
      expectedRotation,
    );
  });

  it("should handle invalid directions and return undefined", () => {
    const fromHex = { q: 0, r: 0 } as Hex;
    const toHex = { q: 2, r: 3 } as Hex; // Invalid direction

    expect(calculateRotation({ fromHex, toHex, initiallyFacing })).toBeNull();
  });
});
