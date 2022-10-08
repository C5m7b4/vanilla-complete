import { isValid, formatMoney, getTotal, getItemCategory } from "../src/utils";
import { data } from "../src/data";

const testState = {
  categories: [
    { id: 1, name: "fruits" },
    { id: 2, name: "beverages" },
    { id: 3, name: "candy" },
  ],
};

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
  test("should handle an undefined value", () => {
    expect(formatMoney(undefined)).toEqual("");
  });
  test("should handle a null value", () => {
    expect(formatMoney(null)).toEqual("");
  });
});

describe("getTotal", () => {
  // we'll use our previous fake data for this
  test("should total fruit", () => {
    const fruit = data.filter((i) => i.category === "fruit");
    expect(getTotal(fruit)).toEqual(4.97);
  });
  test("should total beverages", () => {
    const bev = data.filter((i) => i.category === "beverages");
    expect(getTotal(bev)).toEqual(9.66);
  });
  test("should total candy", () => {
    const candy = data.filter((i) => i.category === "candy");
    expect(getTotal(candy)).toEqual(6.27);
  });
});

describe("getItemCategory", () => {
  test("should get fruit when given the id of 1", () => {
    expect(getItemCategory(1, testState)).toEqual("fruits");
  });
  test("should get beverages when given the id of 2", () => {
    expect(getItemCategory(2, testState)).toEqual("beverages");
  });
  test("should get candy when given the id of 3", () => {
    expect(getItemCategory(3, testState)).toEqual("candy");
  });
});
