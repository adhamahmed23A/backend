import "dotenv/config";
import { env } from "./config/env";
import { createApp } from "./app";
import { logger } from "./shared/logger/logger";
import { connectRedis } from "./storage/redis";
import { createProcessingWorker } from "./features/documents/workers/processing-worker";

const { PORT } = env;
const startServer = async () => {
  try {
    await connectRedis();
    const { processingWorker, connection } = createProcessingWorker();
    const app = createApp();
    app.listen(PORT, () => {
      logger.info({ port: PORT }, "The server is running on");
    });
  } catch (err) {
    logger.error({ err }, "Failed to start the server");
    process.exit(1);
  }
};
startServer();
