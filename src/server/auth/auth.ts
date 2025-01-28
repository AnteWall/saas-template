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
      const objArgs = args
        .map((arg) => {
          if (arg instanceof Error) {
            return {
              message: arg.message,
              stack: arg.stack,
            };
          }
          return arg;
        })
        .reduce((acc, arg) => {
          if (typeof arg === "object") {
            return {
              ...acc,
              ...arg,
            };
          }
          return acc;
        }, {});
      betterAuthLogger[level](objArgs, message);
    },
  },
  plugins: [admin(), organization()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      emailService.sendResetPassword({ user, url, token });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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
