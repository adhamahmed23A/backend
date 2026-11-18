import { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error";
import { sendError } from "../http/send-response";
import { errorNormalizer } from "../errors/normalize-error";
import { Level } from "pino";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // normalize all errors into app error

  const error = errorNormalizer(err);

  // logging the error

  const level: Level = error.statusCode >= 500 ? "error" : "warn";
  req.log[level]({ err, code: error.code }, "Request failed");

  // handling the app error

  const { message, code, statusCode, details } = error;
  return sendError(res, message, code, statusCode, details);
};
