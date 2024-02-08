import { calculateDirection } from "../../utils/calculateDirection";
import { Hex } from "honeycomb-grid";

describe("calculateDirection", () => {
  it("should return the correct direction when moving NE", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 1, r: -1 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("NE");
  });

  it("should return the correct direction when moving E", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 1, r: 0 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("E");
  });

  it("should return the correct direction when moving SE", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 0, r: 1 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("SE");
  });

  it("should return the correct direction when moving SW", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: -1, r: 1 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("SW");
  });

  it("should return the correct direction when moving W", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: -1, r: 0 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("W");
  });

  it("should return the correct direction when moving NW", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 0, r: -1 } as Hex;
    expect(calculateDirection({ fromHex, toHex })).toEqual("NW");
  });

  it("should handle invalid directions and return null", () => {
    const fromHex: Hex = { q: 0, r: 0 } as Hex;
    const toHex: Hex = { q: 2, r: 3 } as Hex; // Invalid direction
    expect(calculateDirection({ fromHex, toHex })).toBeNull();
  });
});
