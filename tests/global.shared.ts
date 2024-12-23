import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

let postgres: StartedPostgreSqlContainer | undefined = undefined;

export const startPostgresqlContainer = async () => {
  postgres = await new PostgreSqlContainer("postgres:16").start();
  console.log("Database started uri: ", postgres.getConnectionUri());
  process.env.DATABASE_URL = postgres.getConnectionUri();
};

export const stopPostgresqlContainer = async () => {
  if (postgres) {
    console.log("Stopping database connection");
    await postgres.stop();
  } else {
    console.log("No database to stop");
  }
};
