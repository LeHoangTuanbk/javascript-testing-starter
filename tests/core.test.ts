import { describe, expect, it, test } from "vitest";
import { getCoupons } from "../src/core";

describe("getCoupons", () => {
  it("should not return an empty array", () => {
    const coupons = getCoupons();
    expect(coupons.length).toBeGreaterThan(0);
  });

  it.each(getCoupons())("coupon %o is valid", (coupon) => {
    expect(typeof coupon.code).toBe("string");
    expect(typeof coupon.discount).toBe("number");
    expect(coupon.discount).toBeGreaterThanOrEqual(0);
    expect(coupon.discount).toBeLessThanOrEqual(1);
  });

  it("should return an object in which each item contains code: string and discount: number", () => {
    const coupons = getCoupons();
    expect(coupons[0]).toHaveProperty("code");
    expect(typeof coupons[0].code).toBe("string");
    expect(coupons[0]).toHaveProperty("discount");
    expect(typeof coupons[0].discount).toBe("number");
    expect(coupons[0].discount).toBeGreaterThanOrEqual(0);
    expect(coupons[0].discount).toBeLessThanOrEqual(1);
  });
});
