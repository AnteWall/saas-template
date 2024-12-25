import { migrateDatabase } from "./global.shared";
import { test as setup } from "@playwright/test";

setup("starting database", async () => {
  await migrateDatabase("postgresql://postgres:postgres@localhost:5433/test");
});
