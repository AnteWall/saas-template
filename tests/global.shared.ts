import { execSync } from "child_process";

export const migrateDatabase = async (connectionUri: string) => {
  execSync("bun prisma migrate deploy", {
    env: {
      ...process.env,
      DATABASE_URL: connectionUri,
    },
  });
};

export const resetDatabase = async (connectionUri: string) => {
  if (process.env.NODE_ENV?.includes("prod")) {
    throw new Error(
      "Cannot reset database in production, please use a test environment"
    );
  }

  const res = execSync("bun prisma migrate reset --force --skip-generate", {
    env: {
      ...process.env,
      DATABASE_URL: connectionUri,
    },
  });
  if (!res.toString().includes("Database reset successful")) {
    console.error(res.toString());
    throw new Error("Database reset failed");
  }
};
