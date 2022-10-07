const Left = (x) => ({
  chain: () => Left(x),
  map: () => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

export { Left };
