import { toNodeHandler } from "better-auth/node";
import express from "express";
import { bind } from "vite-express";
import { auth } from "./auth/auth.js";

const createServer = async () => {
  const app = express();
  // Auth routes
  app.all("/api/auth/*", toNodeHandler(auth));
  app.get("/hello", (_, res) => {
    res.send("Hello Vite + React + TypeScript!");
  });

  const server = app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });

  bind(app, server);
};

await createServer();
