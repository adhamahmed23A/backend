import express from "express";
import { httpLogger } from "./shared/logger/http-logger";
import { errorHandlerMiddleware } from "./shared/middlewares/error-handler.middleware";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./features/auth/auth";

export const createApp = () => {
  const app = express();
  app.use(httpLogger);
  app.all("/api/auth/*splat", toNodeHandler(auth));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandlerMiddleware);
  return app;
};
