import { Left } from "./Left";
import { Right } from "./Right";

const fromNullable = (x) => (x != null ? Right(x) : Left(x));

export { fromNullable };
