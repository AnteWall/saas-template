import { getOrganizationMembers } from "./organizations/members.ts";
import { t } from "./trpc.ts";

export const appRouter = t.router({
  getOrganizationMembers,
});
export type AppRouter = typeof appRouter;
