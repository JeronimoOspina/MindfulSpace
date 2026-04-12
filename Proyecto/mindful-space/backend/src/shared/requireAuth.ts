import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

declare module "express-serve-static-core" {
  interface Request {
    authUser?: {
      sub: string;
      email: string;
      role: string;
      name: string;
    };
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as Request["authUser"];
    req.authUser = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Token invalido" });
  }
}

