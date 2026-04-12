import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../shared/requireAuth.js";
import { buildChatReply } from "./chat.service.js";

export const chatRouter = Router();

chatRouter.post("/messages", requireAuth, (req, res) => {
  try {
    const reply = buildChatReply(req.body);
    return res.json(reply);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Mensaje invalido", issues: error.issues });
    }
    return res.status(500).json({ message: "No se pudo procesar el mensaje" });
  }
});

