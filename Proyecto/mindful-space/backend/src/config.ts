import dotenv from "dotenv";

dotenv.config();

const parsePort = (value: string | undefined): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 4000;
};

const parseOrigins = (value: string | undefined): string[] => {
  if (!value?.trim()) {
    return ["http://localhost:8080", "http://localhost:5173", "https://*.vercel.app"];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const config = {
  port: parsePort(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET || "mindfulspace-dev-secret",
  databaseUrl: process.env.DATABASE_URL,
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
};

