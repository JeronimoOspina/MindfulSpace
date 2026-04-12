export interface AppointmentProfessional {
  id: string;
  name: string;
  specialty: string;
  price: number;
}

export interface AppointmentRecord {
  id: string;
  professional: AppointmentProfessional;
  date: string;
  time: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

const STORAGE_KEY = "mindfulspace_appointments";

const readStorage = (): AppointmentRecord[] => {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as AppointmentRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStorage = (appointments: AppointmentRecord[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const loadAppointments = (): AppointmentRecord[] => readStorage();

export const upsertAppointment = (appointment: AppointmentRecord): AppointmentRecord[] => {
  const current = readStorage();
  const next = [appointment, ...current.filter((item) => item.id !== appointment.id)].sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt),
  );

  writeStorage(next);
  return next;
};

export const confirmAppointment = (appointmentId: string): AppointmentRecord[] => {
  const current = readStorage();
  const next = current.map((item) =>
    item.id === appointmentId ? { ...item, status: "confirmed" as const } : item,
  );

  writeStorage(next);
  return next;
};

