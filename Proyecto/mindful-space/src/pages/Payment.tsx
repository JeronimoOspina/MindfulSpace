import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Calendar, Clock, User } from "lucide-react";
import { confirmAppointment, type AppointmentRecord } from "@/lib/appointmentStorage";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = (location.state as { appointment?: AppointmentRecord })?.appointment;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="glass-card max-w-md w-full text-center p-8">
          <p className="text-muted-foreground mb-4">No hay cita seleccionada.</p>
          <Link to="/teleconsult"><Button>Ir a Teleconsulta</Button></Link>
        </Card>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    confirmAppointment(appointment.id);
    setPaid(true);
    setLoading(false);
  };

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="glass-card max-w-md w-full text-center p-8 animate-fade-in">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
          <p className="text-muted-foreground mb-2">Tu cita ha sido confirmada y guardada en Mis Citas.</p>
          <div className="text-sm text-left space-y-1 mb-6 bg-muted/50 p-4 rounded-lg">
            <p><strong>Profesional:</strong> {appointment.professional.name}</p>
            <p><strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {appointment.time}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate("/teleconsult")} className="w-full">Ver mis citas</Button>
            <Link to="/"><Button variant="outline" className="w-full">Volver al inicio</Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Confirmar Pago</h1>

        <Card className="glass-card mb-6">
          <CardContent className="p-5 space-y-2">
            <p className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {appointment.professional.name}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(appointment.date).toLocaleDateString()}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-3 w-3" /> {appointment.time}</p>
            <p className="text-xl font-bold text-primary mt-2">${appointment.professional.price} USD</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Datos de Pago</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <Label>Número de tarjeta</Label>
                <Input placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vencimiento</Label>
                  <Input placeholder="MM/AA" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Procesando..." : `Pagar $${appointment.professional.price}`}
              </Button>
              <p className="text-xs text-center text-muted-foreground">Este es un pago simulado. No se procesará ningún cargo real.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
