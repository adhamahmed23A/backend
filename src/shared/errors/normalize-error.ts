import { ZodError } from "zod";
import { AppError } from "./app-error";
import { HttpStatus } from "../http/http-status";
import { SharedErrorCode } from "./error-codes";

export const errorNormalizer = (err: any) => {
  if (err instanceof AppError) return err;
  if (err instanceof ZodError) {
    return new AppError(
      HttpStatus.BAD_REQUEST,
      SharedErrorCode.VALIDATION_ERROR,
      "Validation failed",
      err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
      { cause: err },
    );
  }
  return new AppError(
    HttpStatus.INTERNAL_SERVER_ERROR,
    SharedErrorCode.INTERNAL_ERROR,
    "Internal server error",
  );
};
