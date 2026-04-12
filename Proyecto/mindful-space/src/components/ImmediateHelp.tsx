import { useState } from "react";
import { AlertTriangle, Phone, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const hotlines = [
  { id: "106", label: "Linea 106 - Apoyo emocional", number: "106" },
  { id: "192", label: "Linea 192 - Emergencias", number: "192" },
  { id: "165", label: "Linea 165 - Violencia", number: "165" },
];

export default function ImmediateHelp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <Card className="mb-3 w-[320px] shadow-xl border-destructive/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-destructive flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" /> Necesitas ayuda?
                </p>
                <p className="text-sm text-muted-foreground mt-1">No estas solo, hay ayuda disponible.</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {hotlines.map((hotline) => (
                <a
                  key={hotline.id}
                  href={`tel:${hotline.number}`}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2 hover:bg-muted"
                >
                  <span className="text-sm">{hotline.label}</span>
                  <Phone className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Si estas en riesgo inmediato, contacta la linea de emergencias de tu ciudad.
            </p>
          </CardContent>
        </Card>
      )}

      <Button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full h-12 px-4 shadow-lg"
        variant={open ? "secondary" : "destructive"}
      >
        <AlertTriangle className="h-4 w-4 mr-2" /> Ayuda inmediata
      </Button>
    </div>
  );
}

