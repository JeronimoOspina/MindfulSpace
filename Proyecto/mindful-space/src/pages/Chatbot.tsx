import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { sendChatMessage } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const suggestions = [
  "Me siento ansioso",
  "Necesito relajarme",
  "No puedo dormir",
  "Tengo mucho estres",
  "Me siento triste",
  "Me siento solo",
  "No tengo energia",
  "Quiero ayuda inmediata",
  "Quiero escuchar musica",
  "Necesito una autoevaluacion",
];

const responses: Record<string, string> = {
  ansioso: "Es normal sentir ansiedad a veces. Puedes probar un ciclo de respiración 4-7-8, caminar durante 5 minutos y reducir cafeína. Si quieres, también puedo llevarte a música suave o a la autoevaluación.",
  relajarme: "Claro. Intenta relajar hombros, lengua y mandíbula por 30 segundos. Después haz una pausa breve y vuelve a tu respiración. También puedes usar nuestros ejercicios guiados o una playlist tranquila.",
  dormir: "Para mejorar tu sueño, intenta mantener un horario regular, evita pantallas antes de acostarte y usa una sesión de música para dormir. Si quieres, te comparto una rutina simple de 3 pasos.",
  triste: "Lamento que te sientas así. Está bien pedir apoyo. Hablar con alguien de confianza, mantener una rutina mínima y agendar teleconsulta puede ayudarte a no cargarlo solo.",
  estres: "Cuando el estres se acumula, sirve dividir el dia en bloques pequeños. Haz una cosa a la vez, toma agua y regresa a tu respiración por un minuto.",
  ayuda: "Si sientes que necesitas ayuda inmediata, usa el boton flotante de ayuda: tiene las lineas 106, 192 y 165. No estas solo, hay ayuda disponible.",
  musica: "La musica suave puede ayudar a bajar la activacion. Puedes abrir la seccion de musica relajante y elegir entre ansiedad, estres o dormir.",
  autoevaluacion: "La autoevaluacion te ayuda a tener una idea orientativa de como te sientes hoy. No reemplaza a un profesional, pero puede ser un primer paso.",
  teleconsulta: "Si quieres apoyo humano, puedes agendar una teleconsulta y luego confirmar la cita desde el flujo de pago simulado.",
  solo: "Sentirse solo pesa mucho. Hoy puede ayudar escribirle a alguien de confianza, salir al aire libre unos minutos o pedir apoyo profesional si lo necesitas.",
  energia: "Cuando falta energia, intenta bajar el objetivo del dia: agua, comida simple, una pausa y una tarea pequeña. A veces lo minimo ya es suficiente.",
  default: "Gracias por compartir. Estoy aquí para ayudarte con herramientas simples y seguras: respiración, música, biblioteca, autoevaluación o teleconsulta.",
};

const TOKEN_KEY = "mindfulspace_token";

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("ayuda") || lower.includes("urgente") || lower.includes("crisis") || lower.includes("106") || lower.includes("192") || lower.includes("165")) return responses.ayuda;
  if (lower.includes("ansios") || lower.includes("ansiedad")) return responses.ansioso;
  if (lower.includes("relaj") || lower.includes("calm")) return responses.relajarme;
  if (lower.includes("dorm") || lower.includes("sueño") || lower.includes("insomn")) return responses.dormir;
  if (lower.includes("estres") || lower.includes("tens") || lower.includes("agot")) return responses.estres;
  if (lower.includes("trist") || lower.includes("deprimi") || lower.includes("mal")) return responses.triste;
  if (lower.includes("solo") || lower.includes("aislad") || lower.includes("nadie")) return responses.solo;
  if (lower.includes("energia") || lower.includes("agotad") || lower.includes("sin ganas")) return responses.energia;
  if (lower.includes("musica") || lower.includes("música") || lower.includes("playlist")) return responses.musica;
  if (lower.includes("test") || lower.includes("autoevalu") || lower.includes("cuestion")) return responses.autoevaluacion;
  if (lower.includes("cita") || lower.includes("teleconsulta") || lower.includes("profesional")) return responses.teleconsulta;
  return responses.default;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", text: "¡Hola! Soy tu asistente de bienestar. ¿Cómo te sientes hoy? Puedes escribirme o usar las sugerencias rápidas." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text: "Tu sesion expiro. Inicia sesion nuevamente." },
      ]);
      setTyping(false);
      return;
    }

    sendChatMessage(text, token)
      .then((reply) => {
        const recommendations = reply.recommendations.length
          ? `\n\nRecomendaciones:\n- ${reply.recommendations.join("\n- ")}`
          : "";
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: "bot",
          text: `${reply.response}${recommendations}`,
        };
        setMessages((prev) => [...prev, botMsg]);
      })
      .catch(() => {
        const botMsg: Message = { id: crypto.randomUUID(), role: "bot", text: getResponse(text) };
        setMessages((prev) => [...prev, botMsg]);
      })
      .finally(() => setTyping(false));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-6 animate-fade-in">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-3">
            Un espacio seguro para expresarte
          </p>
          <h1 className="text-3xl font-bold mb-2">Chatbot de Apoyo</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Puedes hablar de ansiedad, estres, sueno, musica, autoevaluacion o pedir orientacion para agendar apoyo.
          </p>
        </div>

        <Card className="glass-card flex flex-col h-[560px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${m.role === "bot" ? "bg-primary/10" : "bg-secondary"}`}>
                  {m.role === "bot" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-secondary-foreground" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${m.role === "bot" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm text-muted-foreground">
                  Escribiendo<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {messages.length <= 2 && suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-secondary/80 transition-colors border border-border/50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Escribe cómo te sientes..."
              className="flex-1"
            />
            <Button size="icon" onClick={() => send(input)} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
