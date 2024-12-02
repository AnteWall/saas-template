import { protectedProcedure } from "../trpc.ts";

export const getOrganizationMembers = protectedProcedure.query(
  async (context) => {
    return {
      members: [],
    };
  }
);
