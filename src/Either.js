const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right: (${JSON.stringify(x)})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left: (${JSON.stringify(x)})`,
});

const EitherM = () => ({
  Right: (x) => ({
    chain: (f) => f(x),
    ap: (other) => other.map(x),
    map: (f) => Right(f(x)),
    fold: (_, g) => g(x),
    toString: () => `Right(${x})`,
  }),
  of: (x) => Right,
});

const Either = () => {
  const Right = (x) => ({
    chain: (f) => f(x),
    ap: (other) => other.map(x),
    alt: (other) => Right(x),
    extend: (f) => f(Right(x)),
    concat: (other) =>
      other.fold(
        (x) => other,
        (y) => Right(x.concat(y))
      ),
    traverse: (of, f) => f(x).map(Right),
    map: (f) => Right(f(x)),
    fold: (_, g) => g(x),
    toString: () => `Right(${x})`,
  });

  const Left = (x) => ({
    chain: (_) => Left(x),
    app: (_) => Left(x),
    extend: (_) => Left(x),
    alt: (other) => other,
    concat: (_) => Left(x),
    traverse: (of, _) => of(Left(x)),
    map: (_) => Left(x),
    fold: (f, _) => f(x),
    toString: () => `Left(${x})`,
  });

  const of = Right;
  const tryCatch = (f) => {
    try {
      return Right(f());
    } catch (e) {
      return Left(e);
    }
  };

  const fromNullable = (x) => (x != null ? Right(x) : Left(x));

  return { Right, Left, of, tryCatch, fromNullable };
};

export { Left, Right, Either, EitherM };
