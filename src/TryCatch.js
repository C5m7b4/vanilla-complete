import { Left, Right } from "./Either";

const tryCatch = (f) => {
  try {
    return Right(f);
  } catch (error) {
    console.log("returning an error because this should fail");
    return Left(error);
  }
};

export default tryCatch;
