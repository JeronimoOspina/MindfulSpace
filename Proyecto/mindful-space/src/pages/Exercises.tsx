import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wind, Pause, Play, RotateCcw } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
}

const exercises: Exercise[] = [
  { id: "478", title: "Respiración 4-7-8", description: "Inhala 4s, sostén 7s, exhala 8s. Ideal para calmar la ansiedad rápidamente.", inhale: 4, hold: 7, exhale: 8 },
  { id: "box", title: "Respiración Cuadrada", description: "4 segundos para cada fase. Usada por atletas y militares para mantener la calma.", inhale: 4, hold: 4, exhale: 4 },
  { id: "relax", title: "Respiración Relajante", description: "Inhala profundamente y exhala lentamente. Perfecta antes de dormir.", inhale: 5, hold: 2, exhale: 7 },
];

type Phase = "idle" | "inhale" | "hold" | "exhale";

const phaseLabel: Record<Phase, string> = {
  idle: "Listo para comenzar",
  inhale: "Inhala...",
  hold: "Sostén...",
  exhale: "Exhala...",
};

export default function Exercises() {
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!running || !selected) return;
    const cycle = () => {
      setPhase("inhale");
      setSeconds(selected.inhale);
      timer.current = setTimeout(() => {
        setPhase("hold");
        setSeconds(selected.hold);
        timer.current = setTimeout(() => {
          setPhase("exhale");
          setSeconds(selected.exhale);
          timer.current = setTimeout(cycle, selected.exhale * 1000);
        }, selected.hold * 1000);
      }, selected.inhale * 1000);
    };
    cycle();
    return () => clearTimeout(timer.current);
  }, [running, selected]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, seconds]);

  const stop = () => {
    setRunning(false);
    setPhase("idle");
    clearTimeout(timer.current);
  };

  const circleScale = phase === "inhale" ? "scale-150" : phase === "exhale" ? "scale-100" : "scale-125";
  const transitionDuration = selected
    ? phase === "inhale"
      ? `${selected.inhale}s`
      : phase === "hold"
        ? `${selected.hold}s`
        : `${selected.exhale}s`
    : "4s";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">Ejercicios Guiados</h1>
        <p className="text-center text-muted-foreground mb-10">Elige un ejercicio de respiración y sigue las instrucciones</p>

        {!selected ? (
          <div className="grid md:grid-cols-3 gap-6">
            {exercises.map((ex) => (
              <Card key={ex.id} className="glass-card hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1" onClick={() => setSelected(ex)}>
                <CardContent className="p-6 text-center">
                  <Wind className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{ex.title}</h3>
                  <p className="text-sm text-muted-foreground">{ex.description}</p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {ex.inhale}s — {ex.hold}s — {ex.exhale}s
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <h2 className="text-2xl font-semibold">{selected.title}</h2>

            {/* Breathing circle */}
            <div className="relative flex items-center justify-center h-64 w-64">
              <div
                className={`absolute h-48 w-48 rounded-full bg-primary/20 transition-transform ease-in-out ${circleScale}`}
                style={{ transitionDuration }}
              />
              <div
                className={`absolute h-32 w-32 rounded-full bg-primary/30 transition-transform ease-in-out ${circleScale}`}
                style={{ transitionDuration }}
              />
              <div className="relative z-10 text-center">
                <p className="text-lg font-medium">{phaseLabel[phase]}</p>
                {running && <p className="text-3xl font-bold text-primary mt-1">{seconds}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              {!running ? (
                <Button onClick={() => setRunning(true)} size="lg">
                  <Play className="h-4 w-4 mr-2" /> Iniciar
                </Button>
              ) : (
                <Button onClick={stop} variant="outline" size="lg">
                  <Pause className="h-4 w-4 mr-2" /> Pausar
                </Button>
              )}
              <Button variant="ghost" size="lg" onClick={() => { stop(); setSelected(null); }}>
                <RotateCcw className="h-4 w-4 mr-2" /> Volver
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
