export interface WorkshopRegistration {
    _id: string;
    user: {
      _id: string;
      name: string;
      lastName: string;
      email: string;
    }
    inductionPeriod: {
      _id: string;
      name: string;
      description: string;
    };
    carrera: string;
    nivelAprobado: number;
    estado: string;
    createdAt: string;
    updatedAt: string;
  }
  
  
  export interface WorkshopRegistrationCreate {
    userId: string;
    inductionPeriod: string;
    carrera: string;
    nivelAprobado: number;
  }
  
  export interface WorkshopRegistrationUpdate {
    inductionPeriod?: string;
    carrera?: string;
    nivelAprobado?: number;
    estado?: string;
  }
  