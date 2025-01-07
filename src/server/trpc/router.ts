import { organizationsRouter } from "./organizations/router.ts";
import { t } from "./trpc.ts";

export const appRouter = t.router({
  organizations: organizationsRouter,
});
export type AppRouter = typeof appRouter;
