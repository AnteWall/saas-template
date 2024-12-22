import * as trpcExpress from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import express from "express";
import { bind } from "vite-express";
import { auth } from "./auth/auth.js";
import { createContext } from "./trpc/trpc.ts";
import { appRouter } from "./trpc/router.ts";
import { logger } from "./logger.ts";
import { pinoHttp } from "pino-http";

const PORT = process.env.PORT || 3000;

const IGNORED_PATHS = [
  new RegExp("/src/*"),
  new RegExp("/node_modules/*"),
  new RegExp("/.vite/*"),
  new RegExp("/@react-refresh"),
];

const createServer = async () => {
  const app = express();
  app.use(
    pinoHttp({
      logger: logger.child({ module: "express" }),
      autoLogging: {
        ignore(req) {
          return IGNORED_PATHS.some((path) => path.test(req.url));
        },
      },
      redact: {
        paths: ["req.headers"],
        remove: true,
      },
    })
  );
  // Auth routes
  app.all("/api/auth/*", toNodeHandler(auth));
  app.get("/hello", (_, res) => {
    res.send("Hello Vite + React + TypeScript!");
  });
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  const server = app.listen(PORT, () => {
    logger.info(
      {
        url: `http://localhost:${PORT}`,
      },
      `Server started`
    );
  });

  bind(app, server);
};

await createServer();
