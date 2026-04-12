import { Router } from "express";
import { getArticleBySlug, listArticles } from "./content.service.js";

export const contentRouter = Router();

contentRouter.get("/articles", async (_req, res) => {
  const articles = await listArticles();
  const summarized = articles.map((article) => {
    const { body: _body, ...rest } = article;
    return rest;
  });
  res.json(summarized);
});

contentRouter.get("/articles/:slug", async (req, res) => {
  const article = await getArticleBySlug(req.params.slug);

  if (!article) {
    return res.status(404).json({ message: "Articulo no encontrado" });
  }

  return res.json(article);
});


