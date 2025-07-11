import { describe, test, it, expect } from "vitest";
import { max } from "../src/intro";

describe("Max", () => {
  it("should return the first argument if it is greater", () => {
    expect(max(3, 2)).toBe(3);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(3, 4)).toBe(4);
  });

  it("should return the first argument if two arguments are equal", () => {
    expect(max(4, 4)).toBe(4);
  });
});
