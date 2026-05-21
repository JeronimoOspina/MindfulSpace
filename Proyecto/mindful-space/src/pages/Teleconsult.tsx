import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any;
  }
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalIcon, Clock, User, Video } from "lucide-react";
import { loadAppointments, upsertAppointment, type AppointmentRecord } from "@/lib/appointmentStorage";

const professionals = [
  { id: "1", name: "Dra. María López", specialty: "Psicología Clínica", price: 50 },
  { id: "2", name: "Dr. Carlos Ruiz", specialty: "Psiquiatría", price: 70 },
  { id: "3", name: "Lic. Ana Torres", specialty: "Terapia Cognitivo-Conductual", price: 45 },
];

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function Teleconsult() {
  const [profId, setProfId] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => loadAppointments());
  const [roomInput, setRoomInput] = useState("");
  const [activeRoom, setActiveRoom] = useState("");
  const navigate = useNavigate();

  const prof = professionals.find((p) => p.id === profId);

  const handleBook = () => {
    if (!prof || !date || !time) return;
    const appt: AppointmentRecord = {
      id: crypto.randomUUID(),
      professional: prof,
      date: date.toISOString(),
      time,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setAppointments(upsertAppointment(appt));
    navigate("/payment", { state: { appointment: appt } });
  };

  const startCall = () => {
    const room = roomInput.trim() || `mindfulspace-${Math.random().toString(36).slice(2, 8)}`;
    setActiveRoom(room);
    setRoomInput(room);
  };

  const apiRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const endCall = () => {
    try {
      apiRef.current?.dispose?.();
    } catch (e) {
      // ignore dispose errors
    }
    apiRef.current = null;
    setActiveRoom("");
  };

  useEffect(() => {
    let mounted = true;
    if (!activeRoom) return;

    const loadAndStart = async () => {
      if (!mounted) return;
      if (!window.JitsiMeetExternalAPI) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://meet.jit.si/external_api.js";
          s.async = true;
          s.onload = () => resolve();
          s.onerror = (err) => reject(err);
          document.head.appendChild(s);
        });
      }

      if (!mounted) return;
      try {
        const domain = "meet.jit.si";
        const options = {
          roomName: activeRoom,
          parentNode: containerRef.current as HTMLElement,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: { TOOLBAR_BUTTONS: [] },
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        apiRef.current.addEventListener?.("readyToClose", () => {
          endCall();
        });
      } catch (err) {
        console.error("Error starting Jitsi call:", err);
      }
    };

    loadAndStart();

    return () => {
      mounted = false;
      try {
        apiRef.current?.dispose?.();
      } catch (e) {}
      apiRef.current = null;
    };
  }, [activeRoom]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-2">Teleconsulta</h1>
        <p className="text-center text-muted-foreground mb-10">Agenda una cita con un profesional de salud mental</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Agendar Cita</CardTitle>
              <p className="text-sm text-muted-foreground">Tus citas se guardan localmente para que las veas en Mis Citas.</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Profesional</Label>
                <Select value={profId} onValueChange={setProfId}>
                  <SelectTrigger><SelectValue placeholder="Selecciona un profesional" /></SelectTrigger>
                  <SelectContent>
                    {professionals.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} — {p.specialty} (${p.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fecha</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  className="rounded-lg border border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Hora</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <Button
                      key={t}
                      variant={time === t ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTime(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" disabled={!prof || !date || !time} onClick={handleBook}>
                Agendar y Pagar
              </Button>
            </CardContent>
          </Card>

          {/* Appointments list */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Mis Citas</h2>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-sm">No tienes citas programadas aún.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((a) => (
                  <Card key={a.id} className="glass-card">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium flex items-center gap-2"><User className="h-4 w-4" /> {a.professional.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <CalIcon className="h-3 w-3" /> {new Date(a.date).toLocaleDateString()}
                          <Clock className="h-3 w-3 ml-2" /> {a.time}
                        </p>
                      </div>
                      <Badge variant={a.status === "confirmed" ? "default" : "secondary"}>
                        {a.status === "confirmed" ? "Confirmada" : "Pendiente"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" /> Videollamada basica
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Puedes iniciar o unirte a una sala segura usando Jitsi Meet.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Nombre de sala (opcional)"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
              />
              <Button onClick={startCall}>Iniciar videollamada</Button>
            </div>

            {activeRoom && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Sala activa: {activeRoom}</p>
                <div className="flex items-start gap-3">
                  <div className="flex-1 aspect-video rounded-lg overflow-hidden border border-border">
                    <div ref={containerRef} className="w-full h-full" />
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="destructive" onClick={endCall}>Cerrar videollamada</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
