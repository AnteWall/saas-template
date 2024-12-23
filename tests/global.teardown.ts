import { stopPostgresqlContainer } from "./global.shared";
import { test as teardown } from "@playwright/test";

teardown("stopping database", async () => {
  await stopPostgresqlContainer();
});
