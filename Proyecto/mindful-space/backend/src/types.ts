export type UserRole = "user" | "professional" | "admin";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  body: string;
  readingMinutes: number;
  createdAt: string;
}

