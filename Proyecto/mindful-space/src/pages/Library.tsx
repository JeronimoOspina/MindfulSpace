import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchArticles, type ArticleSummary } from "@/lib/api";

export default function Library() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        if (active) {
          setArticles(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "No se pudo cargar la biblioteca");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadArticles();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Biblioteca de Bienestar</h1>
        <p className="text-center text-muted-foreground mb-10">Artículos prácticos para ansiedad, estrés y descanso</p>

        {loading && <p className="text-center">Cargando artículos...</p>}
        {error && <p className="text-center text-destructive">{error}</p>}

        <div className="grid gap-4">
          {articles.map((article) => (
            <Link key={article.id} to={`/library/${article.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{article.summary}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.category}</span>
                    <span>{article.readingMinutes} min lectura</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

