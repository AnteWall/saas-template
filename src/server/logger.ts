import { pino } from "pino";
export const logger = pino({
  level:
    process.env.PINO_LOG_LEVEL || process.env.NODE_ENV === "production"
      ? "info"
      : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
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
