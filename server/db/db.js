import "dotenv/config";
import process from "node:process";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

const sql = postgres(connectionString, {
  ssl: process.env.NODE_ENV === "production" ? "require" : undefined,
  max: 1,
  connect_timeout: 10,
});

export default sql;
