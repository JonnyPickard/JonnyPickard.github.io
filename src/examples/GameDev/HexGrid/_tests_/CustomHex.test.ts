import { defineCustomHex } from "..";
import { Hex, Orientation } from "honeycomb-grid";

describe("Custom Hex", () => {
  it("should be instantiated with default options", () => {
    const CustomHexTile = defineCustomHex();
    const hexTile = new CustomHexTile();

    expect(hexTile instanceof Hex).toBe(true);
    expect(hexTile.isTraversable).toBe(true);
    expect(hexTile.allowsRangedShooting).toBe(true);
  });

  it("should be instantiated with custom options", () => {
    const CustomHexTile = defineCustomHex({
      dimensions: 10,
      orientation: Orientation.FLAT,
    });
    const hexTile = new CustomHexTile();

    expect(hexTile.dimensions.xRadius).toBe(10);
    expect(hexTile.dimensions.yRadius).toBe(10);
    expect(hexTile.orientation).toBe(Orientation.FLAT);
    expect(hexTile.isTraversable).toBe(true);
    expect(hexTile.allowsRangedShooting).toBe(true);
  });

  it("should allow setting and getting traversability status", () => {
    const CustomHexTile = defineCustomHex();
    const hexTile = new CustomHexTile();

    hexTile.isTraversable = false;
    expect(hexTile.isTraversable).toBe(false);

    hexTile.isTraversable = true;
    expect(hexTile.isTraversable).toBe(true);
  });

  it("should allow setting and getting ranged shooting status", () => {
    const CustomHexTile = defineCustomHex();
    const hexTile = new CustomHexTile();

    hexTile.allowsRangedShooting = false;
    expect(hexTile.allowsRangedShooting).toBe(false);

    hexTile.allowsRangedShooting = true;
    expect(hexTile.allowsRangedShooting).toBe(true);
  });
});
