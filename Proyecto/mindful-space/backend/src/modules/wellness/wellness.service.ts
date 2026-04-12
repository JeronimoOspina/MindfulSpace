import { z } from "zod";

export interface MusicTrack {
  id: string;
  title: string;
  category: "ansiedad" | "estres" | "dormir";
  source: "youtube";
  embedUrl: string;
  watchUrl: string;
}

export interface MentalHealthTopic {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  recommendations: string[];
}

export interface AnxietyQuestion {
  id: string;
  text: string;
  options: Array<{ label: string; value: number }>;
}

const scoreSchema = z.object({
  answers: z.array(z.number().min(0).max(3)).min(1),
});

export const musicCatalog: MusicTrack[] = [
  {
    id: "music-1",
    title: "Respiracion y calma",
    category: "ansiedad",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/1ZYbU82GVz4?rel=0&modestbranding=1",
    watchUrl: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
  },
  {
    id: "music-2",
    title: "Pausa mental suave",
    category: "estres",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/ZToicYcHIOU?rel=0&modestbranding=1",
    watchUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
  },

  {
    id: "music-4",
    title: "Meditacion suave para ansiedad",
    category: "ansiedad",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/1ZYbU82GVz4?rel=0&modestbranding=1&start=180",
    watchUrl: "https://www.youtube.com/watch?v=1ZYbU82GVz4&t=180s",
  },
  {
    id: "music-5",
    title: "Lluvia y piano para soltar tension",
    category: "estres",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/ZToicYcHIOU?rel=0&modestbranding=1&start=150",
    watchUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU&t=150s",
  },

  {
    id: "music-7",
    title: "Respira y vuelve al presente",
    category: "ansiedad",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/1ZYbU82GVz4?rel=0&modestbranding=1&start=360",
    watchUrl: "https://www.youtube.com/watch?v=1ZYbU82GVz4&t=360s",
  },
  {
    id: "music-8",
    title: "Pausa de tarde para estres alto",
    category: "estres",
    source: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/ZToicYcHIOU?rel=0&modestbranding=1&start=360",
    watchUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU&t=360s",
  },
];

export const mentalHealthTopics: MentalHealthTopic[] = [
  {
    id: "anxiety",
    title: "Ansiedad",
    description:
      "La ansiedad es una respuesta natural ante situaciones de alerta, pero puede volverse intensa y frecuente.",
    symptoms: ["Preocupacion constante", "Tension muscular", "Dificultad para concentrarse"],
    recommendations: [
      "Practica respiracion 4-7-8 por 3 minutos",
      "Reduce cafeina y estimulos antes de dormir",
      "Busca apoyo profesional si interfiere en tu rutina",
    ],
  },
  {
    id: "depression",
    title: "Depresion",
    description:
      "La depresion puede afectar el estado de animo, la energia y la motivacion durante semanas o meses.",
    symptoms: ["Tristeza persistente", "Perdida de interes", "Cambios en sueno o apetito"],
    recommendations: [
      "Mantener pequenas rutinas diarias",
      "Hablar con alguien de confianza",
      "Consultar a un profesional de salud mental",
    ],
  },
  {
    id: "stress",
    title: "Estres",
    description:
      "El estres es una reaccion del cuerpo ante demandas externas. Puede manejarse con estrategias simples.",
    symptoms: ["Irritabilidad", "Cansancio", "Dolor de cabeza o tension fisica"],
    recommendations: [
      "Haz pausas de 2 minutos cada pocas horas",
      "Prioriza una tarea clave por bloque de tiempo",
      "Incorpora actividad fisica ligera diaria",
    ],
  },
];

export const anxietyTestQuestions: AnxietyQuestion[] = [
  {
    id: "q1",
    text: "En la ultima semana, ¿con que frecuencia te sentiste nervioso o en tension?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Algunos dias", value: 1 },
      { label: "Mas de la mitad de los dias", value: 2 },
      { label: "Casi todos los dias", value: 3 },
    ],
  },
  {
    id: "q2",
    text: "¿Te costo controlar tus preocupaciones?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Algunos dias", value: 1 },
      { label: "Mas de la mitad de los dias", value: 2 },
      { label: "Casi todos los dias", value: 3 },
    ],
  },
  {
    id: "q3",
    text: "¿Tuviste dificultad para relajarte?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Algunos dias", value: 1 },
      { label: "Mas de la mitad de los dias", value: 2 },
      { label: "Casi todos los dias", value: 3 },
    ],
  },
  {
    id: "q4",
    text: "¿Sentiste inquietud fisica o mental?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Algunos dias", value: 1 },
      { label: "Mas de la mitad de los dias", value: 2 },
      { label: "Casi todos los dias", value: 3 },
    ],
  },
  {
    id: "q5",
    text: "¿Te resulto dificil dejar de anticipar escenarios negativos?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Algunos dias", value: 1 },
      { label: "Mas de la mitad de los dias", value: 2 },
      { label: "Casi todos los dias", value: 3 },
    ],
  },
];

export function scoreAnxietyTest(payload: unknown) {
  const input = scoreSchema.parse(payload);
  const total = input.answers.reduce((sum, value) => sum + value, 0);

  let level: "Bajo" | "Medio" | "Alto" = "Bajo";
  let guidance = "Tu resultado sugiere un nivel bajo de ansiedad. Mantener habitos de autocuidado puede ayudarte.";

  if (total >= 7 && total <= 11) {
    level = "Medio";
    guidance =
      "Tu resultado sugiere ansiedad moderada. Considera practicar ejercicios de respiracion y hablar con un profesional si persiste.";
  }

  if (total >= 12) {
    level = "Alto";
    guidance =
      "Tu resultado sugiere ansiedad alta. Este test es orientativo, no diagnostico. Te recomendamos buscar apoyo profesional pronto.";
  }

  return {
    total,
    level,
    guidance,
    disclaimer: "Resultado orientativo. No reemplaza evaluacion clinica profesional.",
  };
}

