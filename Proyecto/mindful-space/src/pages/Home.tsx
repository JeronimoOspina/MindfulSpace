import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Wind, Calendar, MessageCircle, Brain, Smile, Shield, BookOpen, Music, ClipboardCheck } from "lucide-react";

const features = [
  { icon: Wind, title: "Ejercicios de Respiración", desc: "Técnicas guiadas para reducir la ansiedad y encontrar la calma interior.", to: "/exercises", color: "bg-mindwell-sky" },
  { icon: BookOpen, title: "Biblioteca de Contenido", desc: "Artículos breves y prácticos sobre ansiedad, estrés y bienestar emocional.", to: "/library", color: "bg-mindwell-lavender" },
  { icon: Brain, title: "Informacion en Salud Mental", desc: "Conoce señales clave sobre ansiedad, depresion y estres de forma clara.", to: "/mental-health-info", color: "bg-mindwell-sage" },
  { icon: Music, title: "Musica para Relajarte", desc: "Playlist por categoria para pausar, respirar y regular emociones.", to: "/music", color: "bg-mindwell-peach" },
  { icon: ClipboardCheck, title: "Autoevaluacion", desc: "Test orientativo de ansiedad para identificar como te sientes hoy.", to: "/self-assessment", color: "bg-mindwell-sky" },
  { icon: Calendar, title: "Teleconsulta", desc: "Agenda citas con profesionales de salud mental desde la comodidad de tu hogar.", to: "/teleconsult", color: "bg-mindwell-sage" },
  { icon: MessageCircle, title: "Chatbot de Apoyo", desc: "Un compañero digital disponible 24/7 para escucharte y orientarte.", to: "/chatbot", color: "bg-mindwell-lavender" },
];

const infoCards = [
  { icon: Brain, title: "Ansiedad", desc: "Aprende a identificar y manejar los síntomas de ansiedad con herramientas prácticas." },
  { icon: Smile, title: "Bienestar Emocional", desc: "Descubre hábitos diarios que fortalecen tu salud emocional y resiliencia." },
  { icon: Shield, title: "Manejo del Estrés", desc: "Estrategias respaldadas por la ciencia para reducir el estrés en tu vida diaria." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mindwell-sky/30 via-transparent to-transparent pointer-events-none" />
        <div className="relative container mx-auto max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" /> Tu bienestar importa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Un espacio seguro para tu{" "}
            <span className="text-primary">salud mental</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Ejercicios guiados, acompañamiento profesional y un chatbot de apoyo emocional, todo en un solo lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/exercises"><Button size="lg">Comenzar ahora</Button></Link>
            <Link to="/teleconsult"><Button variant="outline" size="lg">Agendar consulta</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-10">¿Cómo podemos ayudarte?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link key={f.to} to={f.to}>
                <Card className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-xl ${f.color} mb-4`}>
                      <f.icon className="h-6 w-6 text-foreground/80" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-2">Recursos sobre Salud Mental</h2>
          <p className="text-center text-muted-foreground mb-10">Información y herramientas para tu bienestar</p>
          <div className="grid md:grid-cols-3 gap-6">
            {infoCards.map((c) => (
              <Card key={c.title} className="glass-card">
                <CardContent className="p-6">
                  <c.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© 2026 MindfulSpace — Tu bienestar, nuestra prioridad.</p>
      </footer>
    </div>
  );
}
