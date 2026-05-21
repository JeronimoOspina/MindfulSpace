import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/exercises", label: "Ejercicios" },
  { to: "/library", label: "Biblioteca" },
  { to: "/mental-health-info", label: "Información" },
  { to: "/music", label: "Música" },
  { to: "/self-assessment", label: "Autoevaluación" },
  { to: "/teleconsult", label: "Teleconsulta" },
  { to: "/chatbot", label: "Chatbot" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl" style={{ fontFamily: "Outfit" }}>
          <Heart className="h-6 w-6 fill-primary/30" />
          MindfulSpace
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated && navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">Hola, {user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" /> Salir
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Iniciar sesión</Button></Link>
              <Link to="/register"><Button size="sm">Registrarse</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-card p-4 space-y-2 animate-fade-in">
          {isAuthenticated && navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2 rounded-lg text-sm font-medium",
                pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border/50">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { logout(); setOpen(false); }}>
                <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setOpen(false)}><Button variant="ghost" size="sm" className="w-full">Iniciar sesión</Button></Link>
                <Link to="/register" onClick={() => setOpen(false)}><Button size="sm" className="w-full">Registrarse</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
