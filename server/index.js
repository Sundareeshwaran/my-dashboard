import "dotenv/config";
import process from "node:process";
import sql from "./db/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sql`SELECT 1`;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Unable to connect to the database. Server not started.",
      error,
    );
    process.exitCode = 1;
  }
};

startServer();
