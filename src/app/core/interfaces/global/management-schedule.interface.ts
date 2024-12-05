// management-schedule.interface.ts
export interface Schedule {
  _id: string;
  assignedDate: Date;
  assignedCourt: string[]; // Array de IDs de usuarios
  assignedTutor?: string; // ID del tutor, opcional
  enrollment: string; // ID de la inscripción
  statusSchedule: boolean;
  createdAt?: Date; // Campo de timestamp opcional
  updatedAt?: Date; // Campo de timestamp opcional
}
