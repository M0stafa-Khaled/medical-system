import { IPaginationMeta } from ".";
import { IClinic } from "../clinics";

export interface IDoctor {
  id: number;
  commission: string;
  created_at: string;
  first_phone: string;
  image: string | null;
  signature: string | null;
  name: string;
  personal_id: string;
  second_phone: string | null;
  status: boolean;
  updated_at: string;
  gender: string;
  register_id: string;
  clinics: IClinic[];
  user?: {
    email: string;
    id: number;
    name: string | null;
    role: "doctor";
  };
}

export interface IResponseDoctors {
  status: boolean;
  message: string | null;
  data: {
    items: IDoctor[];
    meta: IPaginationMeta;
  };
}

export interface IResponseDoctor {
  status: boolean;
  message: string;
  data: IDoctor;
}

export interface ICreateDoctor {
  id?: string;
  name: string;
  personal_id: string;
  first_phone: string;
  second_phone?: string | null;
  commission: string;
  status: boolean;
  register_id: string;
  email: string;
  gender: {
    value: "male" | "female";
  };
  password: string;
  image?: File | undefined;
  signature?: File | undefined;
  clinics: {
    value: string;
  }[];
}
