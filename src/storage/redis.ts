import IORedis from "ioredis";
import { env } from "../config/env";
import { logger } from "../shared/logger/logger";

const baseOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
};

// Used by the startup check and the Queue
export const redisConnection = new IORedis({
  ...baseOptions,
  maxRetriesPerRequest: 3,
});

// Used by the Worker only, since BullMQ requires null there
export const createWorkerConnection = () =>
  new IORedis({ ...baseOptions, maxRetriesPerRequest: null });

redisConnection.on("ready", () => logger.info("Redis connection is ready"));
redisConnection.on("error", (err) => logger.error({ err }, "Redis error"));

export const connectRedis = async () => {
  await redisConnection.ping(); // rejects if unreachable; startServer's catch logs and exits
};
