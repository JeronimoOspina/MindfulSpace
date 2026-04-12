export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "professional" | "admin";
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingMinutes: number;
  createdAt: string;
}

export interface ArticleDetail extends ArticleSummary {
  body: string;
}

export interface ChatResponse {
  response: string;
  recommendations: string[];
}

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

export interface AnxietyTestPayload {
  title: string;
  disclaimer: string;
  questions: AnxietyQuestion[];
}

export interface AnxietyScoreResult {
  total: number;
  level: "Bajo" | "Medio" | "Alto";
  guidance: string;
  disclaimer: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.json().catch(() => ({ message: "Error inesperado" }));
    throw new ApiError(message.message || "No se pudo completar la solicitud", response.status);
  }

  return (await response.json()) as T;
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchArticles(): Promise<ArticleSummary[]> {
  return request<ArticleSummary[]>("/content/articles");
}

export async function fetchArticle(slug: string): Promise<ArticleDetail> {
  return request<ArticleDetail>(`/content/articles/${slug}`);
}

export async function sendChatMessage(message: string, token: string): Promise<ChatResponse> {
  return request<ChatResponse>("/chat/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  }, token);
}

export async function fetchMusicCatalog(): Promise<MusicTrack[]> {
  return request<MusicTrack[]>("/wellness/music");
}

export async function fetchMentalHealthResources(): Promise<MentalHealthTopic[]> {
  return request<MentalHealthTopic[]>("/wellness/resources");
}

export async function fetchAnxietyTest(): Promise<AnxietyTestPayload> {
  return request<AnxietyTestPayload>("/wellness/anxiety-test");
}

export async function scoreAnxietyTest(answers: number[]): Promise<AnxietyScoreResult> {
  return request<AnxietyScoreResult>("/wellness/anxiety-test/score", {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}


