import { RequestHandler } from "express";
import type { z, ZodType } from "zod";
import { errorNormalizer } from "../errors/normalize-error";
type RequestSource = "body" | "params" | "query";
export const requestValidationMiddleware =
  (schema: ZodType, source: RequestSource = "body"): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) return next(errorNormalizer(result.error));
    if (source === "query") {
      // Express 5 defines req.query as a getter, so plain assignment fails
      Object.defineProperty(req, "query", {
        value: result.data,
        writable: true,
        configurable: true,
      });
    } else {
      req[source] = result.data as never;
    }
    next();
  };
