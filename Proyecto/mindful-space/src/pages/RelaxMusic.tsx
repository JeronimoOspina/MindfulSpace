import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchMusicCatalog, type MusicTrack } from "@/lib/api";
import { Music4, Sparkles, ExternalLink } from "lucide-react";

type MusicCategory = "all" | "ansiedad" | "estres" | "dormir";

const labels: Record<MusicCategory, string> = {
  all: "Todas",
  ansiedad: "Ansiedad",
  estres: "Estrés",
  dormir: "Dormir",
};

export default function RelaxMusic() {
  const [category, setCategory] = useState<MusicCategory>("all");

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["music-catalog"],
    queryFn: fetchMusicCatalog,
  });

  const filtered = useMemo(() => {
    if (category === "all") return data;
    return data.filter((track) => track.category === category);
  }, [category, data]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-3">
            <Sparkles className="h-4 w-4" /> Un espacio para bajar revoluciones
          </div>
          <h1 className="text-3xl font-bold mb-2">Música para relajarte</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Elige una categoría y tómate unos minutos para respirar con calma. La idea no es forzarte a "estar bien", sino darte una pausa amable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(Object.keys(labels) as MusicCategory[]).map((key) => (
            <Button
              key={key}
              variant={category === key ? "default" : "outline"}
              onClick={() => setCategory(key)}
            >
              {labels[key]}
            </Button>
          ))}
        </div>

        {isLoading && <p className="text-center">Cargando música...</p>}
        {isError && <p className="text-center text-destructive">No se pudo cargar la música relajante.</p>}

        {!isLoading && !isError && (
          <p className="text-center text-sm text-muted-foreground mb-6 flex items-center justify-center gap-2">
            <Music4 className="h-4 w-4" />
            {filtered.length} sesiones disponibles en {labels[category].toLowerCase()}.
          </p>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((track: MusicTrack) => (
            <Card key={track.id} className="glass-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">{track.title}</CardTitle>
                <p className="text-sm text-muted-foreground capitalize">Categoria: {track.category}</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-lg border border-border">
                  <iframe
                    src={track.embedUrl}
                    title={track.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Si el reproductor no carga, abre la sesion directamente en YouTube.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href={track.watchUrl} target="_blank" rel="noreferrer">
                      Abrir en YouTube
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

