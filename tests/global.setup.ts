import { startPostgresqlContainer } from "./global.shared";
import { test as setup } from "@playwright/test";

setup("starting database", async () => {
  await startPostgresqlContainer();
});
