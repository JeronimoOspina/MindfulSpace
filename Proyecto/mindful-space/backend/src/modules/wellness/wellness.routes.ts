import { Router } from "express";
import { ZodError } from "zod";
import {
  anxietyTestQuestions,
  mentalHealthTopics,
  musicCatalog,
  scoreAnxietyTest,
} from "./wellness.service.js";

export const wellnessRouter = Router();

wellnessRouter.get("/music", (_req, res) => {
  res.json(musicCatalog);
});

wellnessRouter.get("/resources", (_req, res) => {
  res.json(mentalHealthTopics);
});

wellnessRouter.get("/anxiety-test", (_req, res) => {
  res.json({
    title: "Autoevaluacion de ansiedad",
    disclaimer: "Resultado orientativo. No reemplaza diagnostico medico.",
    questions: anxietyTestQuestions,
  });
});

wellnessRouter.post("/anxiety-test/score", (req, res) => {
  try {
    const result = scoreAnxietyTest(req.body);
    return res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Respuestas invalidas", issues: error.issues });
    }
    return res.status(500).json({ message: "No se pudo calcular el resultado" });
  }
});

