import * as trpcExpress from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import express from "express";
import cors from "cors";
import { bind } from "vite-express";
import { auth } from "./auth/auth.js";
import { createContext } from "./trpc/trpc.ts";
import { appRouter } from "./trpc/router.ts";
import { logger, httpLogger } from "./logger.ts";

const PORT = process.env.PORT || 3000;

const createServer = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://127.0.0.1:3000", // Explicit origin
      credentials: true, // Allow credentials
    })
  );
  app.use(httpLogger);
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
