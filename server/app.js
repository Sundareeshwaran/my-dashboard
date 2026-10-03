import "dotenv/config";
import express from "express";
import process from "node:process";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt";
import pg from "pg";
import sql from "./db/db.js";

const app = express();
const sessionSecret = process.env.SESSION_SECRET;
const isProduction = process.env.NODE_ENV === "production";
const { Pool } = pg;
const PgStore = connectPgSimple(session);
const sessionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  max: 1,
});
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not defined in the environment variables");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(
  session({
    secret: sessionSecret,
    proxy: isProduction,
    store: new PgStore({
      pool: sessionPool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      partitioned: isProduction,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  next();
};

app.post("/api/auth/login", async (req, res) => {
  res.set("Cache-Control", "no-store");
  const { user_name: userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ error: "user_name and password are required" });
  }

  try {
    const [user] = await sql`
      SELECT id, user_name, password
      FROM users
      WHERE user_name = ${userName}
      LIMIT 1
    `;

    if (
      !user ||
      typeof user.password !== "string" ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.regenerate((regenerateError) => {
      if (regenerateError) {
        console.error("Failed to create authentication session.", regenerateError);
        return res.status(503).json({ error: "Authentication service unavailable" });
      }

      req.session.user = { id: user.id, userName: user.user_name };
      req.session.save((saveError) => {
        if (saveError) {
          console.error("Failed to save authentication session.", saveError);
          return res
            .status(503)
            .json({ error: "Authentication service unavailable" });
        }

        res.json({ user: req.session.user });
      });
    });
  } catch (error) {
    console.error("Failed to authenticate user.", {
      message: error instanceof Error ? error.message : String(error),
      code: error?.code,
    });
    res.status(503).json({ error: "Authentication service unavailable" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Failed to destroy session.", error);
      return res.status(500).json({ error: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.sendStatus(204);
  });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ user: req.session.user });
});

app.get("/api/clients", requireAuth, async (req, res) => {
  try {
    const clients = await sql`
      SELECT id, client_name AS clientname, user_id, phone_number AS phoneNumber
      FROM clients
      WHERE user_id = ${req.session.user.id}
    `;
    res.json(clients);
  } catch (error) {
    console.error("Failed to fetch clients.", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

export default app;
