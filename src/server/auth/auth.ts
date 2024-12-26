import { betterAuth, generateId } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../datasources/prisma.ts";
import { admin, organization } from "better-auth/plugins";
import { emailService } from "../datasources/email.ts";
import { logger } from "../logger.ts";
import { createId } from "@paralleldrive/cuid2";

const betterAuthLogger = logger.child({ module: "better-auth" });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  logger: {
    log(level, message, ...args) {
      betterAuthLogger[level](message, ...args);
    },
  },
  plugins: [admin(), organization()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      emailService.sendResetPassword({ user, url, token });
    },
  },
  socialProviders: {},
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.organization.create({
            data: {
              createdAt: new Date(),
              id: createId(),
              name: "Personal",
              members: {
                create: {
                  role: "owner",
                  userId: user.id,
                  id: generateId(),
                  createdAt: new Date(),
                },
              },
            },
          });
        },
      },
    },
  },
});
