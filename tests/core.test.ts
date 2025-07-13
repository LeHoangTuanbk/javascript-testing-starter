import {
  describe,
  expect,
  it,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from "vitest";
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
  fetchData,
  Stack,
} from "../src/core";

// describe("getCoupons", () => {
//   it("should not return an empty array", () => {
//     const coupons = getCoupons();
//     expect(coupons.length).toBeGreaterThan(0);
//   });

//   it.each(getCoupons())("coupon %o is valid", (coupon) => {
//     expect(typeof coupon.code).toBe("string");
//     expect(typeof coupon.discount).toBe("number");
//     expect(coupon.discount).toBeGreaterThanOrEqual(0);
//     expect(coupon.discount).toBeLessThanOrEqual(1);
//   });

//   it("should return an object in which each item contains code: string and discount: number", () => {
//     const coupons = getCoupons();
//     expect(coupons[0]).toHaveProperty("code");
//     expect(typeof coupons[0].code).toBe("string");
//     expect(coupons[0]).toHaveProperty("discount");
//     expect(typeof coupons[0].discount).toBe("number");
//     expect(coupons[0].discount).toBeGreaterThanOrEqual(0);
//     expect(coupons[0].discount).toBeLessThanOrEqual(1);
//   });
// });

describe("getCoupons 2", () => {
  it("should not return an empty array", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBeTruthy();
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid coupon discount", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle when price is negative", () => {
    expect(calculateDiscount(-1, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle when discount is invalid", () => {
    expect(calculateDiscount(10, "Invalid")).toBe(10);
  });
});

describe("validateUserInput", () => {
  // should return ... if ...
  it("should return validation successfully when valid username and age", () => {
    expect(validateUserInput("Tuan", 29)).toMatch(/successful/i);
  });

  it("should return error when input is invalid username: less then 3 characters or greater than 255 characters", () => {
    expect(validateUserInput("T", 40)).toMatch(/invalid username/i);
    expect(validateUserInput("T".repeat(256), 40)).toMatch(/invalid username/i);
  });

  it("should handle invalid age", () => {
    expect(validateUserInput("Tuan", 4)).toMatch(/invalid age/i);
  });

  it("should return an error if both username and age are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username/i);
    expect(validateUserInput("", 0)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("should return false when price is out of range", () => {
    expect(isPriceInRange(-100, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it("should return true when the price is equal to the min or the max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true when the price is in range", () => {
    expect(isPriceInRange(40, 0, 100)).toBe(true);
  });
});

describe("isPriceInRange2", () => {
  it.each([
    {
      scenario: "price < min",
      price: 5,
      min: 10,
      max: 20,
      expectedResult: false,
    },
    {
      scenario: "price = min",
      price: 10,
      min: 10,
      max: 20,
      expectedResult: true,
    },
    {
      scenario: "price between min and max",
      price: 10,
      min: 3,
      max: 20,
      expectedResult: true,
    },
    {
      scenario: "price = max",
      price: 20,
      min: 10,
      max: 20,
      expectedResult: true,
    },
    {
      scenario: "price > max",
      price: 30,
      min: 10,
      max: 20,
      expectedResult: false,
    },
  ])(
    "should return $expectedResult when $scenario",
    ({ price, min, max, expectedResult }) => {
      expect(isPriceInRange(price, min, max)).toBe(expectedResult);
    }
  );
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  it("should return true if given an valid username", () => {
    expect(isValidUsername("T".repeat(minLength + 1))).toBe(true);
    expect(isValidUsername("T".repeat(maxLength - 1))).toBe(true);
  });

  it("should return false if given an invalid username", () => {
    expect(isValidUsername("T".repeat(minLength - 1))).toBe(false);
    expect(isValidUsername("T".repeat(maxLength + 1))).toBe(false);
  });

  it("should return false if username is too short", () => {
    expect(isValidUsername("T".repeat(minLength - 1))).toBe(false);
  });

  it("should return false if username is too long", () => {
    expect(isValidUsername("T".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username is at the min or max length", () => {
    expect(isValidUsername("T".repeat(minLength))).toBe(true);
    expect(isValidUsername("T".repeat(maxLength))).toBe(true);
  });
});

describe("canDrive", () => {
  const legalDrivingAge: Record<string, number> = {
    US: 16,
    UK: 17,
  };
  const countryKeys = {
    US: "US",
    UK: "UK",
  };

  it("should return an error when given invalid country code", () => {
    expect(canDrive(20, "VI")).toMatch(/invalid/i);
  });

  it("should return true when eligible in US", () => {
    expect(canDrive(legalDrivingAge[countryKeys.US] + 10, countryKeys.US)).toBe(
      true
    );
  });

  it("should return true when age is smaller than minimum required age in US", () => {
    expect(canDrive(legalDrivingAge[countryKeys.US] - 1, countryKeys.US)).toBe(
      false
    );
  });

  it("should return true when age is equal the minimum required age in US", () => {
    expect(canDrive(legalDrivingAge[countryKeys.US], countryKeys.US)).toBe(
      true
    );
  });

  it("should return true when eligible in UK", () => {
    expect(canDrive(legalDrivingAge[countryKeys.UK] + 10, countryKeys.UK)).toBe(
      true
    );
  });

  it("should return true when age is smaller than minimum required age in UK", () => {
    expect(canDrive(legalDrivingAge[countryKeys.UK] - 1, countryKeys.UK)).toBe(
      false
    );
  });

  it("should return true when age is equal the minimum required age in UK", () => {
    expect(canDrive(legalDrivingAge[countryKeys.UK], countryKeys.UK)).toBe(
      true
    );
  });
});

describe("canDrive2", () => {
  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])(
    "should return $result for ($age, $country)",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    }
  );
});

describe("fetchData", () => {
  it("should return a promise that will resolve to an array of number", async () => {
    try {
      const res = await fetchData();
      expect(res).toContainEqual([3, 1, 2]);
    } catch (error) {
      expect(error).toHaveProperty("message");
      expect(error.message).toMatch(/error/i);
    }
  });
});

describe("setup and teardown", () => {
  beforeEach(() => {
    console.log("beforeEach is called");
  });

  beforeAll(() => {
    console.log("beforeAll is called");
  });
  it("should 1 ...", () => {});
  it("should  2...", () => {});
});

describe("Stack", () => {
  let stack: Stack<number>;
  beforeAll(() => {
    stack = new Stack();
  });

  afterEach(() => {
    stack.clear();
  });

  it("should return a stack with new item when push", () => {
    stack.push(10);

    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(10);
  });

  it("should return item in LIFO order with pop", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
  });

  it("should throw error when pop from empty stack", () => {
    expect(() => stack.pop()).toThrowError(/empty/i);
  });

  it("should peek the last element", () => {
    stack.push(3);
    stack.push(4);

    expect(stack.peek()).toBe(4);
    expect(stack.size()).toBe(2);
  });

  it("should throw error when peek from empty stack", () => {
    expect(() => stack.peek()).toThrowError(/empty/i);
  });

  it("should return true when empty and false when not", () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  it("should return the number of items in the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  it("should return empty stack when clear", () => {
    stack.push(1);
    stack.clear();

    expect(stack.isEmpty()).toBe(true);
  });
});
