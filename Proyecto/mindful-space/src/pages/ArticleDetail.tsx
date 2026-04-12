import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchArticle, type ArticleDetail as Article } from "@/lib/api";

export function ArticleDetailPage() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!articleSlug) {
      setError("Articulo invalido");
      setLoading(false);
      return;
    }

    let active = true;
    const loadArticle = async () => {
      try {
        const data = await fetchArticle(articleSlug);
        if (active) {
          setArticle(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "No se pudo cargar el articulo");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadArticle();
    return () => {
      active = false;
    };
  }, [articleSlug]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link className="text-sm text-primary hover:underline" to="/library">
          Volver a biblioteca
        </Link>

        {loading && <p className="mt-6">Cargando articulo...</p>}
        {error && <p className="mt-6 text-destructive">{error}</p>}

        {article && (
          <Card className="mt-4">
            <CardHeader>
              <p className="text-sm text-muted-foreground">{article.category}</p>
              <CardTitle className="text-2xl">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{article.summary}</p>
              <p className="leading-7">{article.body}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

