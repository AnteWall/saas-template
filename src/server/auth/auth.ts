import { betterAuth, generateId } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../datasources/prisma.ts";
import { admin, organization } from "better-auth/plugins";
import { emailService } from "../datasources/email.ts";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [admin(), organization()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log(
        "Send reset password email to",
        user.email,
        url,
        token,
        request
      );
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
              id: generateId(),
              name: "Personal",
              Member: {
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
