import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { envConfig } from "./config/env";
import AppDataSource from "./config/supabase";
import { errorHandler } from "./middleware/errorHandler";
import { limiter } from "./middleware/rateLimiter";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: envConfig.REACT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export const startServer = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Supabase PostgreSQL connected successfully.");
    }

    if (envConfig.NODE_ENV !== "test") {
      app.listen(envConfig.PORT, () => {
        console.log(`Server running on port ${envConfig.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error connecting to Supabase PostgreSQL.", error);
    process.exit(1);
  }
};

if (envConfig.NODE_ENV !== "test") {
  startServer();
}
