import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Completa todos los campos"); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) navigate("/");
    else setError(result.message || "Email o contraseña incorrectos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md animate-fade-in glass-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <Heart className="h-10 w-10 text-primary fill-primary/20" />
          </div>
          <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
          <CardDescription>Inicia sesión para continuar tu camino de bienestar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar sesión"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate</Link>
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Demo: demo@mindwell.com / 123456
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
