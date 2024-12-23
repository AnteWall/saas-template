import { pino } from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
  level:
    process.env.PINO_LOG_LEVEL || process.env.NODE_ENV === "production"
      ? "info"
      : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            singleLine: true,
          },
        },
  formatters: {
    bindings: (bindings) => {
      return {
        pid: bindings.pid,
        host: bindings.hostname,
        node_version: process.version,
      };
    },
  },
});

const IGNORED_PATHS = [
  new RegExp("/src/*"),
  new RegExp("/node_modules/*"),
  new RegExp("/.vite/*"),
  new RegExp("/@react-refresh"),
];

export const httpLogger = pinoHttp({
  logger: logger.child({ module: "express" }),
  autoLogging: {
    ignore(req) {
      return IGNORED_PATHS.some((path) => path.test(req.url || ""));
    },
  },
  redact: {
    paths: ["req.headers"],
    remove: true,
  },
});
