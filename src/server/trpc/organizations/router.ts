import { getOrganizationMembers } from "./members.ts";
import { t } from "../trpc.ts";

export const organizationsRouter = t.router({
  getOrganizationMembers,
});

export type OrganizationsRouter = typeof organizationsRouter;
