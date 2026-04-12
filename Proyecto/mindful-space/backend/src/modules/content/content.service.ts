import { randomUUID } from "node:crypto";
import { articles as inMemoryArticles } from "../../data/inMemoryStore.js";
import { pool } from "../../db.js";
import type { ArticleRecord } from "../../types.js";

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  body: string;
  reading_minutes: number;
  created_at: Date;
}

const mapRowToArticle = (row: ArticleRow): ArticleRecord => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  summary: row.summary,
  category: row.category,
  body: row.body,
  readingMinutes: row.reading_minutes,
  createdAt: row.created_at.toISOString(),
});

export async function listArticles(): Promise<ArticleRecord[]> {
  if (pool) {
    const result = await pool.query(
      "SELECT id, slug, title, summary, category, body, reading_minutes, created_at FROM articles ORDER BY created_at DESC",
    );
    return result.rows.map(mapRowToArticle);
  }
  return inMemoryArticles;
}

export async function getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  if (pool) {
    const result = await pool.query(
      "SELECT id, slug, title, summary, category, body, reading_minutes, created_at FROM articles WHERE slug = $1",
      [slug],
    );
    if (!result.rowCount) return null;
    return mapRowToArticle(result.rows[0]);
  }
  return inMemoryArticles.find((article) => article.slug === slug) || null;
}

export async function seedArticles() {
  if (pool) {
    const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM articles");
    if (countResult.rows[0].count > 0) return;

    for (const article of inMemoryArticles) {
      await pool.query(
        `INSERT INTO articles (id, slug, title, summary, category, body, reading_minutes, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          article.id || randomUUID(),
          article.slug,
          article.title,
          article.summary,
          article.category,
          article.body,
          article.readingMinutes,
          article.createdAt,
        ],
      );
    }
  }
}


