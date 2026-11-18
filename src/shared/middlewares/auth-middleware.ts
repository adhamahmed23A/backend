import { fromNodeHeaders } from "better-auth/node";
import { RequestHandler } from "express";
import { auth } from "../../features/auth/auth";
import { AppError } from "../errors/app-error";
import { HttpStatus } from "../http/http-status";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const headers = fromNodeHeaders(req.headers);
  const data = await auth.api.getSession({
    headers,
  });
  if (!data)
    return next(
      new AppError(
        HttpStatus.UNAUTHORIZED,
        "UNAUTHORIZED",
        "User is not authenticated",
      ),
    );
  req.user = data.user;
  req.session = data.session;
  return next();
};
