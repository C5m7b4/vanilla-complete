/* eslint-disable no-unused-vars */
const Left = (x) => ({
  chain: () => Left(x),
  map: () => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

export { Left };
