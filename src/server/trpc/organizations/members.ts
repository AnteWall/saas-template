import { prisma } from "src/server/datasources/prisma.ts";
import { protectedProcedure } from "../trpc.ts";
import { z } from "zod";
import { NotFoundError } from "../errors.ts";
import type { TRPCQueryProcedure } from "@trpc/server";

export const getOrganizationMembers: TRPCQueryProcedure<{
  input: {
    organizationId: string;
  };
  output: {
    members: {
      role: string | null;
      email: string;
      name: string;
      id: string;
      emailVerified: boolean;
    }[];
  };
}> = protectedProcedure
  .input(
    z.object({
      organizationId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const org = await prisma.organization.findUnique({
      where: {
        id: input.organizationId,
        members: {
          some: {
            userId: ctx.auth.user.id,
          },
        },
      },
    });
    if (!org) {
      throw new NotFoundError("Organization not found");
    }

    const members = await prisma.member.findMany({
      where: {
        organizationId: org.id,
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            emailVerified: true,
          },
        },
      },
    });

    return {
      members: members.map((m) => m.user),
    };
  });
