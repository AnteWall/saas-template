import { resetDatabase } from "./global.shared";
import { test as teardown } from "@playwright/test";

teardown("stopping database", async () => {
  await resetDatabase("postgresql://postgres:postgres@localhost:5433/test");
});
