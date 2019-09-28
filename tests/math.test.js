const math = require("../libs/math");

test("math basic", () => {
  const result = math.calculate("12 / (2.3 + 0.7)----");
  expect(result).toEqual(4);
});

test("math square root", () => {
    const result = math.calculate("sqrt(25)");
    expect(result).toEqual(5);
});

test("math power", () => {
    const result = math.calculate("6^2");
    expect(result).toEqual(36);
});
