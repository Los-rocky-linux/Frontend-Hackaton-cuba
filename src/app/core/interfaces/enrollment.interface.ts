export interface Enrollment {
  _id: string;
  createdBy: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
  };
  modality: {
    _id: string;
    name: string;
  };
  topicTitle?: string;
  problemDescription?: string;
  developmentMechanism: {
    _id: string;
    name: string;
  };
  partner?: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
  };
  preferredTutors?: Array<{ _id: string; name: string }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnrollmentDisplay extends Enrollment {
  preferredTutorsNames?: string;
  developmentTypeName?: string;
  modalityName?: string;
  createdByName?: string;
  partnerName?: string;
}

export interface EnrollmentCreate {
  userId: string;
  topicTitle?: string;
  problemDescription?: string;
  modality: string;
  developmentMechanism: string;
  partner?: string;
  preferredTutors?: string[];
}

export interface EnrollmentUpdate {
  topicTitle?: string;
  problemDescription?: string;
  modality?: string;
  developmentMechanism?: string;
  partner?: string;
  preferredTutors?: string[];
}
