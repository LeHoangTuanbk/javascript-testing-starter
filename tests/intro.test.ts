import { describe, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/intro";

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

describe("FizzBuzz", () => {
  // hint: should cover all the execution path
  // false negative and false positive
  it("should return FizzBuzz when arg can be divisible by 3 and 5", () => {
    expect(fizzBuzz(30)).toBe("FizzBuzz");
  });

  it("should return Fizz when arg only can be divisible by 3", () => {
    expect(fizzBuzz(6)).toBe("Fizz");
  });

  it("should return Buzz when arg can be divisible by 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("should return n when arg can not be divisible by 5 and 3", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
});

describe("Calculate average of an array", () => {
  it("should return NaN when given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it("should calculate the average of array", () => {
    expect(calculateAverage([3, 3, 6])).toBe(4);
  });
});

describe("Calculate factorial", () => {
  it("should return undefined if given a negative number", () => {
    expect(factorial(-1)).toBe(undefined);
  });
  it("should return 1 when given 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("should return 6 when given 3", () => {
    expect(factorial(3)).toBe(6);
  });

  it("should return 24 when given 4", () => {
    expect(factorial(4)).toBe(24);
  });
});

describe("Good assertion", () => {
  it("test case", () => {
    const result = [3, 2, 1, 0];
    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(result.length).toBeGreaterThan(0);
  });

  it("test case: object", () => {
    const result = { name: "Tuan", id: 1 };
    expect(result).toMatchObject({ name: "Tuan" });
    expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
  });
});
