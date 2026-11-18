import { logger } from "../../shared/logger/logger";

export const chatLogger = logger.child({
  module: "chat-service",
});
