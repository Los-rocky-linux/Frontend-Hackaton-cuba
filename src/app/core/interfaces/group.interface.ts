export interface Tutor {
  _id: string;
  name: string;
}

export interface Member {
  _id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface Enrollment {
  _id: string;
  createdBy: Member;
  modality: { _id: string; name: string };
  topicTitle: string;
  problemDescription: string;
  developmentMechanism: { _id: string; name: string };
  partner: string;
  preferredTutors: Tutor[];
  createdAt: string;
  updatedAt: string;
  group: string;
}

export interface Group {
  _id: string;
  enrollments: Enrollment[];
  members: Member[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isIndividual?: boolean;
}

export interface GroupResponse {
  data: {
    result: Group[];
    totalCount: number;
  };
}

export interface GroupDisplay extends Group {
  membersNames: string;
  preferredTutorsNames: string;
  developmentMechanismName: string;
  modalityName: string;
  topicTitle: string;
}