import { Router } from "express";
import { ZodError } from "zod";
import { loginUser, registerUser } from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Datos invalidos", issues: error.issues });
    }
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ message: "El correo ya esta registrado" });
    }
    return res.status(500).json({ message: "No se pudo registrar el usuario" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Datos invalidos", issues: error.issues });
    }
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }
    return res.status(500).json({ message: "No se pudo iniciar sesion" });
  }
});

