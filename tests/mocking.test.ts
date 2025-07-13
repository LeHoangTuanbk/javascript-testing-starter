import { vi, it, expect, describe, afterEach, beforeEach } from "vitest";
import { getExchangeRate } from "../src/libs/currency";
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
} from "../src/mocking";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { submitOrder } from "../src/mocking";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";
import security from "../src/libs/security";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = (await importOriginal()) || {};
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe("test suite", () => {
  it("test case", () => {
    const greet = vi.fn();
    // greet.mockReturnValue("Hello");
    // greet.mockResolvedValue("Hello1");
    greet.mockImplementation((name: string) => "Hello " + name);
    const result = greet("Mosh");
    console.log(result);

    expect(greet).toBeCalled();
    expect(greet).toBeCalledWith("Mosh");
    expect(greet).toHaveBeenCalledOnce();

    // const result = greet().then((result) => {
    //   console.log(result);
    // });
  });

  it("test suite 2", async () => {
    const sendText = vi.fn();
    sendText.mockResolvedValue("ok");
    const result = await sendText("message");
    expect(sendText).toBeCalled();
    expect(result).toMatch(/ok/i);
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should: when happy case", () => {
    const mockedReturnValue = { cost: 1, estimatedDays: 2 };
    vi.mocked(getShippingQuote).mockReturnValue(mockedReturnValue);
    const result = getShippingInfo("NYC");
    expect(result).toMatch(/1/i);
    expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$1 \(2 days\)/i);
  });

  it("should return shipping unavailable if mock function is not mocked", () => {
    const result = getShippingInfo("NYC");
    expect(result).toMatch(/unavailable/i);
  });
});

describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage();
    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  const order = {
    totalAmount: 10,
  };
  const creditCard = {
    creditCardNumber: "234",
    cvv: "455",
    expiryMonth: 3,
    expiryYear: 2030,
  };

  it("should return true when order and credit card are correct", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    //Action
    const result = await submitOrder(order, creditCard);

    //Assert
    expect(result.success).toBe(true);
  });

  it("should return error when can not make payment", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    //Action
    const result = await submitOrder(order, creditCard);

    //Assert
    expect(result).toEqual({ success: false, error: "payment_error" });
  });

  it("interaction testing", () => {
    expect(charge).toBeCalledWith(creditCard, order.totalAmount);
  });
});

describe("signUp", () => {
  const email = "name@domain.com";

  beforeEach(() => {
    vi.mocked(sendEmail).mockClear();
  });

  it("should return false if email is not valid", async () => {
    const result = await signUp("a");
    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });

  it("should send the welcome email if email is valid", async () => {
    const result = await signUp(email);
    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

describe("login", () => {
  it("should email the one-time login code", async () => {
    const email = "name@domain.com";
    const spy = vi.spyOn(security, "generateCode");

    await login(email);
    const securityCode = spy.mock.results[0].value.toString();

    expect(sendEmail).toHaveBeenLastCalledWith(email, securityCode);
  });
});

describe("isOnline", () => {
  it("should return true if current hour is within opening hours", () => {
    vi.setSystemTime("2025-01-01 08:00");
    expect(isOnline()).toBe(true);

    vi.setSystemTime("2025-01-01 20:00");
    expect(isOnline()).toBe(true);
  });

  it("should return false if current hour is outside opening hours", () => {
    vi.setSystemTime("2025-01-01 07:59");
    expect(isOnline()).toBe(false);

    vi.setSystemTime("2025-01-01 20:01");
    expect(isOnline()).toBe(false);
  });
});

describe("getDiscount", () => {
  it("should return discount = 0.2 when on Christmas day", () => {
    vi.setSystemTime("2025-12-25");
    expect(getDiscount()).toBe(0.2);
  });

  it("should return discount = 0 when any other day", () => {
    vi.setSystemTime("2025-12-24");
    expect(getDiscount()).toBe(0);
    vi.setSystemTime("2025-12-26");
    expect(getDiscount()).toBe(0);
  });
});
