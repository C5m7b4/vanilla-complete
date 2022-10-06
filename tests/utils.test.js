import { isValid } from "../src/utils";

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
