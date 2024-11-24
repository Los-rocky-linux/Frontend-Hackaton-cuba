export const USER_TABLE_COLUMNS = [
  {
    name: "Nombre",
    dataKey: "name",
    width: 150,
  },
  {
    name: "Apellido",
    dataKey: "lastName",
    width: 150,
  },
  {
    name: "Correo",
    dataKey: "email",
    width: 150,
  },
  {
    name: "Teléfono",
    dataKey: "phone",
    width: 150,
  },
  {
    name: "rol",
    dataKey: "rol",
    width: 150,
  },
  {
    name: "Microsoft Id",
    dataKey: "microsoftId",
    width: 150,
  },
  {
    name: "Estado",
    dataKey: "status",
    width: 150,
  },
];


export const USER_NG_SELECT_STATUS = [
  {
    id: true,
    name: "Activo",
  },
  {
    id: false,
    name: "Inactivo",
  },
];

export const USER_VALIDATIONS = {
  NAME: { MAX_LENGTH: 20 },
  LASTNAME: { MAX_LENGTH: 20 },
  EMAIL: { MAX_LENGTH: 50 },
  PHONE: { MAX_LENGTH: 10 },
  ROL: { MAX_LENGTH: 20 },
  MICROSOFTID: { MAX_LENGTH: 50 },
  STATUS: { MAX_LENGTH: 20 },
}
