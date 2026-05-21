import bcrypt from "bcryptjs";
import type { ArticleRecord, UserRecord } from "../types.js";

const now = new Date().toISOString();

export const users: UserRecord[] = [
  {
    id: "u-demo-1",
    name: "Usuario Demo",
    email: "demo@mindwell.com",
    passwordHash: bcrypt.hashSync("123456", 10),
    role: "user",
    createdAt: now,
  },
];

export const articles: ArticleRecord[] = [
  {
    id: "a-1",
    slug: "manejo-ansiedad-diaria",
    title: "Manejo de la ansiedad en el día a día",
    summary: "Técnicas prácticas para bajar la activación física y mental.",
    category: "Ansiedad",
    body: "Empieza por respirar profundo durante un minuto. Luego identifica el pensamiento que te preocupa y reformulalo con lenguaje mas realista. Termina con una accion corta y posible para recuperar control.",
    readingMinutes: 4,
    createdAt: now,
  },
  {
    id: "a-2",
    slug: "higiene-del-sueno",
    title: "Higiene del sueno para descansar mejor",
    summary: "Rutina simple para mejorar el descanso y reducir el estres nocturno.",
    category: "Sueño",
    body: "Intenta mantener horarios consistentes, baja las luces una hora antes de dormir y evita cafeína por la tarde. Si no concilias el sueño en 20 minutos, levántate y realiza una actividad tranquila.",
    readingMinutes: 5,
    createdAt: now,
  },
  {
    id: "a-3",
    slug: "micro-habitos-antiestrés",
    title: "Micro hábitos para reducir estrés",
    summary: "Pequeños cambios diarios que suman bienestar emocional.",
    category: "Estrés",
    body: "Define pausas de 2 minutos cada 3 horas, hidrata tu cuerpo, mueve cuello y hombros y anota una cosa positiva al final del día. La consistencia gana a la intensidad.",
    readingMinutes: 3,
    createdAt: now,
  },
];


