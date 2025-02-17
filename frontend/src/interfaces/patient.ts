import { IPaginationLink, IPaginationMeta } from ".";

export interface IPatient {
  id: number;
  name: string;
  another_name: string;
  first_phone: string;
  second_phone: string;
  personal_id: string;
  personal_image: string | null;
  status: true;
  gender: string;
  description: string;
  created_at: string;
  user: {
    id: number;
    email: string;
    role: "patient";
  };
}

export interface IAddPatient {
  id?: string;
  name: string;
  another_name: string;
  first_phone: string;
  second_phone?: string | null;
  personal_id: string;
  email: string;
  password: string;
  gender: {
    value: "male" | "female";
  };
  status: boolean;
  personal_image?: File | undefined;
  description: string;
}

export interface IResponsePatients {
  status: boolean;
  message: string | null;
  data: {
    items: IPatient[];
    links: IPaginationLink[];
    meta: IPaginationMeta;
  };
}

export interface IResponsePatient {
  status: boolean;
  message: string;
  data: IPatient;
}
