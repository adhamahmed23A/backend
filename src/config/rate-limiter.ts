import { rateLimit } from "express-rate-limit";
import { RedisStore, type RedisReply } from "rate-limit-redis";
import { env } from "./env";
import { redisConnection } from "../storage/redis";
import { logger } from "../shared/logger/logger";
const { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } = env;
export const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
  logger: logger,
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: new RedisStore({
    sendCommand: (command: string, ...args: string[]) =>
      redisConnection.call(command, ...args) as Promise<RedisReply>,
  }),
});
