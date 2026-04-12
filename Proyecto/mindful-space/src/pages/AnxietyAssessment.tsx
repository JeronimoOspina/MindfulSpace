import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAnxietyTest, scoreAnxietyTest, type AnxietyScoreResult } from "@/lib/api";

export default function AnxietyAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AnxietyScoreResult | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["anxiety-test"],
    queryFn: fetchAnxietyTest,
  });

  const mutation = useMutation({
    mutationFn: scoreAnxietyTest,
    onSuccess: (value) => setResult(value),
  });

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const submit = () => {
    if (!data?.questions?.length || answeredCount !== data.questions.length) return;
    const payload = data.questions.map((question) => answers[question.id] ?? 0);
    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">Autoevaluacion</h1>
        <p className="text-center text-muted-foreground mb-8">
          Test orientativo de ansiedad. No reemplaza evaluacion profesional.
        </p>

        {isLoading && <p className="text-center">Cargando test...</p>}
        {isError && <p className="text-center text-destructive">No se pudo cargar el test.</p>}

        {data && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{data.disclaimer}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <p className="font-medium">
                    {index + 1}. {question.text}
                  </p>
                  <div className="grid gap-2">
                    {question.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                        className={`text-left rounded-md border px-3 py-2 text-sm transition-colors ${
                          answers[question.id] === option.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <Button onClick={submit} disabled={answeredCount !== data.questions.length || mutation.isPending}>
                {mutation.isPending ? "Calculando..." : "Ver resultado"}
              </Button>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mt-6 border-primary/20">
            <CardHeader>
              <CardTitle>Resultado: nivel {result.level}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">Puntaje total: {result.total}</p>
              <p>{result.guidance}</p>
              <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

