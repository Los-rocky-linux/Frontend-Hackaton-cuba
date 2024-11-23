export const USER_TABLE_COLUMNS = [
  {
    name: "Nombre",
    prop: "name",
    width: 150,
  },
  {
    name: "Apellido",
    prop: "lastName",
    width: 150,
  },
  {
    name: "Correo",
    prop: "email",
    width: 150,
  },
  {
    name: "Teléfono",
    prop: "phone",
    width: 150,
  },
  {
    name: "rol",
    prop: "rol",
    width: 150,
  },
  {
    name: "Microsoft Id",
    prop: "microsoftId",
    width: 150,
  },
  {
    name: "Estado",
    prop: "status",
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
