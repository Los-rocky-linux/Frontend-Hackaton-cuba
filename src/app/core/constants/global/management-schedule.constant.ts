// management-schedule.constants.ts
export const MANAGEMENT_SCHEDULE_TABLE_COLUMNS = [
  {
    name: "Fecha Asignada",
    dataKey: "assignedDate",
    width: 150,
  },
  {
    name: "Tribunal Asignado",
    dataKey: "assignedCourt",
    width: 150,
  },
  {
    name: "Tutor Asignado",
    dataKey: "assignedTutor",
    width: 150,
  },
  {
    name: "Inscripción",
    dataKey: "enrollment",
    width: 150,
  },
  {
    name: "Estado",
    dataKey: "statusSchedule",
    width: 150,
  },
  {
    name: "Creado en",
    dataKey: "createdAt",
    width: 150,
  },
  {
    name: "Actualizado en",
    dataKey: "updatedAt",
    width: 150,
  },
];

export const MANAGEMENT_SCHEDULE_NG_SELECT_STATUS = [
  {
    id: true,
    name: "Activo",
  },
  {
    id: false,
    name: "Inactivo",
  },
];
