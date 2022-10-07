import { isValid, formatMoney } from "../src/utils";

describe("isValid", () => {
  test("should return false for undefined", () => {
    expect(isValid(undefined)).toEqual(false);
  });
  test("shoudl return false for null values", () => {
    expect(isValid(null)).toEqual(false);
  });
  test("should return true for an int", () => {
    expect(isValid(1)).toEqual(true);
  });
  test("should return true for a string", () => {
    expect(isValid("hello")).toEqual(true);
  });
  test("should return true for an array", () => {
    expect(isValid([1, 2, 3])).toEqual(true);
  });
  test("should return true for an object", () => {
    expect(isValid({ name: "mike" })).toEqual(true);
  });
});

describe("formatMoney", () => {
  test("should return a dollar value if given 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });
  test("should return 2 decimal places when given 1", () => {
    expect(formatMoney(1.1)).toEqual("1.10");
  });
  test("should always return 2 decimal places", () => {
    expect(formatMoney(1.23456789)).toEqual("1.23");
  });
});
