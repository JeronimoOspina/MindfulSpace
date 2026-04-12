import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { chatRouter } from "./modules/chat/chat.routes.js";
import { contentRouter } from "./modules/content/content.routes.js";
import { wellnessRouter } from "./modules/wellness/wellness.routes.js";

const isOriginAllowed = (origin: string): boolean => {
  return config.corsOrigins.some((allowedOrigin) => {
    if (allowedOrigin === origin) return true;
    if (allowedOrigin === "https://*.vercel.app") {
      return /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);
    }
    return false;
  });
};

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || isOriginAllowed(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
    }),
  );
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/content", contentRouter);
  app.use("/api/wellness", wellnessRouter);

  return app;
}

