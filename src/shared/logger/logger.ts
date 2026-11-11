import pino, { LoggerOptions } from "pino";
import { env } from "../../config/env";

const { LOG_LEVEL } = env;

const options: LoggerOptions = {
  base: { service: "sonor_v2" },
  level: LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,

  formatters: {
    level(label) {
      return { level: label };
    },
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};
export const logger = pino(options);
