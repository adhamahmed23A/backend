import "dotenv/config";
import { env } from "./config/env";
import { createApp } from "./app";
import { logger } from "./shared/logger/logger";

const { PORT } = env;
const app = createApp();
app.listen(PORT, () => {
  logger.info({ port: PORT }, "The server is running on");
});
