import { IPaginationMeta } from "@/shared/types";

export interface IPatient {
  id: number;
  name: string;
  another_name: string;
  first_phone: string;
  second_phone: string;
  personal_id: string;
  personal_image: string | null;
  status: true;
  info_status: string;
  gender: "Male" | "Female";
  description: string;
  created_at: string;
  file_code: string;
  user: {
    id: number;
    email: string;
    last_login_at: string | null;
    last_logout_at: string | null;
    active: boolean;
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
  file_code: string;
  info_status?: string | null;
  personal_image?: File | undefined;
  description?: string | null;
}

export interface IPatientsRes {
  status: boolean;
  message: string | null;
  data: {
    items: IPatient[];
    meta: IPaginationMeta;
  };
}

export interface IPatientRes {
  status: boolean;
  message: string;
  data: IPatient;
}
