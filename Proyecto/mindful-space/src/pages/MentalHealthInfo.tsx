import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMentalHealthResources } from "@/lib/api";

export default function MentalHealthInfo() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["mental-health-info"],
    queryFn: fetchMentalHealthResources,
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-2">Información sobre salud mental</h1>
        <p className="text-center text-muted-foreground mb-10">
          Contenido orientativo para comprender ansiedad, depresión y estrés.
        </p>

        {isLoading && <p className="text-center">Cargando información...</p>}
        {isError && <p className="text-center text-destructive">No se pudo cargar la información.</p>}

        <div className="grid gap-6">
          {data.map((topic) => (
            <Card key={topic.id} className="glass-card">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{topic.description}</p>

                <div>
                  <p className="font-medium mb-2">Síntomas frecuentes</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {topic.symptoms.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-2">Recomendaciones básicas</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {topic.recommendations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

