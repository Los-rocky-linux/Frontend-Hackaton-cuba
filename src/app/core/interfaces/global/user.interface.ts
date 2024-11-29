// user.interface.ts

export interface Rol {
  //quizas sea -id
  id: string;
  roleName: string;
  description?: string;
  status: boolean;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  rol: Rol;
  password?: string;
  microsoftId?: string;
  status: boolean;
  permissions: string[];
}
