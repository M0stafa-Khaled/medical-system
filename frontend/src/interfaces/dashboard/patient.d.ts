import { IPaginationMeta } from "..";

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
  info_status: string;
  created_at: string;
  user: {
    id: number;
    email: string;
    role: "patient";
  };
}

export interface ICreatePatient {
  id?: string;
  name: string;
  another_name: string;
  first_phone: string;
  second_phone?: string | null;
  personal_id: string;
  email: string;
  password: string;
  gender: "male" | "female";
  status: boolean;
  info_status?: string | null;
  personal_image?: File | undefined;
  description?: string | null;
}

export interface IResponsePatients {
  status: boolean;
  message: string | null;
  data: {
    items: IPatient[];
    meta: IPaginationMeta;
  };
}

export interface IResponsePatient {
  status: boolean;
  message: string;
  data: IPatient;
}
